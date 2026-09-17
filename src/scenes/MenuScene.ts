import Phaser from 'phaser';

export class MenuScene extends Phaser.Scene {
  private selectedIndex: number = 0;

  constructor() {
    super({ key: 'MenuScene' });
  }

  create() {
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;

    // Title
    this.add.text(centerX, centerY - 40, 'POKÉMON', {
      fontSize: '24px',
      color: '#fff',
      align: 'center',
      fontFamily: 'Arial Black',
    }).setOrigin(0.5);

    // Menu options
    const options = ['New Game', 'Continue', 'Settings', 'Exit'];
    const menuTexts: Phaser.GameObjects.Text[] = [];

    options.forEach((option, index) => {
      const text = this.add.text(centerX, centerY + index * 30, option, {
        fontSize: '16px',
        color: index === 0 ? '#ffff00' : '#fff',
        align: 'center',
      }).setOrigin(0.5);
      menuTexts.push(text);
    });

    // Input handling
    this.input.keyboard?.on('keydown-UP', () => {
      this.selectedIndex = Math.max(0, this.selectedIndex - 1);
      this.updateMenuSelection(menuTexts);
    });

    this.input.keyboard?.on('keydown-DOWN', () => {
      this.selectedIndex = Math.min(options.length - 1, this.selectedIndex + 1);
      this.updateMenuSelection(menuTexts);
    });

    this.input.keyboard?.on('keydown-ENTER', () => {
      if (this.selectedIndex === 0) {
        this.scene.start('OverworldScene');
      }
    });
  }

  private updateMenuSelection(texts: Phaser.GameObjects.Text[]) {
    texts.forEach((text, index) => {
      text.setColor(index === this.selectedIndex ? '#ffff00' : '#fff');
    });
  }
}
