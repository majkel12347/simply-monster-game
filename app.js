const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;

const HEAL_VALUE = 20;

const MONSTER_ATTACK_VALUE = 14;
const MONSTER_STRONG_ATTACK_VALUE = 24;

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife);

function attackHandler() {
  const damage = dealMonsterDamage(ATTACK_VALUE);
  currentPlayerHealth -= damage;
}

attackBtn.addEventListener('click', attackHandler);
