import Phaser from 'phaser';
import type { PlayerMotion } from './PlayerController';

/** Temporary five-character view. Replace this class with an approved sprite view later. */
export class AsteriskPlayerView {
  private readonly group: Phaser.GameObjects.Container;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.group = scene.add.container(x, y);
    const font = { fontFamily: 'monospace', fontSize: '30px', fontStyle: 'bold', color: '#fff28a', stroke: '#17202a', strokeThickness: 3 };
    const positions: Array<[number, number]> = [[0, -28], [-28, 0], [0, 0], [28, 0], [0, 28]];
    for (const [px, py] of positions) this.group.add(scene.add.text(px, py, '*', font).setOrigin(0.5));
  }

  sync(x: number, y: number, motion: PlayerMotion): void {
    this.group.setPosition(x, y).setDepth(Math.round(y));
    this.group.setAlpha(motion.moving ? 1 : 0.94);
  }

  destroy(): void {
    this.group.destroy(true);
  }
}
