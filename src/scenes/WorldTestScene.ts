import Phaser from 'phaser';
import { PlayerController } from '../game/entities/PlayerController';
import { createUnarmedPlayerAnimations, UnarmedPlayerView } from '../game/entities/UnarmedPlayerView';
import { assetUrl } from '../game/assets/runtimeManifest';

const TILE_SIZE = 16;
const MAP_COLUMNS = 80;
const MAP_ROWS = 60;
const WORLD_WIDTH = MAP_COLUMNS * TILE_SIZE;
const WORLD_HEIGHT = MAP_ROWS * TILE_SIZE;
const SPAWN = { x: WORLD_WIDTH / 2, y: WORLD_HEIGHT / 2 };
const GRASS_TILE = 36;
const ROAD_PATCH_ORIGIN = { x: 35, y: 24 };

// Road5_grass tile IDs copied from the matching 16x16 tiles in Roads.tmx.
// The sample TMX has no spawn/collision data; this small patch is part of our own map.
const ROAD5_PATCH: ReadonlyArray<readonly [number, number, number]> = [
  [0, 0, 347], [1, 0, 350], [2, 0, 301], [3, 0, 302], [4, 0, 108], [5, 0, 109],
  [0, 1, 362], [1, 1, 365], [2, 1, 316], [3, 1, 317], [4, 1, 113], [5, 1, 114], [7, 1, 346], [8, 1, 347],
  [0, 2, 377], [1, 2, 380], [2, 2, 331], [3, 2, 332], [4, 2, 38], [5, 2, 39], [7, 2, 361], [8, 2, 362],
  [0, 3, 2], [1, 3, 7], [2, 3, 132], [3, 3, 37], [4, 3, 38], [5, 3, 257], [6, 3, 352], [7, 3, 376], [8, 3, 377],
  [0, 4, 17], [1, 4, 22], [2, 4, 42], [3, 4, 156], [4, 4, 232], [5, 4, 233], [6, 4, 367], [8, 4, 85], [9, 4, 348],
  [0, 5, 342], [1, 5, 343], [2, 5, 58], [3, 5, 171], [4, 5, 247], [5, 5, 248], [6, 5, 382], [7, 5, 87], [8, 5, 100], [9, 5, 363],
  [0, 6, 357], [1, 6, 358], [2, 6, 73], [3, 6, 207], [4, 6, 208], [5, 6, 209], [6, 6, 85], [7, 6, 102], [8, 6, 118], [9, 6, 378],
  [0, 7, 256], [1, 7, 257], [2, 7, 217], [3, 7, 264], [4, 7, 265], [5, 7, 266], [6, 7, 100], [7, 7, 116],
  [0, 8, 271], [1, 8, 272], [2, 8, 232], [3, 8, 279], [4, 8, 280], [5, 8, 281], [6, 8, 118],
  [0, 9, 286], [1, 9, 246], [2, 9, 247], [3, 9, 248], [4, 9, 295], [5, 9, 296],
  [0, 10, 350], [1, 10, 264], [2, 10, 265], [3, 10, 266], [4, 10, 352],
  [0, 11, 365], [1, 11, 279], [2, 11, 280], [3, 11, 281], [4, 11, 367],
];

export class WorldTestScene extends Phaser.Scene {
  private player!: PlayerController;
  private playerView!: UnarmedPlayerView;
  private reviewKey?: Phaser.Input.Keyboard.Key;

  constructor() { super('WorldTestScene'); }

  preload(): void {
    this.load.spritesheet('map-ground-tiles', assetUrl('assets/prototypes/paths-and-roads/Ground_grass.png'), { frameWidth: TILE_SIZE, frameHeight: TILE_SIZE });
    this.load.spritesheet('map-road5-grass-tiles', assetUrl('assets/prototypes/paths-and-roads/Road5_grass.png'), { frameWidth: TILE_SIZE, frameHeight: TILE_SIZE });
    this.load.spritesheet('base-unarmed-idle', assetUrl('assets/prototypes/base-4-direction/Unarmed_Idle_without_shadow.png'), { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('base-unarmed-walk', assetUrl('assets/prototypes/base-4-direction/Unarmed_Walk_without_shadow.png'), { frameWidth: 64, frameHeight: 64 });
  }

  create(): void {
    this.cameras.main.setBackgroundColor('#263b35');
    this.physics.world.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);
    this.createTiledGround();
    this.drawWorldBoundsAndSpawn();
    createUnarmedPlayerAnimations(this);

    this.player = new PlayerController(this, SPAWN.x, SPAWN.y);
    this.playerView = new UnarmedPlayerView(this, SPAWN.x, SPAWN.y);
    this.cameras.main.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT).startFollow(this.player.body, true, 1, 1);
    this.cameras.main.setRoundPixels(true);

    this.add.text(16, 14, 'Hack the Andes | Prueba transitable provisional', { fontFamily: 'Arial', fontSize: '18px', color: '#edf2f8', backgroundColor: '#101621cc', padding: { x: 8, y: 5 } })
      .setScrollFactor(0).setDepth(100000);
    this.add.text(16, 48, 'WASD / flechas: mover | P: diagnóstico visual', { fontFamily: 'Arial', fontSize: '13px', color: '#c4d4ca', backgroundColor: '#101621cc', padding: { x: 8, y: 4 } })
      .setScrollFactor(0).setDepth(100000);
    this.reviewKey = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.P);
    this.scale.on(Phaser.Scale.Events.RESIZE, this.onResize, this);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, this.shutdown, this);
  }

  update(): void {
    this.player.update();
    this.playerView.sync(this.player.body.x, this.player.body.y, this.player.motion);
    if (this.reviewKey && Phaser.Input.Keyboard.JustDown(this.reviewKey)) this.scene.start('PrototypeReviewScene');
  }

  private createTiledGround(): void {
    const groundData = Array.from({ length: MAP_ROWS }, () => Array<number>(MAP_COLUMNS).fill(GRASS_TILE));
    const map = this.make.tilemap({ data: groundData, tileWidth: TILE_SIZE, tileHeight: TILE_SIZE });
    const grassTiles = map.addTilesetImage('Ground_grass', 'map-ground-tiles', TILE_SIZE, TILE_SIZE, 0, 0, 0);
    const roadTiles = map.addTilesetImage('Road5_grass', 'map-road5-grass-tiles', TILE_SIZE, TILE_SIZE, 0, 0, 0);
    if (!grassTiles || !roadTiles) throw new Error('No se pudieron asociar los tilesets de prueba.');
    const groundLayer = map.createLayer(0, grassTiles, 0, 0);
    const pathLayer = map.createBlankLayer('road5-grass-path', roadTiles, 0, 0);
    if (!groundLayer || !pathLayer) throw new Error('No se pudieron crear las capas del mapa de prueba.');
    groundLayer.setDepth(-10000);
    pathLayer.setDepth(-9000);

    for (const [tileX, tileY, tileId] of ROAD5_PATCH) {
      pathLayer.putTileAt(tileId, ROAD_PATCH_ORIGIN.x + tileX, ROAD_PATCH_ORIGIN.y + tileY);
    }
  }

  private drawWorldBoundsAndSpawn(): void {
    const border = this.add.graphics().setDepth(-8000);
    border.lineStyle(4, 0xd39b62, 1).strokeRect(2, 2, WORLD_WIDTH - 4, WORLD_HEIGHT - 4);
    const spawn = this.add.graphics().setDepth(-100);
    spawn.lineStyle(2, 0xffe18a, 0.9).strokeCircle(SPAWN.x, SPAWN.y, 32);
    this.add.text(SPAWN.x, SPAWN.y + 48, 'SPAWN', { fontFamily: 'monospace', fontSize: '12px', color: '#fff0b0', stroke: '#17202a', strokeThickness: 3 }).setOrigin(0.5).setDepth(-99);
  }

  private onResize(): void {
    this.cameras.main.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);
  }

  private shutdown(): void {
    this.scale.off(Phaser.Scale.Events.RESIZE, this.onResize, this);
    this.playerView?.destroy();
    this.player?.destroy();
  }
}
