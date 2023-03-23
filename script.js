'use strict';
//selecting element
const playerZeroEl = document.querySelector('.player--0');
const playerOneEl = document.querySelector('.player--1');
const scoreZeroEl = document.getElementById('score--0');
const scoreOneEl = document.getElementById('score--1');
const currentZeroEl = document.getElementById('current--0');
const currentOneEl = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;
//starting conditions
const init = function () {
  //holds the total scores
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  scoreZeroEl.textContent = 0;
  scoreOneEl.textContent = 0;
  currentZeroEl.textContent = 0;
  currentOneEl.textContent = 0;
  scores[0] = 0;
  scores[1] = 0;
  diceEl.classList.add('hidden');
  playerZeroEl.classList.remove('player--winner');
  playerOneEl.classList.remove('player--winner');
  playerZeroEl.classList.add('player--active');
  playerOneEl.classList.remove('player--active');
};
//initlazing the values
init();

//change player
const changeActivePlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = currentScore;
  //checks who is playing
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerZeroEl.classList.toggle('player--active');
  playerOneEl.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    //generate random number
    const rollNumber = Math.trunc(Math.random() * 6) + 1;

    //display dice image
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${rollNumber}.png`;

    //checks if the random number equal to 1
    if (rollNumber !== 1) {
      //add roll number to current score
      currentScore += rollNumber;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    }
    //change player
    else {
      changeActivePlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //add current score to active player score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    //score >= 100?
    if (scores[activePlayer] >= 100) {
      //winner background + name
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
      playing = false;
    } else {
      //switch player
      changeActivePlayer();
    }
  }
});

btnNew.addEventListener('click', init);
