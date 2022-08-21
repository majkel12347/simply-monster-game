const maxLife = 100;

let currentPlayerHealth = maxLife;
let currentMonsterLife = maxLife;

//1 add attack function
function attackHandler() {
  let damage = dealMonsterDamage(maxLife);
  playerHealthBar -= damage;

  let playerDamage = dealPlayerDamage(maxLife);
  monsterHealthBar -= playerDamage;
}

attackBtn.addEventListener('click', attackHandler);
