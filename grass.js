var LivingCreature = require("./livingcreature")
module.exports = class Grass extends LivingCreature  {
    random(ch){
        let found = this.chooseCell(ch);
        let result = Math.floor(Math.random()*found.length)
        return found[result];
    }
    mul() {
        let newCell = this.random(0)
        if (this.multiplay >= 3 && newCell) {
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = 1;
            grassArr.push(new Grass(newX, newY, 1));
            this.multiplay = 0;
        }
        this.multiplay++
    }
}