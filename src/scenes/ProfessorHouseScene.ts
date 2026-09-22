import Phaser from 'phaser';
import houseInterior from '../images/IMG_5948.webp';

export class ProfessorHouseScene extends Phaser.Scene {
  constructor() {
    super({ key: 'ProfessorHouseScene' });
  }

  create() {
    const { width, height } = this.scale;
    const background = this.add.image(width / 2, height / 2, houseInterior);
    const scale = Math.min(width / background.width, height / background.height);
    background.setScale(scale);

    this.add.rectangle(width / 2, 18, width - 12, 24, 0x111827, 0.82);
    this.add.text(width / 2, 18, "Professor Oak's House", {
      fontSize: '13px',
      color: '#ffffff',
    }).setOrigin(0.5);

    this.add.text(width / 2, height - 12, 'Press B or ESC to leave', {
      fontSize: '10px',
      color: '#ffffff',
      backgroundColor: '#111827',
      padding: { x: 4, y: 2 },
    }).setOrigin(0.5);

    this.input.keyboard?.on('keydown-B', this.leaveHouse, this);
    this.input.keyboard?.on('keydown-ESC', this.leaveHouse, this);
  }

  private leaveHouse() {
    this.scene.start('OverworldScene');
  }
}
