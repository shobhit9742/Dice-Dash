'use strict';

// Selecting Elements

const scr0El = document.querySelector('#score--0');
const scr1El = document.querySelector('#score--1');
const current0 = document.querySelector('#current--0');
const current1 = document.querySelector('#current--1');

const btnroll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const diceEl = document.querySelector('.dice');
const aPlayer0 = document.querySelector('.player--0');
const aPlayer1 = document.querySelector('.player--1');

// Starting Conditions
scr0El.textContent = 0;
scr1El.textContent = 0;
diceEl.classList.add('hidden');
current0.textContent = 0;
current1.textContent = 0;

let currenscore = 0;
let score = [0, 0];
let activePlayer = 0;
let playing = true;

btnroll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6 + 1);

    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    console.log(dice);
    if (dice !== 1) {
      currenscore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currenscore;
    } else if (dice === 1) {
      activePlayer = activePlayer === 0 ? 1 : 0;
      currenscore = 0;
      current0.textContent = 0;
      current1.textContent = 0;
      aPlayer0.classList.toggle('player--active');
      aPlayer1.classList.toggle('player--active');
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    score[activePlayer] += currenscore;
    document.getElementById(`score--${activePlayer}`).textContent = score[activePlayer];
    if (score[activePlayer] >= 20) {
      playing = false;
      diceEl.classList.add('hidden');
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    } else {
      currenscore = 0;
      current0.textContent = 0;
      current1.textContent = 0;
      activePlayer = activePlayer === 0 ? 1 : 0;

      let butt = scr0El.textContent;

      aPlayer0.classList.toggle('player--active');
      aPlayer1.classList.toggle('player--active');
    }
  }
});

btnNew.addEventListener('click', function () {
  playing = true;
  aPlayer0.classList.add('player--active');
  aPlayer1.classList.remove('player--active');

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  activePlayer = activePlayer === 1 ? 0 : 0;
  currenscore = 0;
  current0.textContent = 0;
  current1.textContent = 0;
  score = [0, 0];
  scr0El.textContent = 0;
  scr1El.textContent = 0;
  diceEl.classList.add('hidden');
});
