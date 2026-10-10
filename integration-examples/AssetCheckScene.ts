// Demuestra carga y dos frames; no es el juego ni la galería completa pedida a OpenCode.
import Phaser from 'phaser';
import { addIcon, preloadApprovedIcons } from './approved-icons';

export class AssetCheckScene extends Phaser.Scene {
  constructor() { super('AssetCheckScene'); }
  preload(): void {
    this.load.on('loaderror', (file: { key: string }) => {
      this.add.text(16, 130, `Error de carga: ${file.key}`, { color: '#ff7766' });
    });
    preloadApprovedIcons(this);
  }
  create(): void {
    this.add.text(16, 16, 'Hack the Andes · diagnóstico de iconos', { color: '#ffffff' });
    addIcon(this, 64, 86, 'bestiary-icons', 'monster_slime_verde_21_transparent');
    addIcon(this, 160, 86, 'loot-icons', 'loot_cristales_morados_17_transparent');
  }
}
