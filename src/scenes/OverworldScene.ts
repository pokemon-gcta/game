import Phaser from 'phaser';
import { Player } from '../entities/Player';

export class OverworldScene extends Phaser.Scene {
  private player?: Player;
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super({ key: 'OverworldScene' });
  }

  create() {
    // Create a simple tilemap (using graphics for now)
    this.drawTilemap();

    // Create player
    this.player = new Player(this, 120, 80);

    // Setup input
    this.cursors = this.input.keyboard?.createCursorKeys();

    // Debug text
    this.add.text(5, 5, 'Use arrow keys to move', {
      fontSize: '10px',
      color: '#fff',
    });
  }

  update() {
    if (this.player && this.cursors) {
      this.player.update(this.cursors);
    }
  }

  private drawTilemap() {
    const graphics = this.make.graphics({ x: 0, y: 0, add: false });
    graphics.fillStyle(0x228b22, 1);
    graphics.fillRect(0, 0, 240, 160);

    // Draw grass tiles
    graphics.fillStyle(0x00aa00, 1);
    for (let x = 0; x < 240; x += 16) {
      for (let y = 0; y < 160; y += 16) {
        graphics.fillRect(x, y, 16, 16);
        graphics.strokeLineStyle(1, 0x008800, 0.5);
        graphics.strokeRect(x, y, 16, 16);
      }
    }

    graphics.generateTexture('tilemap', 240, 160);
    graphics.destroy();

    this.add.image(120, 80, 'tilemap');
  }
}
