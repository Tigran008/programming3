var LivingCreature = require("./livingcreature")
module.exports = class Predator extends LivingCreature{
    constructor(x, y, index) {
        super(x, y, index)
        this.energy = 8;
        this.directions = []

    }

    getNewCoordinates(){
        return super.getNewCoordinates()
    }

    chooseCell(character) {
        this.getNewCoordinates()
        return super.chooseCell(character)

    }
    random(ch){
        let found = this.chooseCell(ch);
        let result = Math.floor(Math.random()*found.length)
        return found[result];
    }
    move() {
        // var emptyCells = this.chooseCell(0);
        var newCell = this.random(0);

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX] = 4
            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;
        }

        this.energy--;
        if (this.energy <= 0) {
            this.die();
        }
    }




    mul() {
        // var emptyCells = this.chooseCell(0);
        var newCell = this.random(0);

        if (newCell && this.energy >= 12) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 4
            predator.push(new Predator(newX, newY, 1));
            this.energy = 8;
        }
    }

    die() {
        for (const i in predator) {
            if (this.x == predator[i].x && this.y == predator[i].y) {
                predator.splice(i, 1)
                break

            }
        }
        matrix[this.y][this.x] = 0
    }


    eat() {
        // var grassCells = this.chooseCell(2);
        var newCell = this.random(2);

        if (newCell) {

            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX] = 4;
            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;
            this.energy += 5;

            for (const i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1)
                    break

                }

            }

            if (this.energy >= 12) {
                // console.log(this.energy);
                this.mul();
            }
        }
        else {
            this.move();
        }
    }


}