const ATTACK_VALUE = 10;
const ATTACK_MONSTER_VALUE = 17;

const chosenMaxLife = 100;
const attackValue = 10;

let currentPlayerHealth = chosenMaxLife;
let currentMonsterHealth = chosenMaxLife;

//1 adding attack function

function attackHandler() {
  let damage = dealMonsterDamage(ATTACK_VALUE);
  currentPlayerHealth -= damage;

  let monsterDamage = dealPlayerDamage(ATTACK_MONSTER_VALUE);
  currentMonsterHealth -= monsterDamage;
}

attackBtn.addEventListener('click', attackHandler);
