// const matrix = [];
// const grassEaterArr = [];
// const grassArr = [];
// const lifeGenerator = [];
// const predator = [];
// const bomb = [];
let socket = io()
const side = 50


let summerBool = true;
let winterBool = false;
let autumnBool = false;
let springBool = false;
 



function summer() {
     summerBool = true;
     winterBool = false;
     autumnBool = false;
     springBool = false;
     
}

function autumn() {
    summerBool = false;
    winterBool = false;
    autumnBool = true;
    springBool = false;
    
}

function winter() {
    summerBool = false;
    winterBool = true;
    autumnBool = false;
    springBool = false;
    
}


function spring() {
    summerBool = false;
    winterBool = false;
    autumnBool = false;
    springBool = true;
    
}





// function generator(matrixSize, grassCount, grassEaterCount, lifeGenerator, predator, bomb) {

//     for (let i = 0; i < matrixSize; i++) {
//         matrix.push([]);
//         for (let j = 0; j < matrixSize; j++) {
//             matrix[i].push(0);

//         }
//     }

//     for (let i = 0; i < grassCount; i++) {
//         const x = Math.round(Math.random() * (matrixSize - 1));
//         const y = Math.round(Math.random() * (matrixSize - 1));
//         matrix[y][x] = 1;
//     }
//     for (let i = 0; i < grassEaterCount; i++) {
//         const x = Math.round(Math.random() * (matrixSize - 1));
//         const y = Math.round(Math.random() * (matrixSize - 1));
//         matrix[y][x] = 2;
//     }
//     for (let i = 0; i < lifeGenerator; i++) {
//         const x = Math.round(Math.random() * (matrixSize - 1));
//         const y = Math.round(Math.random() * (matrixSize - 1));
//         matrix[y][x] = 3;
//     }
//     for (let i = 0; i < predator; i++) {
//         const x = Math.round(Math.random() * (matrixSize - 1));
//         const y = Math.round(Math.random() * (matrixSize - 1));
//         matrix[y][x] = 4;
//     }
//     for (let i = 0; i < bomb; i++) {
//         const x = Math.round(Math.random() * (matrixSize - 1));
//         const y = Math.round(Math.random() * (matrixSize - 1));
//         matrix[y][x] = 5;
//     }

// }







function setup() {
    // generator(20, 500, 20 , 2, 10, 5);
    // createCanvas(side * matrix.length, side * matrix[0].length);
    createCanvas(1000,1000)
    // for (let y = 0; y < matrix.length; y++) {
    //     for (let x = 0; x < matrix[y].length; x++) {
    //         if (matrix[y][x] == 1) {
    //             grassArr.push(new Grass(x,y))
    //         } else if (matrix[y][x] == 2) {
    //             grassEaterArr.push(new GrassEater(x,y))
    //         } else if (matrix[y][x] == 3) {
    //             lifeGenerator.push(new LifeGenerator(x,y))
    //         } else if (matrix[y][x] == 4) {
    //             predator.push(new Predator(x,y))
    //         } else if (matrix[y][x] == 5) {
    //             bomb.push(new Bomb(x,y))
    //         }
    //     }
    // }
}




function update(data) {

    // console.log(data.matrix.length)
    frameRate(2)

    for (let y = 0; y < data.matrix.length; y++) {
        for (let x = 0; x < data.matrix[y].length; x++) {

            if (data.matrix[y][x] == 1) {
                if (summerBool) {
                    fill("green")
                } else if (autumnBool){
                    fill("orange")
                } else if(winterBool){
                    fill("white")
                } else if(springBool){
                    fill("lightgreen")
                } 
                
            } else if (data.matrix[y][x] == 3) {
                if (data.grassEaterArr.length < 7 || data.predator.length < 7 || data.alleater.length < 7) {
                    fill("DarkSlateBlue")
                } else {
                    fill('white')
                }
            } else if (data.matrix[y][x] == 2  ) {
                if (summerBool) {
                    fill("yellow")
                } else if (autumnBool){
                    fill("red")
                } else if(winterBool){
                    fill("orange")
                } else if(springBool){
                    fill('#fae')
                } else {
                    fill("gray")
                }
            } else if (data.matrix[y][x] == 0) {
                fill('gray')
            } else if (data.matrix[y][x] == 4) {
                if (summerBool) {
                    fill("orangered")
                } else if (autumnBool){
                    fill(255, 204, 100)
                } else if(winterBool){
                    fill("#fae")
                } else if(springBool){
                    fill('orange')
                } else {
                    fill("gray")
                }
            } else if (data.matrix[y][x] == 5) {
               
                    fill("black")
                
            } else if (data.matrix[y][x] == 6) {
                if (summerBool) {
                    fill("blue")
                } else if (autumnBool){
                    fill(255, 0, 102)
                } else if(winterBool){
                    fill(0, 255, 238)
                } else if(springBool){
                    fill(67, 53, 87)
                } else {
                    fill("gray")
                }
            }

            rect(x * side, y * side, side, side);

           

        }
    }

    


    // for (var key in grassArr) {
    //     grassArr[key].mul();

    // }


    // for (const key in grassEaterArr) {
    //     grassEaterArr[key].eat()
    // }

    // for (const key in predator) {
    //     predator[key].eat()
    // }

    // for (const key in lifeGenerator) {
    //     lifeGenerator[key].move()
    // }

    // for (const key in bomb) {
    //     bomb[key].move()
    // }


}
socket.on('send matrix', update);
 socket.on('send matrix', update);





// socket.on('send grasseater', update);