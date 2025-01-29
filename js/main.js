
const playAreaWidth = document.getElementById("playarea").offsetWidth;

// create class for player
class Player {
    constructor() {
        this.width = 120;
        this.height = 55;
        this.positionX = 100;
        this.positionY = 10;


        this.collectorElm = document.getElementById("player");

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
        this.gameElm.style.backgroundImage = `url(../images/${this.type}.png)`;

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
    }
}


setInterval(createObject, 1000);

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

setInterval(() => {
    handleCollision(crystalsArr, "crystal", 1);
    handleCollision(yellowstoneArr, "Yellowstone", 1);
    handleCollision(greenstoneArr, "Greenstone", 1);
    handleCollision(stoneArr, "stone", -1);

    if (point < 0) {
        endGame();
    }

}, 10);




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
            endGame();
        }
    }, 1000);
}

function endGame() {
    console.log("you scored" + point);
    displayScore();

    setTimeout(() => {

        location.href = "gameover.html";

    }, 500);

}

function displayScore() {
    const gameoverElm = document.getElementById("gameover");
    if (gameoverElm) {
        if (point !== 0) {
            console.log(point);
            gameoverElm.innerText = "Your score: " + point;
        } else {
            gameoverElm.innerText = "Better Luck Next Time!";
        }
    }
}


startTimer();


