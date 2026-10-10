import Phaser from 'phaser';
import type { RuntimeManifest } from '../game/assets/runtimeManifest';

const WALK_FRAMES = 6;
const IDLE_FRAMES = 12;
const FRAME_DURATION_MS = 150;

export class PrototypeReviewScene extends Phaser.Scene {
  private page = 0;

  constructor() { super('PrototypeReviewScene'); }

  init(_manifest: RuntimeManifest): void {}

  create(): void {
    this.createAnimations();
    this.input.keyboard?.on('keydown-SPACE', () => this.togglePage());
    this.input.keyboard?.on('keydown-I', () => this.scene.start('AssetReviewScene'));
    this.draw();
  }

  private createAnimations(): void {
    for (let row = 0; row < 4; row += 1) {
      this.anims.create({ key: `prototype-walk-row-${row}`, frames: this.anims.generateFrameNumbers('swordsman-walk', { start: row * WALK_FRAMES, end: row * WALK_FRAMES + WALK_FRAMES - 1 }), frameRate: 1000 / FRAME_DURATION_MS, repeat: -1 });
      this.anims.create({ key: `prototype-idle-row-${row}`, frames: this.anims.generateFrameNumbers('swordsman-idle', { start: row * IDLE_FRAMES, end: row * IDLE_FRAMES + IDLE_FRAMES - 1 }), frameRate: 1000 / FRAME_DURATION_MS, repeat: -1 });
    }
  }

  private draw(): void {
    this.children.removeAll();
    this.add.rectangle(480, 270, 960, 540, 0x101621);
    if (this.page === 0) this.drawSwordsman(); else this.drawEnvironmentCandidates();
    this.add.text(930, 516, 'Espacio: candidatos | I: iconos', { fontFamily: 'Arial', fontSize: '12px', color: '#8394a8' }).setOrigin(1, 0.5);
  }

  private drawSwordsman(): void {
    this.add.text(28, 20, 'Fase 1 | Diagnostico de Swordsman nivel 1', { fontFamily: 'Arial', fontSize: '24px', color: '#edf2f8' });
    this.add.text(28, 50, 'Sprites fuente 64x64, sin escala. Filas animadas por indice: el TMX no nombra direcciones.', { fontFamily: 'Arial', fontSize: '14px', color: '#f2c879' });
    this.add.text(28, 72, 'Walk: 6 frames x 150 ms. Idle: 12 frames x 150 ms. No se asigna frente/atras/izquierda/derecha.', { fontFamily: 'Arial', fontSize: '13px', color: '#aebed0' });
    for (let row = 0; row < 4; row += 1) {
      const y = 132 + row * 88;
      this.add.rectangle(480, y, 872, 76, 0x1a2635).setStrokeStyle(1, 0x334a61);
      this.add.text(58, y - 24, `Fila ${row} (direccion sin confirmar)`, { fontFamily: 'Arial', fontSize: '14px', color: '#d7e2ee' });
      this.add.sprite(200, y, 'swordsman-idle', row * IDLE_FRAMES).play(`prototype-idle-row-${row}`);
      this.add.text(258, y, 'idle', { fontFamily: 'Arial', fontSize: '13px', color: '#aebed0' }).setOrigin(0, 0.5);
      this.add.sprite(585, y, 'swordsman-walk', row * WALK_FRAMES).play(`prototype-walk-row-${row}`);
      this.add.text(643, y, 'walk', { fontFamily: 'Arial', fontSize: '13px', color: '#aebed0' }).setOrigin(0, 0.5);
    }
    this.add.text(28, 493, 'Bloqueo: faltan etiquetas de fila o una confirmacion visual humana para vincular cada indice a una direccion.', { fontFamily: 'Arial', fontSize: '13px', color: '#ffae7a' });
  }

  private drawEnvironmentCandidates(): void {
    this.add.text(28, 20, 'Fase 1 | Revision de candidatos de entorno', { fontFamily: 'Arial', fontSize: '24px', color: '#edf2f8' });
    this.add.text(28, 50, 'Muestras a escala fuente 1x. No son un mapa ni se mezclan con el heroe hasta validar cohesion visual.', { fontFamily: 'Arial', fontSize: '14px', color: '#f2c879' });
    this.add.text(28, 92, 'Path and Road: tiles de 16x16; Roads.tmx es una muestra, no un nivel.', { fontFamily: 'Arial', fontSize: '14px', color: '#d7e2ee' });
    this.add.image(180, 220, 'roads-road5').setCrop(0, 0, 240, 240);
    this.add.text(28, 356, 'Chapel: tiles de 16x16; Exterior.tmx es una muestra, no una plaza jugable.', { fontFamily: 'Arial', fontSize: '14px', color: '#d7e2ee' });
    this.add.image(180, 450, 'chapel-exterior').setCrop(0, 0, 256, 152);
    this.add.image(530, 220, 'roads-ground-grass').setCrop(0, 0, 272, 240);
    this.add.text(430, 356, 'Ground_grass (Path and Road)', { fontFamily: 'Arial', fontSize: '13px', color: '#aebed0' });
    this.add.text(430, 390, 'No hay arboles o vegetacion coherentes: no se declara un bosque ni una zona explorable.', { fontFamily: 'Arial', fontSize: '13px', color: '#ffae7a', wordWrap: { width: 450 } });
  }

  private togglePage(): void {
    this.page = this.page === 0 ? 1 : 0;
    this.draw();
  }
}
