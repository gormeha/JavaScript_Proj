/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamestate;

resetGame();

document.querySelector('.btn-roll').addEventListener('click', function(){

  if (gamestate){
      // Random no for Dice
      var dice = Math.floor(Math.random() * 6) + 1;

      // display the result as per dice no.
      var diceDOM = document.querySelector('.dice');
      diceDOM.style.display = 'block';
      diceDOM.src = 'dice-' + dice + '.png';

      // update the round score if the no is not 1
      if(dice !== 1){
        // add the score
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
      } else{
        // cahnge palyer
        changePlayer();
      }
    }
});


document.querySelector('.btn-hold').addEventListener('click', function(){

     if (gamestate){
       // add current score to total scores
       scores[activePlayer] += roundScore;

       //Update the UI
       document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]

       if(scores[activePlayer] >= 15){
         document.querySelector('#name-' + activePlayer).textContent = 'Hey Winner!'
         document.querySelector('.dice').style.display = 'none'
         document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
         document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
         gamestate = false;
         } else{
         // change the palyer
         changePlayer();
       }
     }
});

document.querySelector('.btn-new').addEventListener('click', resetGame);


function resetGame(){
  scores = [0,0];
  roundScore = 0;
  activePlayer = 0;
  gamestate = true;


  document.querySelector('.dice').style.display = 'none';

  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');

}

function changePlayer(){
  // change the palyer
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  document.querySelector('.dice').style.display = 'none';

}
