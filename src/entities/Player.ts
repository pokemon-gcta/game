import Phaser from 'phaser';

export class Player extends Phaser.Physics.Arcade.Sprite {
  private speed: number = 100;
  private isMoving: boolean = false;
  private moveTarget: Phaser.Math.Vector2 = new Phaser.Math.Vector2(0, 0);

  constructor(scene: Phaser.Scene, x: number, y: number) {
    // Create a simple player sprite
    super(scene, x, y, '');
    
    scene.add.existing(this);
    scene.physics.add.existing(this);

    // Draw player sprite (red square)
    const graphics = scene.make.graphics({ x: 0, y: 0, add: false });
    graphics.fillStyle(0xff0000, 1);
    graphics.fillRect(0, 0, 12, 12);
    graphics.generateTexture('player', 12, 12);
    graphics.destroy();

    this.setTexture('player');
    this.setBodySize(12, 12);
    this.body?.setCollideWorldBounds(true);
  }

  update(cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
    const moveAmount = 16; // Tile size
    let newVelocity = new Phaser.Math.Vector2(0, 0);

    if (cursors.up.isDown) {
      newVelocity.y = -this.speed;
    } else if (cursors.down.isDown) {
      newVelocity.y = this.speed;
    }

    if (cursors.left.isDown) {
      newVelocity.x = -this.speed;
    } else if (cursors.right.isDown) {
      newVelocity.x = this.speed;
    }

    this.body?.setVelocity(newVelocity.x, newVelocity.y);
  }
}
