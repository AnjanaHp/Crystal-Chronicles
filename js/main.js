
class Player {
    constructor() {
        this.positionX = 100;
        this.positionY = 10;
        this.width = 30;
        this.height = 25;

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
        this.positionX += 20;
        this.updateUI();

    }
    moveLeft() {
        this.positionX -= 20;
        this.updateUI();
    }
}

// create class for objects
class GameObject {
    constructor(type) {
        this.positionX = Math.floor(Math.random() * (1500 - 0) + 0);
        this.positionY = 600;
        this.width = 30;
        this.height = 25;
        this.type = type;

        this.createDom();
    }

    createDom() {

        //Create crystal Element
        this.gameElm = document.createElement("div");

        // add content
        this.gameElm.className = this.type;
        this.gameElm.style.left = this.positionX + "px";
        this.gameElm.style.bottom = this.positionY + "px";
        this.gameElm.style.width = this.width + "px";
        this.gameElm.style.height = this.height + "px";
        this.gameElm.style.backgroundColor = this.type === "crystal" ? "gold" : "darkred"
        // dynamic image changing based on type (make sure to name images accordingly)
        // this.gameElm.style.backgroundImage = `url(../image/${this.type}.png)` WHEN INCLUDE MORE TYPES


        //append to dom
        const parentElm = document.getElementById("playarea");
        parentElm.appendChild(this.gameElm);
    }

    moveDown() {
        this.positionY--;
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
const stoneArr = [];


// to create crystals and stones
function createObject() {
    const random = Math.round(Math.random() * 2)
    if (random % 2 === 0) {
        const crystal = new GameObject("crystal")
        crystalsArr.push(crystal)
    } else {
        const stone = new GameObject("stone");
        stoneArr.push(stone);
    }
}


setInterval(createObject, 1000);


let point =0;
 //to display score
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
        }else if (point < 0) {
            console.log("game over...");
            location.href = "gameover.html";
        }

    });
}

setInterval(() => {
    handleCollision(crystalsArr, "crystal", 1);
    handleCollision(stoneArr, "stone", -1);

}, 10);




document.addEventListener("keydown", (event) => {
    if (event.code === 'ArrowLeft') {
        collector.moveLeft();
    } else if (event.code === 'ArrowRight') {
        collector.moveRight();
    }

});




