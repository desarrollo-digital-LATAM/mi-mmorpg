import Phaser from 'phaser';
import { assetUrl, validatePrototypeManifest, validateRuntimeManifest } from '../game/assets/runtimeManifest';

export class BootScene extends Phaser.Scene {
  private status?: Phaser.GameObjects.Text;
  private progress?: Phaser.GameObjects.Graphics;

  constructor() { super('BootScene'); }

  init(): void {
    this.add.text(480, 208, 'Hack the Andes', { fontFamily: 'Arial', fontSize: '32px', color: '#edf2f8' }).setOrigin(0.5);
    this.status = this.add.text(480, 260, 'Cargando manifiesto de recursos...', { fontFamily: 'Arial', fontSize: '18px', color: '#aebed0' }).setOrigin(0.5);
    this.progress = this.add.graphics();
    this.load.on(Phaser.Loader.Events.PROGRESS, (value: number) => this.drawProgress(value));
    this.load.on(Phaser.Loader.Events.FILE_LOAD_ERROR, (file: Phaser.Loader.File) => this.fail(`Error de carga: ${file.key}`));
  }

  preload(): void {
    this.load.json('runtime-manifest', assetUrl('assets/runtime-manifest.json'));
    this.load.json('prototype-manifest', assetUrl('assets/prototypes/manifest.json'));
    this.load.atlas('loot-icons', assetUrl('assets/atlases/loot-icons.png'), assetUrl('assets/atlases/loot-icons.json'));
    this.load.atlas('bestiary-icons', assetUrl('assets/atlases/bestiary-icons.png'), assetUrl('assets/atlases/bestiary-icons.json'));
    this.load.spritesheet('swordsman-walk', assetUrl('assets/prototypes/swordsman-level-1/Swordsman_lvl1_Walk_without_shadow.png'), { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('swordsman-idle', assetUrl('assets/prototypes/swordsman-level-1/Swordsman_lvl1_Idle_without_shadow.png'), { frameWidth: 64, frameHeight: 64 });
    this.load.image('roads-ground-grass', assetUrl('assets/prototypes/paths-and-roads/Ground_grass.png'));
    this.load.image('roads-road5', assetUrl('assets/prototypes/paths-and-roads/Road5.png'));
    this.load.image('chapel-exterior', assetUrl('assets/prototypes/chapel/Exterior.png'));
  }

  create(): void {
    const manifest = validateRuntimeManifest(this.cache.json.get('runtime-manifest'));
    if (!manifest) {
      this.fail('El manifiesto runtime no es valido. No se puede revisar recursos.');
      return;
    }
    const missing = manifest.icons.filter((icon) => !this.textures.exists(icon.atlasKey) || !this.textures.get(icon.atlasKey).has(icon.frameName));
    if (missing.length) {
      this.fail(`Atlas incompleto: faltan ${missing.length} frames.`);
      return;
    }
    const prototypes = validatePrototypeManifest(this.cache.json.get('prototype-manifest'));
    if (!prototypes ||
      !this.textures.exists('swordsman-walk') || !this.textures.exists('swordsman-idle') ||
      !this.textures.exists('roads-ground-grass') || !this.textures.exists('roads-road5') || !this.textures.exists('chapel-exterior')) {
      this.fail('El manifiesto o los recursos de prototipo no son validos.');
      return;
    }
    this.scene.start('PrototypeReviewScene', manifest);
  }

  private drawProgress(value: number): void {
    this.progress?.clear().fillStyle(0x2e4059).fillRect(260, 294, 440, 12).fillStyle(0x6fc7b1).fillRect(260, 294, 440 * value, 12);
  }

  private fail(message: string): void {
    this.status?.setColor('#ff8877').setText(message);
  }
}
