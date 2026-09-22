import Phaser from 'phaser';
import frontSprite from '../images/IMG_5950.jpeg';
import backSprite from '../images/IMG_5951.jpeg';

export class Player extends Phaser.GameObjects.Image {
  public tileX: number;
  public tileY: number;

  constructor(scene: Phaser.Scene, tileX: number, tileY: number, tileSize: number = 16) {
    super(scene, tileX * tileSize + tileSize / 2, tileY * tileSize + tileSize / 2, frontSprite);

    this.tileX = tileX;
    this.tileY = tileY;
    this.setOrigin(0.5);
    this.setDisplaySize(tileSize, tileSize);

    scene.add.existing(this);
  }

  moveToTile(tileX: number, tileY: number, tileSize: number) {
    this.tileX = tileX;
    this.tileY = tileY;
    this.setPosition(tileX * tileSize + tileSize / 2, tileY * tileSize + tileSize / 2);
  }

  setFacing(direction: 'front' | 'back') {
    this.setTexture(direction === 'back' ? backSprite : frontSprite);
  }
}
