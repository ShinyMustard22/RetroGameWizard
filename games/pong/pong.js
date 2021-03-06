import Ball from './components/ball.js';
import Paddle from './components/paddle.js';

const options = document.querySelector('.options');
const pause = document.querySelector('.fa-pause');
const play = document.createElement('i');
play.classList.add('fa-solid');
play.classList.add('fa-play');
let isPaused = false;

const arena = document.querySelector('.arena');
const ball = new Ball(document.querySelector('.ball'), arena);
const playerPaddle = new Paddle(document.getElementById('player-paddle'), arena);
const computerPaddle = new Paddle(document.getElementById('computer-paddle'), arena);

const playerScore = document.getElementById('player-score');
const computerScore = document.getElementById('computer-score');

let lastTime = 0;
function update(time) {
    if (lastTime != 0 && !isPaused) {
        const delta = time - lastTime;
        const victor = ball.update(delta, playerPaddle, computerPaddle);
        computerPaddle.computerUpdate(delta, ball.y);

        // When player wins...
        if (victor === 0) {
            ball.reset();
            computerPaddle.reset();
            playerScore.textContent = parseInt(playerScore.textContent) + 1;
        }

        // When computer wins...
        else if (victor === 1) {
            ball.reset();
            computerPaddle.reset();
            computerScore.textContent = parseInt(computerScore.textContent) + 1;
        }
    }

    lastTime = time
    window.requestAnimationFrame(update);
}

arena.addEventListener('mousemove', e => {
    if (!isPaused) playerPaddle.playerUpdate(e);
});

pause.addEventListener('click', pauseGame);
play.addEventListener('click', unpauseGame);

function pauseGame() {
    isPaused = true;
    options.removeChild(pause);
    options.appendChild(play);
}

function unpauseGame() {
    isPaused = false;
    options.removeChild(play);
    options.appendChild(pause);
}

window.addEventListener('keydown', e => {
    if (e.key === ' ') {
        isPaused ? unpauseGame() : pauseGame();
    }
});

window.requestAnimationFrame(update);