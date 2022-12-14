// 0. understand

// 1. create necessary variables

const ATTACK_PLAYER = 10;
const MONSTER_ATTACK_VALUE = 17;

const STRONG_ATTACK_VALUE = 24;

const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'STRONG_ATTACK';

const HEAL_VALUE = 20;

// create needed const for LOG
const LOG_EVENT_STRONG_ATTACK = 'STRONG_ATTACK';
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';

let battleLog = [];
let lastLogEntry;

// check for error input value by 'throw'
function getMaxLifeValues() {
  const enteredValue = prompt('enter max life number');
  const parsedValue = parseInt(enteredValue);

  if (isNaN(parsedValue) || parsedValue <= 0) {
    throw { message: 'error!!! wrong input value type!' };
  }
  return parsedValue;
}

let chosenMaxLife;

// put to try only that pieces of code, what can't be controled, like input from above... and Network Errors!
try {
  chosenMaxLife = getMaxLifeValues();
} catch (error) {
  console.log(error);
  chosenMaxLife = 100;
  console.log('Invalid user input, default number set to 100');
}

let currentPlayerHealth = chosenMaxLife;
let currentMonsterHealth = chosenMaxLife;
let hasBonusLife = true;

//2. create all functions
adjustHealthBars(chosenMaxLife);

function writeToLog(ev, val, monsterHealth, playerHealth) {
  let logEntry = {
    event: ev,
    value: val,
    finalMonsterHealth: monsterHealth,
    finalPlayerHealth: playerHealth,
  };

  if (ev === LOG_EVENT_PLAYER_ATTACK) {
    logEntry = {
      event: ev,
      value: val,
      target: 'MONSTER',
      finalMonsterHealth: monsterHealth,
      finalPlayerHealth: playerHealth,
    };
  } else if (ev === LOG_EVENT_MONSTER_ATTACK) {
    logEntry = {
      event: ev,
      value: val,
      target: 'PLAYER',
      finalMonsterHealth: monsterHealth,
      finalPlayerHealth: playerHealth,
    };
  } else if (ev === LOG_EVENT_STRONG_ATTACK) {
    logEntry = {
      event: ev,
      value: val,
      target: 'MONSTER',
      finalMonsterHealth: monsterHealth,
      finalPlayerHealth: playerHealth,
    };
  } else if (ev === LOG_EVENT_PLAYER_HEAL) {
    logEntry = {
      event: ev,
      value: val,
      target: 'PLAYER',
      finalMonsterHealth: monsterHealth,
      finalPlayerHealth: playerHealth,
    };
  } else if (ev === LOG_EVENT_GAME_OVER) {
    logEntry = {
      event: ev,
      value: val,
      finalMonsterHealth: monsterHealth,
      finalPlayerHealth: playerHealth,
    };
  }

  battleLog.push(logEntry);
}

function reset() {
  currentPlayerHealth = chosenMaxLife;
  currentMonsterHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
}

function endRound() {
  const initialPlayerHealth = currentPlayerHealth;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;

  writeToLog(
    LOG_EVENT_MONSTER_ATTACK,
    playerDamage,
    currentMonsterHealth,
    currentPlayerHealth
  );

  // set bonusLife
  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPlayerHealth;
    setPlayerHealth(initialPlayerHealth);
    console.log('You Would be dead, but the bonus life save You!');
  }

  if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    console.log('Monster WIN!');
    writeToLog(
      LOG_EVENT_GAME_OVER,
      'Monster Win',
      currentMonsterHealth,
      currentPlayerHealth
    );
  } else if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    console.log('Player WIN!');
    writeToLog(
      LOG_EVENT_GAME_OVER,
      'Player Win',
      currentMonsterHealth,
      currentPlayerHealth
    );
  } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
    console.log('Draw!');
    writeToLog(
      LOG_EVENT_GAME_OVER,
      'Draw',
      currentMonsterHealth,
      currentPlayerHealth
    );
  }

  if (currentPlayerHealth <= 0 || currentMonsterHealth <= 0) reset();
}

function healPlayerHandler() {
  let healValue;
  if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
    healValue = chosenMaxLife - currentPlayerHealth;
    console.log("You can't heal more than you initial MaxLife!!!");
  } else {
    healValue = HEAL_VALUE;
  }
  increasePlayerHealth(healValue);
  currentPlayerHealth += healValue;
  writeToLog(
    LOG_EVENT_PLAYER_HEAL,
    healValue,
    currentMonsterHealth,
    currentPlayerHealth
  );
  endRound();
}

function attackMonster(mode) {
  let maxDamage = mode === MODE_ATTACK ? ATTACK_PLAYER : STRONG_ATTACK_VALUE;
  let logEvent =
    mode === MODE_ATTACK ? LOG_EVENT_PLAYER_ATTACK : LOG_EVENT_STRONG_ATTACK;
  if (mode === MODE_ATTACK) {
    maxDamage = ATTACK_PLAYER;
    logEvent = LOG_EVENT_PLAYER_ATTACK;
  } else if (mode === MODE_STRONG_ATTACK) {
    maxDamage = STRONG_ATTACK_VALUE;
    logEvent = LOG_EVENT_STRONG_ATTACK;
  }

  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;

  writeToLog(logEvent, damage, currentMonsterHealth, currentPlayerHealth);

  endRound();
}

// create attack function
function attackHandler() {
  attackMonster(MODE_ATTACK);
}

// create strong attack function
function strongAttack() {
  attackMonster(MODE_STRONG_ATTACK);
}

function printLogHandler() {
  let i = 0;
  for (const logEntry of battleLog) {
    if ((!lastLogEntry && lastLogEntry !== 0) || lastLogEntry < i) {
      console.log(`#####${i}`);
      for (const key in logEntry) {
        console.log(`${key} => ${logEntry[key]}`);
      }
      lastLogEntry = i;
      break;
    }

    i++;
  }
}

// call functions when the btn's click
attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttack);
healBtn.addEventListener('click', healPlayerHandler);
logBtn.addEventListener('click', printLogHandler);
