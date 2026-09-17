import Phaser from 'phaser';

export class Player extends Phaser.GameObjects.Rectangle {
  public tileX: number;
  public tileY: number;

  constructor(scene: Phaser.Scene, tileX: number, tileY: number, tileSize: number = 16) {
    const x = tileX * tileSize + tileSize / 2;
    const y = tileY * tileSize + tileSize / 2;

    super(scene, x, y, 12, 12, 0xff0000);

    this.tileX = tileX;
    this.tileY = tileY;

    scene.add.existing(this);
  }

  moveToTile(tileX: number, tileY: number, tileSize: number) {
    this.tileX = tileX;
    this.tileY = tileY;
    this.setPosition(tileX * tileSize + tileSize / 2, tileY * tileSize + tileSize / 2);
  }
}
