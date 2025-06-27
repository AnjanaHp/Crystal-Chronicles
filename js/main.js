import * as Constants from './constants.js';

const playAreaWidth = document.getElementById("playarea").offsetWidth;

// Player
class Player {
    constructor() {
        this.width = Constants.PLAYER_WIDTH;
        this.height = Constants.PLAYER_HEIGHT;
        this.positionX = Constants.PLAYER_START_X;
        this.positionY = Constants.PLAYER_START_Y;

        this.collectorElm = document.getElementById("player");
        this.collectorElm.style.backgroundImage = `url('${Constants.IMAGE_PATH}player1.png')`;

        this.updateUI();
    }

    updateUI() {
        Object.assign(this.collectorElm.style, {
        width : this.width + "px",
        height : this.height + "px",
        left : this.positionX + "px",
        bottom : this.positionY + "px",
    });
}

    moveRight() {
        if (this.positionX + this.width < playAreaWidth) {
            this.positionX += Constants.MOVE_STEP;
        }
        this.updateUI();
    }

    moveLeft() {
        if (this.positionX > 0) {
            this.positionX -= Constants.MOVE_STEP;
        }
        this.updateUI();
    }
}

// Game Objects
class GameObject {
    constructor(type) {
        this.width = Constants.OBJECT_WIDTH;
        this.height = Constants.OBJECT_HEIGHT;
        this.positionX = Math.floor(Math.random() * (1200 - 0) + 0);
        this.positionY = 600;
        this.type = type;

        this.createDom();
    }

    createDom() {

        //Create game Element
        this.gameElm = document.createElement("div");

        // Add content
        Object.assign(this.gameElm.style, {
        width : this.width + "px",
        height : this.height + "px",
        left : this.positionX + "px",
        bottom : this.positionY + "px",
        // Dynamic image changing based on type 
        backgroundImage: `url(${Constants.IMAGE_PATH}${this.type}.png)`
        });

        
     //Append to dom
       this.gameElm.className = this.type;
        document.getElementById(Constants.PLAY_AREA_ID).appendChild(this.gameElm);
    }

    moveDown() {
        this.positionY -= Constants.FALL_SPEED;
        this.gameElm.style.bottom = this.positionY + "px";
        if (this.positionY <= 0) this.removeGameObj();
       }

    // Remove game object from the DOM
    removeGameObj() {
        this.gameElm.remove();
    }
}
// Constants

const collector = new Player();
const crystalsArr = [];
const yellowstoneArr = [];
const greenstoneArr = [];
const stoneArr = [];

// Create crystals and stones
let ObjectCreated = false;

function createObject() {
    const random = Math.round(Math.random() * 6);
    let newObj
    if (random % 2 === 0) {
        if (random === 2) {
            newObj = new GameObject("crystal");
            crystalsArr.push(newObj);
        } else if (random === 4) {
            newObj = new GameObject("Yellowstone");
            yellowstoneArr.push(newObj);
        } else if (random === 6) {
            newObj = new GameObject("Greenstone");
            greenstoneArr.push(newObj);
        }
    } else {
        newObj = new GameObject("stone");
        stoneArr.push(newObj);
    }
    if (!ObjectCreated) {
        ObjectCreated = true;
        startTimer();
        updatePoint();
    }
}

let objTimer = setInterval(createObject, Constants.SPAWN_INTERVAL);

//Display score
let point = 0;

function updatePoint() {
    document.getElementById(Constants.SCORE_ID).innerText = "Score:" + point;
}
// Play sound on point gain or loss
const pointgain = document.getElementById("pointgained");
const pointlost = document.getElementById("pointlost");

// Collision Detection 
function handleCollision(arr, pointchange) {
    arr.forEach((gemObj, index) => {

        gemObj.moveDown();

        if (
            collector.positionX < gemObj.positionX + gemObj.width &&
            collector.positionX + collector.width > gemObj.positionX &&
            collector.positionY < gemObj.positionY + gemObj.height &&
            collector.positionY + collector.height > gemObj.positionY
        ) {
            if (gameEnded === false) {

                if ((pointchange === 2) || (pointchange === 1)) {
                    pointgain.play();
                    pointgain.volume = 0.6;
                } else if (pointchange === -1) {
                    pointlost.play();
                    pointlost.volume = 0.5;
                }
                point += pointchange;
                updatePoint();
            }
            gemObj.removeGameObj();
            arr.splice(index, 1);
            return;
        }
    });
}

setInterval(() => {
    handleCollision(crystalsArr, 2);
    handleCollision(yellowstoneArr,  1);
    handleCollision(greenstoneArr,  1);
    handleCollision(stoneArr,  -1);

    if (point < 0) {
        endGame(0);
    }
}, Constants.COLLISION_CHECK_INTERVAL);

document.addEventListener("keydown", (event) => {
    if (event.code === 'ArrowLeft') {
        collector.moveLeft();
    } else if (event.code === 'ArrowRight') {
        collector.moveRight();
    }
});

// Timer
let timer;
let timeRemaining = Constants.GAME_DURATION; // 60 seconds

function updateTimeDisplay() {
    document.getElementById("time").innerText = "Time:" + timeRemaining + 's';
}

function startTimer() {

    clearInterval(timer);
    updateTimeDisplay();

    timer = setInterval(function () {
        timeRemaining--;
        updateTimeDisplay();

        if (timeRemaining <= 0) {
            clearInterval(timer);
            endGame(1);
        }
    }, 1000);
}

// Handle endgame call out
let gameEnded = false;

function endGame(timeOut) {
    
    // Stop any remaining timers 
    
    clearInterval(objTimer);

    if (!gameEnded) {
        document.getElementById(Constants.SCORE_ID).remove();
        document.getElementById(Constants.TIME_ID).remove();
        document.getElementById(Constants.PLAYER_ID).remove();

        // create the game over message
        const gameOverElm = document.getElementById(Constants.GAME_OVER_ID) || document.createElement("div");
       
            gameOverElm.innerHTML = timeOut ?`
        <h3>Time Up! <br> Game Over </h3>
        <p>Your final score: <strong>${point}</strong></p>
        <p><a href="./index.html">Click here to try again</a></p>` 
        :`<h3>Game Over</h3>
        <p><a href="./index.html">Click here to try again</a></p>`;
        gameOverElm.id = Constants.GAME_OVER_ID;
        gameOverElm.style.backgroundColor = "rgba(154, 205, 240, 0.33)";
        // append game over screen to the play area
        document.getElementById("playarea").appendChild(gameOverElm);
        gameEnded = true;
    }
}




