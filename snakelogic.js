const canvas = document.querySelector('.myCanvas');
const width = canvas.width = 608;
const height = canvas.height =  608;
const ctx = canvas.getContext('2d');

const box = 32;

const backGround = new Image();
backGround.src = "image/ground.png";

const snakeFood = new Image();
snakeFood.src = "image/food.png";

// reference to audio's
const moveUp = new Audio();
const moveDown = new Audio();
const moveLeft = new Audio();
const moveRight = new Audio();
const eatFood = new Audio();
const die = new Audio();

moveUp.src = "audio/up.mp3";
moveDown.src = "audio/down.mp3";
moveLeft.src = "audio/left.mp3";
moveRight.src = "audio/right.mp3";
eatFood.src = "audio/eat.mp3";
die.src = "audio/dead.mp3";

let snake = [];
snake[0] = {
    x:9 * box,
    y:10 * box
}

let food = {
    x:Math.floor(Math.random()*17 + 1)*box,
    y:Math.floor(Math.random()*14 + 4)*box
}

let direction;

// controlling snake
document.addEventListener('keydown',(event) =>{
    if (event.keyCode == "37" && direction!="RIGHT"){
        direction = "LEFT";
        moveLeft.play();
    }else if (event.keyCode == "38" && direction!="DOWN"){
        direction = "UP";
        moveUp.play();
    }else if (event.keyCode == "39" && direction!="LEFT"){
        direction = "RIGHT";
        moveRight.play();
    }else if (event.keyCode == "40" && direction!="UP"){
        direction = "DOWN";
        moveDown.play();
    }
});

function collision(snakeHead,snakesBody){
    for(let i=0;i<snakesBody.length; i++){
        if(snakeHead.x == snakesBody[i].x && snakeHead.y == snakesBody[i].y){
            return true;
        }
    }
    return false;
}

let score = 0;

function draw(){
    ctx.drawImage(backGround,0,0);

    for (let i=0; i<snake.length; i++){
        ctx.fillStyle = (i == 0)? "yellow":"white";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);

        ctx.strokeStyle = "black";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }
    ctx.drawImage(snakeFood,food.x,food.y);

    let snakeHeadX = snake[0].x;
    let snakeHeadY = snake[0].y;

    if(direction == "LEFT") snakeHeadX -= box;
    if(direction == "UP") snakeHeadY -=box;
    if(direction == "RIGHT") snakeHeadX += box;
    if(direction == "DOWN") snakeHeadY += box;

    let head ={
        x:snakeHeadX,
        y:snakeHeadY
    };

    if(snakeHeadX == food.x && snakeHeadY == food.y){
        score +=1;
        eatFood.play();
        food = {
            x:Math.floor(Math.random()*17 + 1)*box,
            y:Math.floor(Math.random()*14 + 4)*box
        }
    }else{
            snake.pop();
        }

    if(snakeHeadX < box || snakeHeadX > 17*box || snakeHeadY < 3*box || snakeHeadY > 17*box || collision(head,snake)){
        clearInterval(onGame);
        die.play();
    }

    snake.unshift(head);

    ctx.fillStyle = "white";
    ctx.font = "35px Impact";
    ctx.fillText(score,2*box,1.6*box);
}

let onGame = setInterval(draw,100);

