import Phaser from 'phaser';
import { BootScene } from './scenes/BootScene';
import { MenuScene } from './scenes/MenuScene';
import { OverworldScene } from './scenes/OverworldScene';
import { BattleScene } from './scenes/BattleScene';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 320,
  height: 240,
  parent: 'game',
  backgroundColor: '#0a1220',
  pixelArt: true,
  scene: [BootScene, MenuScene, OverworldScene, BattleScene],
};

new Phaser.Game(config);
