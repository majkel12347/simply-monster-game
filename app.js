// 0. understand

// 1. create necessary variables
const maxLife = 100;

const ATTACK_PLAYER = 10;
const ATTACK_MONSTER = 17;

let currentPlayerHealth = maxLife;
let currentMonsterHealth = maxLife;

// call function
adjustHealthBars(maxLife);

// create attack function
function attackHandler() {
  let damage = dealMonsterDamage(ATTACK_PLAYER);
  currentMonsterHealth -= damage;

  let playerDamage = dealPlayerDamage(ATTACK_MONSTER);
  currentPlayerHealth -= playerDamage;
}

attackBtn.addEventListener('click', attackHandler);
