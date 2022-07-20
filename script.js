'use strict';

let p1Score = document.getElementById('score--0');
let p2Score = document.getElementById('score--1');
let current1 = document.getElementById('current--0');
let current2 = document.getElementById('current--1');
const dice = document.querySelector('.dice');
const rollDice = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');
const p0El = document.querySelector('.player--0');
const p1El = document.querySelector('.player--1');
const newGame = document.querySelector('.btn--new');

let currentScore, currentPlayer, score, playing;

const init = () => {
  score = [0, 0];
  currentScore = 0;
  currentPlayer = 0;
  p1Score.textContent = 0;
  p2Score.textContent = 0;
  playing = true;
  dice.classList.add('hidden');
  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector('.player--1').classList.remove('player--active');
  document.querySelector('.player--1').classList.remove('player--winner');
  current1.textContent = 0;
  current2.textContent = 0;
};

init();

const switchPlayer = () => {
  document.getElementById(`current--${currentPlayer}`).textContent = 0;
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  currentScore = 0;
  p0El.classList.toggle('player--active');
  p1El.classList.toggle('player--active');
};

rollDice.addEventListener('click', function () {
  if (playing) {
    let randomNo = Math.trunc(Math.random() * 6) + 1;
    console.log(randomNo);

    dice.classList.remove('hidden');
    dice.src = `dice-${randomNo}.png`;

    if (randomNo !== 1) {
      currentScore = currentScore + randomNo;
      document.getElementById(`current--${currentPlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

hold.addEventListener('click', function () {
  if (playing) {
    score[currentPlayer] += currentScore;
    document.getElementById(`score--${currentPlayer}`).textContent =
      score[currentPlayer];
  }

  if (score[currentPlayer] >= 100) {
    playing = false;
    document
      .querySelector(`.player--${currentPlayer}`)
      .classList.remove('player--active');
    document
      .querySelector(`.player--${currentPlayer}`)
      .classList.add('player--winner');
    dice.classList.add('hidden');
  } else {
    switchPlayer();
  }
});

newGame.addEventListener('click', init);
