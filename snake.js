 //board
 const blockSize = 25;
 const rows = 20;
 const cols = 20;
 let board;
 let context;
 let score= 0;


 //snake head
 let snakeX = blockSize * 5;
 let snakeY = blockSize * 5;

 let velocityX = 0;
 let velocityY = 0;

 let snakeBody = [];

 //snake food
 let foodX;
 let foodY;

 let gameOver = false;

 window.onload = function(){
     board = document.getElementById("board");
     board.height = rows * blockSize;
     board.width = cols * blockSize;
     context = board.getContext("2d"); //used for drawing on the board

     placeFood();
     document.addEventListener("keyup", changeDirection);
     // update();
     setInterval(update, 1000/10); //100 milliseconds
 }


 function update() {
     if (gameOver) {
         return;
     }
     context.fillStyle="#13203C";
     context.fillRect(0, 0, board.width, board.height);

     context.fillStyle="#BD5757";
     context.fillRect(foodX, foodY, blockSize, blockSize);

     if(snakeX == foodX && snakeY == foodY) {
         snakeBody.push([foodX, foodY])
         placeFood();
     }

     for(let i = snakeBody.length - 1; i > 0; i--) {
         snakeBody[i] = snakeBody[i-1];
     }
     if (snakeBody.length) {
         snakeBody[0] = [snakeX, snakeY]
     }

     context.fillStyle="#5D9300";
     snakeX += velocityX * blockSize;
     snakeY += velocityY * blockSize;
     context.fillRect(snakeX, snakeY, blockSize, blockSize);

     for(let i = 0; i < snakeBody.length; i++) {
         context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize)
     }
     
     //game over conditions
     if (snakeX < 0 || snakeX > cols * blockSize || snakeY < 0 || snakeY > rows * blockSize) {
         gameOver = true;
         alert("Game Over!");
     }

     for(let i = 0; i < snakeBody.length; i++) {
         if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
             gameOver = true;
             alert("Game Over!");
         }
     }
     drawScore();
 }

 function changeDirection(e){
     if (e.code == "ArrowUp" && velocityY != 1) {
         velocityX = 0;
         velocityY = -1;
     }
     else if (e.code == "ArrowDown" && velocityY != -1) {
         velocityX = 0;
         velocityY = 1;
     }
     else if (e.code == "ArrowLeft" && velocityX != 1) {
         velocityX = -1;
         velocityY = 0;
     }
     else if (e.code == "ArrowRight" && velocityX != -1 ) {
         velocityX = 1;
         velocityY = 0;
     }
 }

 function placeFood() {
     //0-1) * cols -> (0 - 19.999) -> (0 - 19) * blockSize(25)
     foodX = Math.floor(Math.random() * cols) * blockSize;
     foodY = Math.floor(Math.random() * rows) * blockSize;
     score += 10;
 }

 function drawScore() {
    // Update the score element's innerHTML
    const scoreElement = document.getElementById("score");
    scoreElement.innerHTML = "Score: " + score;
}

