import Phaser from 'phaser';

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload() {
    // Load assets here
    // Example: this.load.image('player', 'assets/player.png');
  }

  create() {
    // Initialize game data, settings, etc.
    this.scene.start('MenuScene');
  }
}
