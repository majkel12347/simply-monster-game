const ATTACK_VALUE = 10;
const ATTACK_MONSTER_VALUE = 17;

const STRONG_ATTACK_VALUE = 24;

const chosenMaxLife = 100;
const attackValue = 10;

let currentPlayerHealth = chosenMaxLife;
let currentMonsterHealth = chosenMaxLife;

// adding strong attack function
function strongAttack() {
  let damage = dealMonsterDamage(STRONG_ATTACK_VALUE);
  currentMonsterHealth -= damage;

  let monsterDamage = dealPlayerDamage(ATTACK_MONSTER_VALUE);
  currentPlayerHealth -= monsterDamage;

  if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    console.log('You lose!!!');
  } else if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    console.log('You win!!!');
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
    console.log('Draw!!!');
  }
}

//1 adding attack function
function attackHandler() {
  // set damage
  let damage = dealMonsterDamage(ATTACK_VALUE);
  currentMonsterHealth -= damage;

  let monsterDamage = dealPlayerDamage(ATTACK_MONSTER_VALUE);
  currentPlayerHealth -= monsterDamage;

  if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    console.log('You lose!!!');
  } else if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    console.log('You win!!!');
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
    console.log('Draw!!!');
  }
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttack);
