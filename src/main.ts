import Phaser from 'phaser';
import { BootScene } from './scenes/BootScene';
import { AssetReviewScene } from './scenes/AssetReviewScene';
import { PrototypeReviewScene } from './scenes/PrototypeReviewScene';
import { WorldTestScene } from './scenes/WorldTestScene';
import './style.css';

new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'app',
  width: 960,
  height: 540,
  backgroundColor: '#101621',
  pixelArt: true,
  roundPixels: true,
  physics: {
    default: 'arcade',
    arcade: { gravity: { x: 0, y: 0 }, debug: false },
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 960,
    height: 540,
  },
  scene: [BootScene, AssetReviewScene, PrototypeReviewScene, WorldTestScene],
});
