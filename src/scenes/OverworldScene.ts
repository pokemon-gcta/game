import Phaser from 'phaser';
import { Player } from '../entities/Player';

type TileType = 0 | 1 | 2 | 3;

const mapLayout: TileType[][] = [
  [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
  [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
  [2,1,0,0,0,0,1,1,0,0,0,0,1,1,1,0,0,1,1,2],
  [2,1,0,0,0,0,1,1,0,0,0,0,1,1,1,0,0,1,1,2],
  [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
  [2,1,0,0,0,0,1,1,0,0,0,0,1,1,1,0,0,0,1,2],
  [2,1,0,0,0,0,1,1,0,0,0,0,1,1,1,0,0,0,1,2],
  [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
  [2,1,0,0,0,0,1,1,0,0,0,0,1,1,1,0,0,0,1,2],
  [2,1,0,0,0,0,1,1,0,0,0,0,1,1,1,0,0,0,1,2],
  [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
  [2,1,0,0,0,0,1,1,0,0,0,0,1,1,1,0,0,1,1,2],
  [2,1,0,0,0,0,1,1,0,0,0,0,1,1,1,0,0,1,1,2],
  [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
  [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
];

// The tile directly in front of the professor's house door must remain walkable.
// Keeping this explicit prevents the entrance from being accidentally treated as a wall
// when the surrounding house collision tiles are updated.
const professorHouseEntrance = { x: 14, y: 12 };

export class OverworldScene extends Phaser.Scene {
  private player?: Player;
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  private tileSize = 16;
  private playerTileX = 4;
  private playerTileY = 5;
  private lastMoveAt = 0;
  private movementDelay = 160;
  private readonly encounterChance = 0.18;

  constructor() {
    super({ key: 'OverworldScene' });
  }

  create() {
    this.drawTilemap();
    this.player = new Player(this, this.playerTileX, this.playerTileY, this.tileSize);
    this.cursors = this.input.keyboard?.createCursorKeys();

    this.input.keyboard?.on('keydown-LEFT', () => this.tryMove(-1, 0));
    this.input.keyboard?.on('keydown-RIGHT', () => this.tryMove(1, 0));
    this.input.keyboard?.on('keydown-UP', () => this.tryMove(0, -1));
    this.input.keyboard?.on('keydown-DOWN', () => this.tryMove(0, 1));

    this.add.text(6, 6, 'Arrow keys to move', {
      fontSize: '10px',
      color: '#ffffff',
      backgroundColor: '#111827',
      padding: { x: 4, y: 2 },
    });
  }

  update(time: number) {
    if (!this.cursors || !this.player) {
      return;
    }

    const isMoving = this.cursors.left?.isDown || this.cursors.right?.isDown || this.cursors.up?.isDown || this.cursors.down?.isDown;
    if (!isMoving || time - this.lastMoveAt < this.movementDelay) {
      return;
    }

    if (this.cursors.left?.isDown) {
      this.tryMove(-1, 0);
    } else if (this.cursors.right?.isDown) {
      this.tryMove(1, 0);
    } else if (this.cursors.up?.isDown) {
      this.tryMove(0, -1);
    } else if (this.cursors.down?.isDown) {
      this.tryMove(0, 1);
    }
    this.lastMoveAt = time;
  }

  private drawTilemap() {
    const graphics = this.make.graphics({ x: 0, y: 0, add: false });

    for (let y = 0; y < mapLayout.length; y++) {
      for (let x = 0; x < mapLayout[y].length; x++) {
        const tile = mapLayout[y][x];

        if (x === professorHouseEntrance.x && y === professorHouseEntrance.y) {
          // Give the entrance a distinct doorway color while keeping it walkable.
          graphics.fillStyle(0x3ca0d0, 1);
        } else if (tile === 0) {
          graphics.fillStyle(0x2d8f4a, 1);
        } else if (tile === 1) {
          graphics.fillStyle(0x5eb75d, 1);
        } else if (tile === 2) {
          graphics.fillStyle(0x2f405e, 1);
        } else {
          graphics.fillStyle(0x3ca0d0, 1);
        }

        graphics.fillRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
      }
    }

    graphics.generateTexture('overworld-tiles', mapLayout[0].length * this.tileSize, mapLayout.length * this.tileSize);
    graphics.destroy();

    this.add.image(0, 0, 'overworld-tiles').setOrigin(0);
  }

  private tryMove(dx: number, dy: number) {
    if (!this.player) {
      return;
    }

    const nextX = this.player.tileX + dx;
    const nextY = this.player.tileY + dy;

    if (!this.isWalkable(nextX, nextY)) {
      return;
    }

    this.player.moveToTile(nextX, nextY, this.tileSize);
    this.playerTileX = nextX;
    this.playerTileY = nextY;

    if (mapLayout[nextY][nextX] === 0 && Math.random() < this.encounterChance) {
      const wildPokemon = ['Pikachu', 'Charmander', 'Bulbasaur', 'Squirtle', 'Mankey'][Math.floor(Math.random() * 5)];
      (globalThis as any).__wildPokemon = wildPokemon;
      this.scene.start('BattleScene');
    }
  }

  private isWalkable(x: number, y: number): boolean {
    if (y < 0 || y >= mapLayout.length || x < 0 || x >= mapLayout[y].length) {
      return false;
    }

    if (x === professorHouseEntrance.x && y === professorHouseEntrance.y) {
      return true;
    }

    return mapLayout[y][x] !== 2 && mapLayout[y][x] !== 3;
  }
}
