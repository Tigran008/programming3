const matrix = [];
const grassEaterArr = [];
const grassArr = [];
const lifeGenerator = [];
const predator = [];
const bomb = [];

const side = 30

function generator(matrixSize, grassCount, grassEaterCount, lifeGenerator, predator, bomb) {

    for (let i = 0; i < matrixSize; i++) {
        matrix.push([]);
        for (let j = 0; j < matrixSize; j++) {
            matrix[i].push(0);

        }
    }

    for (let i = 0; i < grassCount; i++) {
        const x = Math.round(Math.random() * (matrixSize - 1));
        const y = Math.round(Math.random() * (matrixSize - 1));
        matrix[y][x] = 1;
    }
    for (let i = 0; i < grassEaterCount; i++) {
        const x = Math.round(Math.random() * (matrixSize - 1));
        const y = Math.round(Math.random() * (matrixSize - 1));
        matrix[y][x] = 2;
    }
    for (let i = 0; i < lifeGenerator; i++) {
        const x = Math.round(Math.random() * (matrixSize - 1));
        const y = Math.round(Math.random() * (matrixSize - 1));
        matrix[y][x] = 3;
    }
    for (let i = 0; i < predator; i++) {
        const x = Math.round(Math.random() * (matrixSize - 1));
        const y = Math.round(Math.random() * (matrixSize - 1));
        matrix[y][x] = 4;
    }
    for (let i = 0; i < bomb; i++) {
        const x = Math.round(Math.random() * (matrixSize - 1));
        const y = Math.round(Math.random() * (matrixSize - 1));
        matrix[y][x] = 5;
    }

}







function setup() {
    generator(20, 500, 20 , 2, 10, 5);
    createCanvas(side * matrix.length, side * matrix[0].length);
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                grassArr.push(new Grass(x,y))
            } else if (matrix[y][x] == 2) {
                grassEaterArr.push(new GrassEater(x,y))
            } else if (matrix[y][x] == 3) {
                lifeGenerator.push(new LifeGenerator(x,y))
            } else if (matrix[y][x] == 4) {
                predator.push(new Predator(x,y))
            } else if (matrix[y][x] == 5) {
                bomb.push(new Bomb(x,y))
            }
        }
    }
}


function draw() {
    frameRate(5)

    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill('green');
            } else if (matrix[y][x] == 3) {
                if (grassEaterArr.length < 7 || predator.length < 7) {
                    fill("DarkSlateBlue")
                } else {
                    fill('white')
                }
            } else if (matrix[y][x] == 2) {
                fill("yellow");
            } else if (matrix[y][x] == 0) {
                fill('gray')
            } else if (matrix[y][x] == 4) {
                fill("OrangeRed")
            } else if (matrix[y][x] == 5) {
                fill("black")
            }

            rect(x * side, y * side, side, side);

        }
    }


    for (var key in grassArr) {
        grassArr[key].mul();

    }


    for (const key in grassEaterArr) {
        grassEaterArr[key].eat()
    }

    for (const key in predator) {
        predator[key].eat()
    }

    for (const key in lifeGenerator) {
        lifeGenerator[key].move()
    }

    for (const key in bomb) {
        bomb[key].move()
    }


}