'use strict';

//Selecting elements
const player0El = document.querySelector(`.player--0`);
const player1El = document.querySelector(`.player--1`);
const score0El = document.querySelector(`#score--0`);
const score1El = document.getElementById(`score--1`);
const current0El = document.getElementById(`current--0`);
const current1El = document.getElementById(`current--1`);
// .getElementbyId do the same as querySelector(`#xxx`); but it reputed to be faster*

const diceEl = document.querySelector(`.dice`);
const btnNew = document.querySelector(`.btn--new`);
const btnRoll = document.querySelector(`.btn--roll`);
const btnHold = document.querySelector(`.btn--hold`);

let scores, currentScore, activePlayer, playing;

// starding conditions

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add(`hidden`);
  player0El.classList.remove(`player--winner`);
  player1El.classList.remove(`player--winner`);
  player0El.classList.add(`player--active`);
  player1El.classList.remove(`player--active`);
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer == 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle(`player--active`);
  player1El.classList.toggle(`player--active`);
};
// Rolling dice functionality

btnRoll.addEventListener(`click`, function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2. Display the dice
    diceEl.classList.remove(`hidden`);
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for a rolled 1: if true, switch to next player
    if (dice !== 1) {
      // add dice to current score
      currentScore = currentScore + dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to next player --> reassigning the "activePlayer"
      switchPlayer();
    }
    // --> we have created it manually at first. But since we re-use it below and to respect the D R Y - we created a function instead :
    //     document.getElementById(`current--${activePlayer}`).textContent = 0;
    //     activePlayer = activePlayer == 0 ? 1 : 0;
    //     currentScore = 0;
    //     player0El.classList.toggle(`player--active`);
    //     player1El.classList.toggle(`player--active`);
    //   }
  }
});

btnHold.addEventListener(`click`, function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] = scores[1] + currentScore;
    // équivaut à écrire en clean scores [activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // if so finish the game
      playing = false;
      diceEl.classList.add(`hidden`);

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);
    } else {
      // If not switch to the next player
      switchPlayer();
    }
  }
});

// Reset the game

btnNew.addEventListener(`click`, init);

// document.querySelector(`.btn--new`).addEventListener(`click`, function () {
//     playing = true
// // Reset scores
// scores = [0, 0];
// // reset current scores
// currentScore = 0;
// // Active player back to player 0

// //Restart the game
// diceEl.classList.remove(`hidden`);

//       document
//         .querySelector(`.player--${activePlayer}`)
//         .classList.remove(`player--winner`);
//       document
//         .querySelector(`.player--${activePlayer}`)
//         .classList.remove(`player--active`);
//         document
//         .querySelector(`.player--0`)
//         .classList.add(`player--active`);

//         // Copy paste button flow?
//         btnHold.addEventListener(`click`, function () {
//           {
//               // 1. Add current score to active player's score
//               scores[activePlayer] = scores[1] + currentScore;
//               // équivaut à écrire en clean scores [activePlayer] += currentScore;

//               document.getElementById(`score--${activePlayer}`).textContent =
//                 scores[activePlayer];

//               //2. Check if player's score is >= 100
//               if (scores[activePlayer] >= 20) {
//                 // if so finish the game
//                 playing = false;
//                 diceEl.classList.add(`hidden`);

//                 document
//                   .querySelector(`.player--${activePlayer}`)
//                   .classList.add(`player--winner`);
//                 document
//                   .querySelector(`.player--${activePlayer}`)
//                   .classList.remove(`player--active`);
//               } else {
//                 // If not switch to the next player
//                 switchPlayer();
//               }
//             }
//           });
// })
