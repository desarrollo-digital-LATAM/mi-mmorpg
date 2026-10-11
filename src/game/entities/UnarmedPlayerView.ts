import Phaser from 'phaser';
import type { Facing, PlayerMotion } from './PlayerController';

const IDLE_TEXTURE = 'base-unarmed-idle';
const WALK_TEXTURE = 'base-unarmed-walk';
const FRAME_WIDTH = 64;
const FOOT_Y = 43;

const DIRECTION_ROW: Record<Facing, number> = {
  down: 0,
  left: 1,
  right: 2,
  up: 3,
};

const IDLE_DURATIONS: Record<Facing, number[]> = {
  down: [300, 100, 100, 100, 300, 100, 300, 100, 100, 100, 300, 100],
  left: [300, 100, 100, 100, 300, 100, 300, 100, 100, 100, 300, 100],
  right: [300, 100, 100, 100, 300, 100, 300, 100, 100, 100, 300, 100],
  up: [900, 100, 900, 100],
};

const WALK_FRAME_COUNT = 6;
const WALK_FRAME_DURATION_MS = 100;

export function createUnarmedPlayerAnimations(scene: Phaser.Scene): void {
  for (const facing of Object.keys(DIRECTION_ROW) as Facing[]) {
    const row = DIRECTION_ROW[facing];
    const idleKey = animationKey('idle', facing);
    const idleFrames = IDLE_DURATIONS[facing].map((duration, frame) => ({
      key: IDLE_TEXTURE,
      frame: row * 12 + frame,
      duration,
    }));
    if (!scene.anims.exists(idleKey)) scene.anims.create({ key: idleKey, frames: idleFrames, repeat: -1 });

    const walkKey = animationKey('walk', facing);
    const walkFrames = Array.from({ length: WALK_FRAME_COUNT }, (_, frame) => ({
      key: WALK_TEXTURE,
      frame: row * WALK_FRAME_COUNT + frame,
      duration: WALK_FRAME_DURATION_MS,
    }));
    if (!scene.anims.exists(walkKey)) scene.anims.create({ key: walkKey, frames: walkFrames, repeat: -1 });
  }
}

/** Sprite-only presentation. Input, velocity, facing and Arcade body stay in PlayerController. */
export class UnarmedPlayerView {
  private readonly sprite: Phaser.GameObjects.Sprite;
  private currentAnimation = '';

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.sprite = scene.add.sprite(x, y, IDLE_TEXTURE, 0)
      .setOrigin(0.5, FOOT_Y / FRAME_WIDTH)
      .setScale(1)
      .setDepth(Math.round(y));
    this.play('idle', 'down');
  }

  sync(x: number, y: number, motion: PlayerMotion): void {
    const state = motion.moving ? 'walk' : 'idle';
    this.play(state, motion.facing);
    this.sprite.setPosition(x, y).setDepth(Math.round(y));
  }

  destroy(): void {
    this.sprite.destroy();
  }

  private play(state: 'idle' | 'walk', facing: Facing): void {
    const key = animationKey(state, facing);
    if (key === this.currentAnimation) return;
    this.currentAnimation = key;
    this.sprite.play(key);
  }
}

function animationKey(state: 'idle' | 'walk', facing: Facing): string {
  return `base-unarmed-${state}-${facing}`;
}
