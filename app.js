// 0. understand

// 1. create necessary variables

const ATTACK_PLAYER = 10;
const MONSTER_ATTACK_VALUE = 17;

const STRONG_ATTACK_VALUE = 24;

const ATTACK_MODE = 'ATTACK';
const STRONG_ATTACK_MODE = 'STRONG_ATTACK';

const HEAL_VALUE = 20;

let chosenMaxLife = 100;
let currentPlayerHealth = chosenMaxLife;
let currentMonsterHealth = chosenMaxLife;

//2. create all functions
adjustHealthBars(chosenMaxLife);

function endRound() {
  let playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;

  if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    console.log('Monster WIN!');
  } else if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    console.log('Player WIN!');
  } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
    console.log('Draw!');
  }
}

function healPlayerHandler() {
  if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
    console.log("You can't heal !");
  }
  increasePlayerHealth(HEAL_VALUE);
  currentPlayerHealth += HEAL_VALUE;
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
  attackMonster('ATTACK');
}

// create strong attack function
function strongAttack() {
  attackMonster('STRONG_ATTACK');
}

// call functions when the btn's click
attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttack);
healBtn.addEventListener('click', healPlayerHandler);
