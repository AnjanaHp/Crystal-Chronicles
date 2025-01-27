
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
        console.log("position changed to left")
    }
}

// create class for crystals
class Crystal {
    constructor() {
        this.positionX = Math.floor(Math.random() * (1500 - 0) + 0);
        this.positionY = 730;
        this.width = 30;
        this.height = 25;

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
    removeCrystal(){
        this.crystalElm.remove();
    }
}





const collector = new Player();
const crystalsArr = [];
let point =0;

function updatePoint(){
    document.getElementById("point").innerText= "Score:" +point;
}

setInterval(() => {
    const crystalIs = new Crystal();
    crystalsArr.push(crystalIs);
    console.log("moving down")
}, 3000);

setInterval(() => {
    crystalsArr.forEach((gemObj,index,arr) => {
        
        gemObj.moveDown();
  //assuming gems are in rectangle shape
        if (
            collector.positionX < gemObj.positionX + gemObj.width &&
            collector.positionX + collector.width > gemObj.positionX &&
            collector.positionY < gemObj.positionY + gemObj.height &&
            collector.positionY + collector.height > gemObj.positionY
        ) { 
            console.log(point);
            point++;
            console.log(point);
            updatePoint();
            console.log(point);
            console.log("Points gained is" + point);
            gemObj.removeCrystal();
            crystalsArr.splice(index,1);
        }

    });
},10)


document.addEventListener("keydown", (event) => {
    if (event.code === 'ArrowLeft') {
        collector.moveLeft();
    } else if (event.code === 'ArrowRight') {
        collector.moveRight();
    }

});




