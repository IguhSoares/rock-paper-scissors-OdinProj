/** Creates an array with n times (10 by default) each option, in random order */
const shuffleOptions = (n = 10) => {
  const options = ['rock', 'paper', 'scissors'];
  let temp = [...options];
  const shuffled = [];
  let idx = -1;

  for (let i = 0; i < 3 * n; i++) {
    idx = Math.round(Math.random() * (temp.length - 1));
    shuffled[i] = temp[idx];
    temp.splice(idx, 1);

    if (temp.length === 0) temp = [...options];
  }

  return shuffled;
};

/** Generates and memoizes the shuffled options
 * returns a function which will choose a random option from the shuffled array
 */
const chooseFromShuffled = () => {
  const options = shuffleOptions();

  return () => {
    const choice = Math.round(Math.random() * (options.length - 1));

    return options[choice];
  };
};

const getComputerChoice = chooseFromShuffled();

const playRound = (playerChoice, computerChoice) => {
  const beatedBy = {
    rock: 'scissors',
    paper: 'rock',
    scissors: 'paper',
  };

  playerChoice = playerChoice.toLowerCase();
  computerChoice = computerChoice.toLowerCase();
  let result = '';

  if (beatedBy[playerChoice] === computerChoice) {
    result = `You Win! ${playerChoice} beats ${computerChoice}`;
  } else if (beatedBy[computerChoice] === playerChoice) {
    result = `You Lose! ${computerChoice} beats ${playerChoice}`;
  } else {
    result = `That's a tie! You both have chosen: ${playerChoice}`;
  }

  return result;
};

const getPlayerChoice = () => {
  const validChoices = {
    rock: true,
    paper: true,
    scissors: true,
  };
  let playerChoice = prompt('Choose your move:').toLowerCase();
  while (!(playerChoice in validChoices)) {
    playerChoice = prompt(
      'Invalid option.\nChoose rock, paper or scissors:'
    ).toLowerCase();
  }

  return playerChoice;
};

const game = () => {
  const score = {
    player: 0,
    computer: 0,
  };
  let result = undefined;
  let playerChoice = undefined;
  let computerChoice = undefined;

  for (let i = 1; i <= 5; i++) {
    playerChoice = getPlayerChoice();
    computerChoice = getComputerChoice();
    result = playRound(playerChoice, computerChoice);

    if (result.match(/win/i)) {
      score.player++;
    } else if (result.match(/lose/i)) {
      score.computer++;
    }

    console.log(result);
  }

  return score;
};

document.querySelector('#start').addEventListener('click', _ => {
  const nameInput = document.querySelector('#player-name-input');
  const playerName = nameInput.value;

  if (!playerName) {
    nameInput.classList.add('blink');
    window.setTimeout(() => {
      nameInput.setAttribute('placeholder', '');
    }, 200);

    window.setTimeout(() => {
      nameInput.classList.remove('blink');
      nameInput.setAttribute('placeholder', 'Type in your name');
    }, 400);
  } else {
    document.querySelectorAll('.player-name').forEach(el => {
      el.textContent = playerName;
    });

    const hiddenElements = document.querySelectorAll('.hidden');
    document.querySelector('#welcome').classList.toggle('hidden');
    hiddenElements.forEach(el => el.classList.toggle('hidden'));
  }
});
