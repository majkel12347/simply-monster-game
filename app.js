// 0. understand

// 1. create necessary variables
const MAX_LIFE = 100;

const ATTACK_PLAYER = 10;
const MONSTER_ATTACK_VALUE = 17;

const STRONG_ATTACK_VALUE = 24;

const ATTACK_MODE = 'ATTACK';
const STRONG_ATTACK_MODE = 'STRONG_ATTACK';

let currentPlayerHealth = MAX_LIFE;
let currentMonsterHealth = MAX_LIFE;

// call function
adjustHealthBars(MAX_LIFE);

//
function attackMonster(mode) {
  let maxDamage;
  if (mode === 'ATTACK') {
    maxDamage = ATTACK_PLAYER;
  } else if (mode === 'STRONG_ATTACK') {
    maxDamage = STRONG_ATTACK_VALUE;
  }
  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;

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

// create attack function
function attackHandler() {
  attackMonster('ATTACK');
}

// create strong attack function
function strongAttack() {
  attackMonster('STRONG_ATTACK');
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttack);
