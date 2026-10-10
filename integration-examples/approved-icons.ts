// Ejemplo para Phaser 3.90.0 + Vite. Adaptar/mover a src/game/assets/.
import Phaser from 'phaser';

export const ICON_ATLASES = [
  { key: 'loot-icons', path: 'assets/atlases/loot-icons' },
  { key: 'bestiary-icons', path: 'assets/atlases/bestiary-icons' },
] as const;

export function preloadApprovedIcons(scene: Phaser.Scene): void {
  for (const atlas of ICON_ATLASES) {
    scene.load.atlas(atlas.key,
      `${import.meta.env.BASE_URL}${atlas.path}.png`,
      `${import.meta.env.BASE_URL}${atlas.path}.json`);
  }
}

export function addIcon(scene: Phaser.Scene, x: number, y: number,
  atlasKey: 'loot-icons' | 'bestiary-icons', frameName: string): Phaser.GameObjects.Image {
  if (!scene.textures.exists(atlasKey) || !scene.textures.get(atlasKey).has(frameName)) {
    throw new Error(`Icono no disponible: ${atlasKey}/${frameName}`);
  }
  return scene.add.image(x, y, atlasKey, frameName).setScale(2);
}
