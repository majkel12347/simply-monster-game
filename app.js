// 0. understand

// 1. create necessary variables

const ATTACK_PLAYER = 10;
const MONSTER_ATTACK_VALUE = 17;

const STRONG_ATTACK_VALUE = 24;

const ATTACK_MODE = 'ATTACK';
const STRONG_ATTACK_MODE = 'STRONG_ATTACK';

const HEAL_VALUE = 20;

const enteredValue = prompt('enter max life number');

let chosenMaxLife = parseInt(enteredValue);
let currentPlayerHealth = chosenMaxLife;
let currentMonsterHealth = chosenMaxLife;
let hasBonusLife = true;

function inputHandler() {
  if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
    chosenMaxLife = 100;
  }
}

inputHandler();

//2. create all functions
adjustHealthBars(chosenMaxLife);

function reset() {
  currentPlayerHealth = chosenMaxLife;
  currentMonsterHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
}

function endRound() {
  let initialPlayerHealth = currentPlayerHealth;
  let playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;

  // set bonusLife
  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPlayerHealth;
    setPlayerHealth(initialPlayerHealth);
    console.log('You Would be dead, but the bonus life save You!');
  }

  if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    console.log('Monster WIN!');
  } else if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    console.log('Player WIN!');
  } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
    console.log('Draw!');
  }

  if (currentPlayerHealth <= 0 || currentMonsterHealth <= 0) reset();
}

function healPlayerHandler() {
  let healValue;
  if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
    healValue = chosenMaxLife - currentPlayerHealth;
    console.log("You can't heal more than you initial MaxLife!!!");
  } else {
    healValue = HEAL_VALUE;
  }
  increasePlayerHealth(healValue);
  currentPlayerHealth += healValue;
  endRound();
}

function attackMonster(mode) {
  let maxDamage;
  if (mode === 'ATTACK') {
    maxDamage = ATTACK_PLAYER;
  } else if (mode === 'STRONG_ATTACK') {
    maxDamage = STRONG_ATTACK_VALUE;
  }
  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;

  endRound();
}

// create attack function
function attackHandler() {
  attackMonster(ATTACK_MODE);
}

// create strong attack function
function strongAttack() {
  attackMonster(STRONG_ATTACK_MODE);
}

// call functions when the btn's click
attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttack);
healBtn.addEventListener('click', healPlayerHandler);
