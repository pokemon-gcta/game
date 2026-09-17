/* Reliable move execution patch for the inline battle game. */
(function installMoveExecutionFix() {
  function fixedEnemyAttack() {
    if (scene !== 'battle' || enemyCurrentHP <= 0 || playerCurrentHP <= 0 || !enemyMoves.length) return;

    const enemyMoveId = enemyMoves[Math.floor(Math.random() * enemyMoves.length)];
    const enemyMoveData = moves[enemyMoveId];
    if (!enemyMoveData) return;

    if (Math.random() * 100 >= enemyMoveData.accuracy) {
      battleLog = `${enemyPokemon} used ${enemyMoveData.name}, but it missed!`;
      return;
    }

    const baseDamage = Math.max(1, enemyMoveData.power || 15);
    const variance = Math.floor(Math.random() * 11) - 5;
    const damage = Math.max(1, Math.floor(baseDamage / 2) + variance);
    playerCurrentHP = Math.max(0, playerCurrentHP - damage);
    battleLog = `${enemyPokemon} used ${enemyMoveData.name}! Dealt ${damage} damage!`;
  }

  function fixedExecuteMove() {
    if (scene !== 'battle' || battleMenuState !== 'moves' || moveInProgress || enemyCurrentHP <= 0 || playerCurrentHP <= 0) return;

    moveInProgress = true;
    const moveData = moves[playerMoves[selectedMove]];
    if (!moveData) {
      battleLog = 'That move is unavailable!';
      moveInProgress = false;
      return;
    }

    if (Math.random() * 100 >= moveData.accuracy) {
      battleLog = `${playerPokemon} used ${moveData.name}, but it missed!`;
    } else {
      const baseDamage = Math.max(1, moveData.power || 15);
      const variance = Math.floor(Math.random() * 11) - 5;
      const damage = Math.max(1, Math.floor(baseDamage / 2) + variance);
      enemyCurrentHP = Math.max(0, enemyCurrentHP - damage);
      battleLog = `${playerPokemon} used ${moveData.name}! Dealt ${damage} damage!`;
    }

    if (enemyCurrentHP <= 0) {
      battleMenuState = 'action';
      selectedOption = 0;
      battleLog = `${enemyPokemon} fainted! You won!`;
      moveInProgress = false;
      return;
    }

    setTimeout(() => {
      if (scene !== 'battle') {
        moveInProgress = false;
        return;
      }

      fixedEnemyAttack();
      if (playerCurrentHP <= 0) {
        battleLog = `${playerPokemon} fainted!`;
      } else {
        battleMenuState = 'action';
        selectedOption = 0;
        battleLog = `What will ${playerPokemon} do?`;
      }
      moveInProgress = false;
    }, 800);
  }

  // These bindings are shared with the original inline script because this
  // file is loaded after index.html's game script.
  executeMove = fixedExecuteMove;
  enemyAttack = fixedEnemyAttack;
})();
