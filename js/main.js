
const playAreaWidth = document.getElementById("playarea").offsetWidth;

// create class for player
class Player {
    constructor() {
        this.width = 120;
        this.height = 55;
        this.positionX = 100;
        this.positionY = 10;


        this.collectorElm = document.getElementById("player");
        this.collectorElm.style.backgroundImage = `url('./images/player1.png')`;


        this.updateUI();
    }

    updateUI() {
        this.collectorElm.style.width = this.width + "px";
        this.collectorElm.style.height = this.height + "px";
        this.collectorElm.style.left = this.positionX + "px";
        this.collectorElm.style.bottom = this.positionY + "px";


    }

    moveRight() {
        if (this.positionX + this.width < playAreaWidth) {
            this.positionX += 20;
        }
        this.updateUI();
    }
    moveLeft() {
        if (this.positionX > 0) {
            this.positionX -= 20;
        }
        this.updateUI();
    }

}

// create class for objects
class GameObject {
    constructor(type) {
        this.width = 71;
        this.height = 52;
        this.positionX = Math.floor(Math.random() * (1300 - 0) + 0);
        this.positionY = 600;
        this.type = type;

        this.createDom();
    }

    createDom() {

        //Create game Element
        this.gameElm = document.createElement("div");

        // add content
        this.gameElm.style.width = this.width + "px";
        this.gameElm.style.height = this.height + "px";
        this.gameElm.style.left = this.positionX + "px";
        this.gameElm.style.bottom = this.positionY + "px";
        this.gameElm.className = this.type;

        // dynamic image changing based on type 
        this.gameElm.style.backgroundImage = `url(./images/${this.type}.png)`;

        //append to dom
        const parentElm = document.getElementById("playarea");
        parentElm.appendChild(this.gameElm);
    }

    moveDown() {
        this.positionY -= 2;
        this.gameElm.style.bottom = this.positionY + "px";
        if (this.positionY <= 0) {
            this.removeGameObj();
        }
    }
    removeGameObj() {
        this.gameElm.remove();
    }
}


const collector = new Player();
const crystalsArr = [];
const yellowstoneArr = [];
const greenstoneArr = [];
const stoneArr = [];


// to create crystals and stones
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
        startGame();
    }
}

let objTimer = setInterval(createObject, 1000);

//to display score
let point = 0;
function updatePoint() {
    document.getElementById("point").innerText = "Score:" + point;
}


// to detect collision
function handleCollision(arr, objType, pointchange) {
    arr.forEach((gemObj, index) => {

        gemObj.moveDown();

        if (
            collector.positionX < gemObj.positionX + gemObj.width &&
            collector.positionX + collector.width > gemObj.positionX &&
            collector.positionY < gemObj.positionY + gemObj.height &&
            collector.positionY + collector.height > gemObj.positionY
        ) {
            point += pointchange;
            updatePoint();

            gemObj.removeGameObj();
            arr.splice(index, 1);
            return;
        }

    });
}

let moveTimer = setInterval(() => {
    handleCollision(crystalsArr, "crystal", 1);
    handleCollision(yellowstoneArr, "Yellowstone", 1);
    handleCollision(greenstoneArr, "Greenstone", 1);
    handleCollision(stoneArr, "stone", -1);

    if (point < 0) {
        endGame(0);
    }

}, 5);




document.addEventListener("keydown", (event) => {
    if (event.code === 'ArrowLeft') {
        collector.moveLeft();
    } else if (event.code === 'ArrowRight') {
        collector.moveRight();
    }
    console.log("player moved")
});



let timer;
let timeRemaining = 30;


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
// to handle endgame call out
let gameEnded = false;
function endGame(timeOut) {
        // Stop any remaining timers or intervals
        timeRemaining = 0;
        updateTimeDisplay();
        clearInterval(objTimer);
if(!gameEnded)
{
    console.log("Game Over...");



    // Create the game over message
    const gameOverElm = document.getElementById("gameover");
    if(timeOut)
    {
        gameOverElm.innerHTML = `
        <h3>Game Over</h3>
        <p>Your final score: <strong>${point}</strong></p>
        <p><a href="./index.html">Click here to try again</a></p>
    `;
    }
    else{
        gameOverElm.innerHTML = `
        <h3>Game Over</h3>
        <p><a href="./index.html">Click here to try again</a></p>
    `;
    }
    
gameOverElm.style.backgroundColor="rgba(154, 205, 240, 0.33)";


    // Append game over screen to the play area
    document.getElementById("playarea").appendChild(gameOverElm);
    gameEnded=true;
}
}

const backgroundMusic = document.getElementById("bg-music");

function startGame(){
    backgroundMusic.play();
}