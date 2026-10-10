export type AtlasKey = 'loot-icons' | 'bestiary-icons';

export interface RuntimeAtlas {
  key: AtlasKey;
  image: string;
  data: string;
  frames: number;
}

export interface RuntimeIcon {
  id: string;
  label: string;
  category: 'loot' | 'bestiary';
  width: number;
  height: number;
  atlasKey: AtlasKey;
  frameName: string;
}

export interface RuntimeManifest {
  schemaVersion: 1;
  atlases: RuntimeAtlas[];
  icons: RuntimeIcon[];
}

export interface PrototypeManifest {
  schemaVersion: 1;
  assets: Array<{ id: string; path: string; source: string; sha256: string; dimensions: [number, number] }>;
}

const atlasKeys: ReadonlySet<string> = new Set(['loot-icons', 'bestiary-icons']);

function isAssetPath(value: unknown): value is string {
  return typeof value === 'string' && value.startsWith('assets/') && !value.includes('..');
}

export function validateRuntimeManifest(value: unknown): RuntimeManifest | null {
  if (!value || typeof value !== 'object') return null;
  const candidate = value as Record<string, unknown>;
  if (candidate.schemaVersion !== 1 || !Array.isArray(candidate.atlases) || !Array.isArray(candidate.icons)) return null;
  if (candidate.atlases.length !== 2 || candidate.icons.length !== 98) return null;

  const seenAtlases = new Set<string>();
  const atlasByKey = new Map<string, number>();
  for (const atlas of candidate.atlases) {
    if (!atlas || typeof atlas !== 'object') return null;
    const item = atlas as Record<string, unknown>;
    if (!atlasKeys.has(item.key as string) || seenAtlases.has(item.key as string) ||
      !isAssetPath(item.image) || !isAssetPath(item.data) ||
      typeof item.frames !== 'number' || !Number.isInteger(item.frames) || item.frames <= 0) return null;
    seenAtlases.add(item.key as string);
    atlasByKey.set(item.key as string, item.frames);
  }

  const seenIcons = new Set<string>();
  const categoryCounts = { loot: 0, bestiary: 0 };
  const framesByAtlas = new Map<string, number>();
  for (const icon of candidate.icons) {
    if (!icon || typeof icon !== 'object') return null;
    const item = icon as Record<string, unknown>;
    if (typeof item.id !== 'string' || !item.id || seenIcons.has(item.id) ||
      typeof item.label !== 'string' || !['loot', 'bestiary'].includes(item.category as string) ||
      item.width !== 32 || item.height !== 32 || !atlasKeys.has(item.atlasKey as string) ||
      typeof item.frameName !== 'string' || item.frameName !== item.id) return null;
    const expectedAtlas = item.category === 'loot' ? 'loot-icons' : 'bestiary-icons';
    if (item.atlasKey !== expectedAtlas) return null;
    seenIcons.add(item.id);
    categoryCounts[item.category as 'loot' | 'bestiary'] += 1;
    framesByAtlas.set(item.atlasKey as string, (framesByAtlas.get(item.atlasKey as string) ?? 0) + 1);
  }

  if (categoryCounts.loot !== 48 || categoryCounts.bestiary !== 50) return null;
  for (const [key, frames] of atlasByKey) if (framesByAtlas.get(key) !== frames) return null;
  return candidate as unknown as RuntimeManifest;
}

const prototypeAssets = new Map([
  ['swordsman-level-1-idle', 'assets/prototypes/swordsman-level-1/Swordsman_lvl1_Idle_without_shadow.png'],
  ['swordsman-level-1-walk', 'assets/prototypes/swordsman-level-1/Swordsman_lvl1_Walk_without_shadow.png'],
  ['paths-and-roads-ground-grass', 'assets/prototypes/paths-and-roads/Ground_grass.png'],
  ['paths-and-roads-road5', 'assets/prototypes/paths-and-roads/Road5.png'],
  ['chapel-exterior', 'assets/prototypes/chapel/Exterior.png'],
]);

export function validatePrototypeManifest(value: unknown): PrototypeManifest | null {
  if (!value || typeof value !== 'object') return null;
  const candidate = value as Record<string, unknown>;
  if (candidate.schemaVersion !== 1 || !Array.isArray(candidate.assets) || candidate.assets.length !== prototypeAssets.size) return null;
  const seen = new Set<string>();
  for (const asset of candidate.assets) {
    if (!asset || typeof asset !== 'object') return null;
    const item = asset as Record<string, unknown>;
    if (typeof item.id !== 'string' || seen.has(item.id) || prototypeAssets.get(item.id) !== item.path ||
      typeof item.source !== 'string' || !item.source.startsWith('asset-workbench/candidates/') ||
      typeof item.sha256 !== 'string' || !/^[a-f0-9]{64}$/.test(item.sha256) ||
      !Array.isArray(item.dimensions) || item.dimensions.length !== 2 ||
      !item.dimensions.every((dimension) => typeof dimension === 'number' && Number.isInteger(dimension) && dimension > 0)) return null;
    seen.add(item.id);
  }
  return candidate as unknown as PrototypeManifest;
}

export function assetUrl(path: string): string {
  return `${import.meta.env.BASE_URL}${path}`;
}
