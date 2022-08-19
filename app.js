const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;

const HEAL_VALUE = 20;

const MONSTER_ATTACK_VALUE = 14;
const MONSTER_STRONG_ATTACK_VALUE = 24;

// avoid miss typing
const MODE_ATTACK = 'ATTACK'; // or number like in this case 0
const MODE_STRONG_ATTACK = 'STRONG_ATTACK'; // or bumber like in this case 1

const enteredValue = parseInt(prompt('Maximum life for You and the monster'));

if (isNaN(enteredValue) || enteredValue <= 0) {
  chosenMaxLife = 100;
}

let chosenMaxLife = enteredValue;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

function reset() {
  currentMonsterHealth = chosenMaxLife;
  currentPlayerHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
}

function endRound() {
  let initialPlayerHealth = currentPlayerHealth;

  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;

  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPlayerHealth;
    setPlayerHealth(initialPlayerHealth);
    console.log('You would be death, but bonus life save You!');
  }

  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    console.log('You Win!!!');
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    console.log('Monster Win!!!');
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
    console.log('Draw!!!');
  }

  if (currentMonsterHealth <= 0 || currentMonsterHealth <= 0) {
    reset();
  }
}

function onDamage(mode) {
  let maxDamage;
  if (mode === MODE_ATTACK) {
    maxDamage = ATTACK_VALUE;
  } else if (mode === MODE_STRONG_ATTACK) {
    maxDamage = STRONG_ATTACK_VALUE;
  }

  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;

  endRound();
}

function attackHandler() {
  onDamage(MODE_ATTACK);
}

function strongAttack() {
  onDamage(MODE_STRONG_ATTACK);
}

function healPlayerHandler() {
  let healValue;
  if (currentPlayerHealth >= chosenMaxLife - healValue) {
    console.log("you can't heal more than you initial health");
    healValue = chosenMaxLife - HEAL_VALUE;
  } else {
    healValue = HEAL_VALUE;
  }
  increasePlayerHealth(HEAL_VALUE);
  currentPlayerHealth += HEAL_VALUE;

  endRound();
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttack);
healBtn.addEventListener('click', healPlayerHandler);
