const ATTACK_VALUE = 10;
const ATTACK_MONSTER_VALUE = 17;

const STRONG_ATTACK_VALUE = 24;

const chosenMaxLife = 100;
const attackValue = 10;

let currentPlayerHealth = chosenMaxLife;
let currentMonsterHealth = chosenMaxLife;

// adding function to minimize and avoid redundant function!!!
function attackMonster(mode) {
  let maxDamage;
  if (maxDamage === 'ATTACK') {
    maxDamage = ATTACK_VALUE;
  } else if (maxDamage === 'STRONG_ATTACK') {
    maxDamage = STRONG_ATTACK_VALUE;
  }
  // set damage
  let damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;

  let monsterDamage = dealPlayerDamage(maxDamage);
  currentPlayerHealth -= monsterDamage;

  if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    console.log('You lose!!!');
  } else if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    console.log('You win!!!');
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
    console.log('Draw!!!');
  }
}

// adding strong attack function
function strongAttackHandler() {
  attackMonster('ATTACK');
}

//1 adding attack function
function attackHandler() {
  attackMonster('STRONG_ATTACK');
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
