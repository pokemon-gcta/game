import Phaser from 'phaser';
import { BootScene } from './scenes/BootScene';
import { MenuScene } from './scenes/MenuScene';
import { OverworldScene } from './scenes/OverworldScene';
import { ProfessorHouseScene } from './scenes/ProfessorHouseScene';
import { BattleScene } from './scenes/BattleScene';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 320,
  height: 240,
  parent: 'game',
  backgroundColor: '#0a1220',
  pixelArt: true,
  scene: [BootScene, MenuScene, OverworldScene, ProfessorHouseScene, BattleScene],
};

new Phaser.Game(config);
