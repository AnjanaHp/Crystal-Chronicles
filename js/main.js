
class Player {
    constructor() {
        this.positionX = 100;
        this.positionY = 10;
        this.width = 50;
        this.height = 50;

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
        console.log("position changed to left")
    }
}

// create class for crystals
class Crystal {
    constructor() {
        this.positionX = 500;
        this.positionY = 500;
        this.width = 20;
        this.height = 20;

        this.createDom();
    }

    createDom() {

        //Create crystal Element
        this.crystalElm = document.createElement("div");

        // add content
        this.crystalElm.className = "crystal";
        this.crystalElm.style.left = this.positionX + "px";
        this.crystalElm.style.bottom = this.positionY + "px";
        this.crystalElm.style.width = this.width + "px";
        this.crystalElm.style.height = this.height + "px";

        //append to dom
        const parentElm = document.getElementById("playarea");
        parentElm.appendChild(this.crystalElm);
    }

    moveDown() {
        this.positionY--;
        console.log("position changed");
        this.crystalElm.style.bottom = this.positionY + "px";
    }
}




const collector = new Player();
const crystalsArr = [];

setInterval(() => {
    const crystalIs = new Crystal();
    crystalsArr.push(crystalIs);
    console.log("moving down")
}, 5000);

setInterval(() => {
    crystalsArr.forEach((gemObj,index,arr) => {
        gemObj.moveDown();
    });
},50)


document.addEventListener("keydown", (event) => {
    if (event.code === 'ArrowLeft') {
        collector.moveLeft();
    } else if (event.code === 'ArrowRight') {
        collector.moveRight();
    }

});




