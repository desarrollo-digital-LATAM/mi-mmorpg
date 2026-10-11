import Phaser from 'phaser';

export type Facing = 'up' | 'down' | 'left' | 'right';

export interface PlayerMotion {
  moving: boolean;
  facing: Facing;
}

/** Input, world position and Arcade body; deliberately independent from its view. */
export class PlayerController {
  readonly body: Phaser.GameObjects.Zone;
  private readonly arcadeBody: Phaser.Physics.Arcade.Body;
  private readonly cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private readonly keys: Record<'up' | 'down' | 'left' | 'right', Phaser.Input.Keyboard.Key>;
  private facing: Facing = 'down';
  private moving = false;
  private readonly speed = 180;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    const keyboard = scene.input.keyboard;
    if (!keyboard) throw new Error('El teclado no está disponible en esta escena.');

    this.body = scene.add.zone(x, y, 14, 10);
    scene.physics.add.existing(this.body);
    this.arcadeBody = this.body.body as Phaser.Physics.Arcade.Body;
    this.arcadeBody.setSize(14, 10).setCollideWorldBounds(true);
    this.cursors = keyboard.createCursorKeys();
    this.keys = {
      up: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      down: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      left: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      right: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
    };
  }

  update(): void {
    const x = Number(this.cursors.left.isDown || this.keys.left.isDown) * -1 + Number(this.cursors.right.isDown || this.keys.right.isDown);
    const y = Number(this.cursors.up.isDown || this.keys.up.isDown) * -1 + Number(this.cursors.down.isDown || this.keys.down.isDown);
    const vector = new Phaser.Math.Vector2(x, y);
    if (vector.lengthSq() > 0) vector.normalize().scale(this.speed);
    this.arcadeBody.setVelocity(vector.x, vector.y);

    this.moving = vector.lengthSq() > 0;
    if (this.moving) {
      if (Math.abs(x) > Math.abs(y)) this.facing = x < 0 ? 'left' : 'right';
      else this.facing = y < 0 ? 'up' : 'down';
    }
  }

  get motion(): PlayerMotion {
    return { moving: this.moving, facing: this.facing };
  }

  destroy(): void {
    this.body.destroy();
  }
}
