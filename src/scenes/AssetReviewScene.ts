import Phaser from 'phaser';
import type { RuntimeIcon, RuntimeManifest } from '../game/assets/runtimeManifest';

type Category = RuntimeIcon['category'];

const PAGE_SIZE = 18;
const categoryLabels: Record<Category, string> = { loot: 'Botin', bestiary: 'Bestiario' };

export class AssetReviewScene extends Phaser.Scene {
  private manifest!: RuntimeManifest;
  private category: Category = 'loot';
  private page = 0;

  constructor() { super('AssetReviewScene'); }

  init(manifest: RuntimeManifest): void { this.manifest = manifest; }

  create(): void {
    this.input.keyboard?.on('keydown-LEFT', () => this.changePage(-1));
    this.input.keyboard?.on('keydown-RIGHT', () => this.changePage(1));
    this.draw();
  }

  private draw(): void {
    this.children.removeAll();
    this.add.rectangle(480, 270, 960, 540, 0x101621);
    this.add.text(30, 22, 'Hack the Andes | Diagnostico visual de assets', { fontFamily: 'Arial', fontSize: '24px', color: '#edf2f8' });
    this.add.text(30, 54, 'Diagnostico de recursos; mundo jugable pendiente', { fontFamily: 'Arial', fontSize: '16px', color: '#f2c879' });
    this.add.text(30, 78, 'Iconos estaticos aprobados. No representan animaciones ni entidades jugables.', { fontFamily: 'Arial', fontSize: '13px', color: '#aebed0' });
    this.addTab('loot', 30, 'Botin (48)');
    this.addTab('bestiary', 176, 'Bestiario (50)');

    const icons = this.manifest.icons.filter((icon) => icon.category === this.category);
    const pages = Math.ceil(icons.length / PAGE_SIZE);
    this.page = Phaser.Math.Clamp(this.page, 0, pages - 1);
    const visible = icons.slice(this.page * PAGE_SIZE, (this.page + 1) * PAGE_SIZE);
    visible.forEach((icon, index) => this.drawIcon(icon, index));
    this.add.text(480, 485, `${categoryLabels[this.category]}: ${icons.length} iconos | Pagina ${this.page + 1} de ${pages}`, { fontFamily: 'Arial', fontSize: '15px', color: '#cbd7e6' }).setOrigin(0.5);
    this.addButton(344, 513, '< Anterior', () => this.changePage(-1), this.page > 0);
    this.addButton(510, 513, 'Siguiente >', () => this.changePage(1), this.page < pages - 1);
    this.add.text(930, 514, 'Flechas: paginas', { fontFamily: 'Arial', fontSize: '12px', color: '#8394a8' }).setOrigin(1, 0.5);
  }

  private addTab(category: Category, x: number, label: string): void {
    const active = category === this.category;
    const tab = this.add.rectangle(x + 62, 114, 124, 28, active ? 0x356a6d : 0x26384d).setInteractive({ useHandCursor: true });
    this.add.text(x + 62, 114, label, { fontFamily: 'Arial', fontSize: '14px', color: active ? '#ffffff' : '#b6c5d5' }).setOrigin(0.5);
    tab.on('pointerup', () => { this.category = category; this.page = 0; this.draw(); });
  }

  private drawIcon(icon: RuntimeIcon, index: number): void {
    const column = index % 6;
    const row = Math.floor(index / 6);
    const x = 45 + column * 155;
    const y = 155 + row * 102;
    this.add.rectangle(x + 61, y + 39, 142, 88, 0x1a2635).setStrokeStyle(1, 0x334a61);
    if (!this.textures.exists(icon.atlasKey) || !this.textures.get(icon.atlasKey).has(icon.frameName)) {
      this.add.text(x + 61, y + 35, 'Frame ausente', { fontFamily: 'Arial', fontSize: '12px', color: '#ff8877' }).setOrigin(0.5);
      return;
    }
    this.add.image(x + 61, y + 31, icon.atlasKey, icon.frameName).setScale(2);
    this.add.text(x + 61, y + 76, icon.label, { fontFamily: 'Arial', fontSize: '10px', color: '#d7e2ee', align: 'center', wordWrap: { width: 132 } }).setOrigin(0.5, 0);
  }

  private addButton(x: number, y: number, label: string, action: () => void, enabled: boolean): void {
    const button = this.add.rectangle(x, y, 142, 28, enabled ? 0x356a6d : 0x26313f);
    this.add.text(x, y, label, { fontFamily: 'Arial', fontSize: '14px', color: enabled ? '#ffffff' : '#718296' }).setOrigin(0.5);
    if (enabled) button.setInteractive({ useHandCursor: true }).on('pointerup', action);
  }

  private changePage(delta: number): void {
    const total = this.manifest.icons.filter((icon) => icon.category === this.category).length;
    const next = this.page + delta;
    if (next >= 0 && next < Math.ceil(total / PAGE_SIZE)) { this.page = next; this.draw(); }
  }
}
