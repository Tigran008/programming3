class Grass extends LivingCreature  {

    mul() {
        let newCell = random(this.chooseCell(0))
        if (this.multiplay >= 5 && newCell) {
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = 1;
            grassArr.push(new Grass(newX, newY, 1));
            this.multiplay = 0;
        }
        this.multiplay++
    }
}