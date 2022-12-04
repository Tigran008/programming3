var LivingCreature = require("./livingcreature")
var GrassEater = require("./grasseater")
var Predator = require("./predator")
var Alleater = require("./alleater")


module.exports = class LifeGenerator extends LivingCreature{
    constructor(x, y, index) {
        super(x, y, index)
        this.directions = []


    }

    getNewCoordinates(){
        super.getNewCoordinates()
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

            matrix[newY][newX] = 3
            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;
        }


        this.mulEater()
        this.mulPredator()
        this.mulAlleater( )


    }
    mulEater() { 
        
        if (grassEaterArr.length == 0) {
            const x = Math.round(Math.random() * 19);
            const y = Math.round(Math.random() * 19);
            if (matrix[y][x] == 0 || matrix[y][x] == 1) {
                grassEaterArr.push(new GrassEater(x, y, 2))
                matrix[y][x] = 2
                console.log(grassEaterArr);
                
            }
        }
    
    }
    mulPredator() {
        if (predator.length == 0) {
            const x = Math.round(Math.random() * 19);
            const y = Math.round(Math.random() * 19);
            if (matrix[y][x] == 0 || matrix[y][x] == 1) {
                predator.push(new Predator(x, y, 4))
                matrix[y][x] = 4
            }
        }
    }

    mulAlleater() {
        if (alleater.length == 0) {
            const x = Math.round(Math.random() * 19);
            const y = Math.round(Math.random() * 19);
            if (matrix[y][x] == 0) {
                alleater.push(new Alleater(x, y, 6))
                matrix[y][x] = 6
            }
        }
    }

    



}