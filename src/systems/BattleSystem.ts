import { Pokemon, PokemonInstance, Move } from '../types/Pokemon';

export class BattleSystem {
  private playerTeam: PokemonInstance[] = [];
  private enemyTeam: PokemonInstance[] = [];
  private currentPlayerPokemon?: PokemonInstance;
  private currentEnemyPokemon?: PokemonInstance;
  private battleLog: string[] = [];

  setPlayerTeam(team: PokemonInstance[]) {
    this.playerTeam = team;
    this.currentPlayerPokemon = team[0];
  }

  setEnemyTeam(team: PokemonInstance[]) {
    this.enemyTeam = team;
    this.currentEnemyPokemon = team[0];
  }

  executeMove(playerMove: Move, playerPokemon: PokemonInstance, enemyPokemon: PokemonInstance) {
    // Calculate damage
    const damage = this.calculateDamage(playerPokemon, enemyPokemon, playerMove);
    const accuracy = Math.random() * 100 < playerMove.accuracy;

    if (!accuracy) {
      this.battleLog.push(`${playerPokemon.pokemon.name} used ${playerMove.name} but it missed!`);
      return;
    }

    enemyPokemon.currentHP = Math.max(0, enemyPokemon.currentHP - damage);
    this.battleLog.push(`${playerPokemon.pokemon.name} used ${playerMove.name}!`);
    this.battleLog.push(`${enemyPokemon.pokemon.name} took ${damage} damage!`);

    if (enemyPokemon.currentHP <= 0) {
      this.battleLog.push(`${enemyPokemon.pokemon.name} fainted!`);
    }
  }

  private calculateDamage(attacker: PokemonInstance, defender: PokemonInstance, move: Move): number {
    const baseAttack = move.category === 'physical' ? attacker.pokemon.baseAttack : attacker.pokemon.baseSpAtk;
    const baseDefense = move.category === 'physical' ? defender.pokemon.baseDefense : defender.pokemon.baseSpDef;
    
    const level = attacker.level;
    const basePower = move.power;

    // Simplified damage formula
    const damage = ((((2 * level / 5 + 2) * basePower * baseAttack) / baseDefense) / 50) + 2;

    // Add randomness (85-100%)
    const randomMultiplier = 0.85 + Math.random() * 0.15;

    return Math.floor(damage * randomMultiplier);
  }

  getBattleLog(): string[] {
    return this.battleLog;
  }

  clearBattleLog() {
    this.battleLog = [];
  }
}
