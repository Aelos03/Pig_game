'use strict';
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1'); //Alternative way to get element and advantage of it, is speed. WORKS ONLY WITH ID!!!
const ScoreTemp0El = document.getElementById('current--0');
const ScoreTemp1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnhold = document.querySelector('.btn--hold');

const scores = [0, 0];

let ScoreTemp = 0;
let activePlayer = 0;
let playing = true;

//Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const switchFunc = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;

  ScoreTemp = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. generate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    //2.display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //3. check if rolled 1
    if (dice !== 1) {
      //add dice value to score
      ScoreTemp += dice; // Same sa writing ScoreTemp = ScoreTemp + dice!!!
      document.getElementById(`current--${activePlayer}`).textContent = ScoreTemp;
    } else {
      //switch player
      switchFunc();
      // document.getElementById(`current--${activePlayer}`).textContent = 0;
      // ScoreTemp = 0;
      // document.querySelector(`.player--${activePlayer}`).classList.remove('player--active'); // Using add and remove
      // activePlayer = activePlayer === 0 ? 1 : 0;
      // player0El.classList.toggle('player--active');
      // player1El.classList.toggle('player--active'); //using toggle method to swith backgroud
      // document.querySelector(`.player--${activePlayer}`).classList.add('player--active');
    }
  }
});

btnhold.addEventListener('click', function () {
  //1. add current score to active player overall score
  if (playing) {
    scores[activePlayer] += ScoreTemp;

    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

    //2. check if score is at last 100 if so then finish the game
    if (scores[activePlayer] >= 20) {
      playing = false;
      diceEl.classList.add('hidden');
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
      console.log(scores);
      console.log(activePlayer);
    } else {
      switchFunc();
    }
  }
});
