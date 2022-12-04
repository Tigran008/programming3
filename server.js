var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);



app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});

server.listen(3000);

matrix = [];
grassEaterArr = [];
grassArr = [];
lifeGenerator = [];
predator = [];
bomb = [];
alleater = [];

var Grass = require("./grass")
var GrassEater = require("./grasseater")
var LifeGenerator = require("./lifegenerator")
var Predator = require("./predator")
var Bomb = require("./bomb")
var Alleater = require("./alleater")




function generator(matrixSize, grassCount, grassEaterCount, lifeGenerator, predator, bomb, alleater) {

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
    for (let i = 0; i < alleater; i++) {
        const x = Math.round(Math.random() * (matrixSize - 1));
        const y = Math.round(Math.random() * (matrixSize - 1));
        matrix[y][x] = 6;
    }
    const data ={
        matrix: matrix,
        grassEaterArr:grassEaterArr,
        predator:predator,
        alleater:alleater,
        grassArr:grassArr
    }
    io.sockets.emit("send matrix", data);
    io.sockets.emit("send main matrix", data.matrix);
}
generator(20, 500, 20 , 2, 5, 3, 1)
function createObj() {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                grassArr.push(new Grass(x, y))
            } else if (matrix[y][x] == 2) {
                grassEaterArr.push(new GrassEater(x, y))
            } else if (matrix[y][x] == 3) {
                lifeGenerator.push(new LifeGenerator(x, y))
            } else if (matrix[y][x] == 4) {
                predator.push(new Predator(x, y))
            } else if (matrix[y][x] == 5) {
                bomb.push(new Bomb(x, y))
            } else if (matrix[y][x] == 6) {
                alleater.push(new Alleater(x, y))
            }
        }
    }
    const data ={
        matrix: matrix,
        grassEaterArr:grassEaterArr,
        predator:predator,
        alleater:alleater,
        grassArr:grassArr

    }
    io.sockets.emit("send matrix", data);
    io.sockets.emit("send main matrix", data.matrix);


}


function game() {

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
    for (const key in alleater) {
        alleater[key].eat()
    }
    const data = {
        matrix: matrix,
        grassEaterArr:grassEaterArr,
        predator:predator,
        alleater:alleater,
        grassArr:grassArr

    }
    io.sockets.emit("send matrix", data);
    io.sockets.emit("send main matrix", data.matrix);



}
setInterval(game,100 )


io.on('connection', function (socket) {
  createObj()
 });
 