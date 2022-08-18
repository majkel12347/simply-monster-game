const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;

const HEAL_VALUE = 20;

const MONSTER_ATTACK_VALUE = 14;
const MONSTER_STRONG_ATTACK_VALUE = 24;

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife);

function onDamage(mode) {
  let maxDamage;
  if (mode === 'ATTACK') {
    maxDamage = ATTACK_VALUE;
  } else if (mode === 'STRONG_ATTACK') {
    maxDamage = STRONG_ATTACK_VALUE;
  }

  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;

  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;

  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    console.log('You Win!!!');
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    console.log('Monster Win!!!');
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
    console.log('Draw!!!');
  }
}

function attackHandler() {
  onDamage('ATTACK');
}

function strongAttack() {
  onDamage('STRONG_ATTACK');
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttack);
