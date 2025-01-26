
class Player {
    constructor() {
        this.positionX = 100;
        this.positionY = 50;
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
        this.positionX++;
        this.updateUI();

    }
    moveLeft() {
        this.positionX--;
        this.updateUI();
    }
}

const collector = new Player();





document.addEventListener("keydown", (event) => {
    if (event.code === 'ArrowLeft') {
        collector.moveLeft();
    } else if (event.code === 'ArrowRight') {
        collector.moveRight();
    }

});




