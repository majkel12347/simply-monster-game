const ATTACK_VALUE = 10;

const chosenMaxLife = 100;
const attackValue = 10;

let currentPlayerHealth = chosenMaxLife;
let currentMonsterHealth = chosenMaxLife;

//1 adding attack function

function attackHandler() {
  let damage = dealMonsterDamage(ATTACK_VALUE);
  currentPlayerHealth -= damage;
}

attackBtn.addEventListener('click', attackHandler);
