class Bomb extends LivingCreature{
    constructor(x, y, index) {
        super(x,y, index)
        this.directions = []
        this.energy = 0
       

    }
    
    getNewCoordinates(){
        return super.getNewCoordinates()
    }

    chooseCell(character) {
        this.getNewCoordinates()
        return super.chooseCell(character)

    }
    move() {
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX] = 5
            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;
        }

        this.energy++

        if (this.energy >= 8) {
            this.explode()
            this.energy = 0
        }



    }
    explode() {
        this.getNewCoordinates()
        for (const i in this.directions) {
            var newX = this.directions[i][0];
            var newY = this.directions[i][1];

            if (newX >= 0 && newX < matrix[0].length && newY >= 0 && newY < matrix.length) {
                var current = matrix[newY][newX]

                if (current == 1) {
                    for (const i in grassArr) {
                        if (this.x == grassArr[i].x && this.y == grassArr[i].y) {
                            grassArr.splice(i, 1)
                            break
                        }
                    }
                } else if (current == 2) {
                    for (const i in grassEaterArr) {
                        if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                            grassEaterArr.splice(i, 1)
                            break
                        }
                    }
                } else if (current == 4) {
                    for (const i in predator) {
                        if (this.x == predator[i].x && this.y == predator[i].y) {
                            predator.splice(i, 1)
                            break

                        }
                    }
                }

                matrix[newY][newX] = 0;

            }







        }

    }


}