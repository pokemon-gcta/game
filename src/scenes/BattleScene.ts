import Phaser from 'phaser';

export class BattleScene extends Phaser.Scene {
  private wildPokemon = 'Pikachu';

  constructor() {
    super({ key: 'BattleScene' });
  }

  create() {
    const { width, height } = this.scale;

    this.add.rectangle(width / 2, height / 2, width, height, 0x1f2937).setAlpha(0.9);
    this.add.text(width / 2, 40, 'Wild battle!', {
      fontSize: '18px',
      color: '#facc15',
      fontStyle: 'bold',
    }).setOrigin(0.5);

    this.wildPokemon = (globalThis as any).__wildPokemon ?? 'Pikachu';

    this.add.text(width / 2, 90, `${this.wildPokemon} appeared!`, {
      fontSize: '16px',
      color: '#ffffff',
    }).setOrigin(0.5);

    this.add.text(width / 2, 140, 'Press ENTER to continue', {
      fontSize: '14px',
      color: '#cbd5e1',
    }).setOrigin(0.5);

    this.input.keyboard?.once('keydown-ENTER', () => {
      this.scene.start('OverworldScene');
    });
  }
}
