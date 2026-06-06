let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;
let highScore = 0;

let h2 = document.querySelector("h2");
let highScoreText = document.querySelector("#highScore");

// Start Game
document.addEventListener("keydown", function () {
    if (!started) {
        started = true;
        levelup();
    }
});

// Flash Effects
function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => btn.classList.remove("flash"), 500);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(() => btn.classList.remove("userflash"), 500);
}

// Level Up Logic
function levelup() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];

    gameSeq.push(randColor);

    console.log("Sequence:", gameSeq);

    let i = 0;

    function playSequence() {
        if (i < gameSeq.length) {
            let color = gameSeq[i];
            let btn = document.querySelector(`.${color}`);
            
            gameFlash(btn);
            i++;

            setTimeout(playSequence, 600);
        }
    }

    playSequence();
}


// Check Answer
function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelup, 800);
        }
    } else {
        gameOver();
    }
}

// Button Press
function btnPress() {
    if (!started) return;

    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

// Add Event Listeners
let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

// Game Over
function gameOver() {
    document.body.classList.add("game-over");

    setTimeout(() => {
        document.body.classList.remove("game-over");
    }, 200);

    // High Score Update
    if (level > highScore) {
        highScore = level;
        highScoreText.innerText = `🏆 High Score: ${highScore}`;
    }

    h2.innerHTML = `❌ Game Over! Your Score: <b>${level}</b><br>Press any key to restart`;

    reset();
}

// Reset Game
function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}