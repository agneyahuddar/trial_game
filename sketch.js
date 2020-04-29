var userPaddle, userPaddleimg, computerPaddle , computerScore, playerScore, gameState, ball, ballImage, scoreSound, wall_hitSound, hitSound, wall;

function preload(){

  userPaddleimg = loadImage("paddle.png");
  ballImage = loadImage("ball.png");
}

function setup() {
  
createCanvas(400,400);

//create a user paddle sprite
userPaddle = createSprite(390,200,10,70);
userPaddle.addImage(userPaddleimg);

//create a computer paddle sprite
computerPaddle = createSprite(10,200,10,70);

//create the pong ball
ball = createSprite(200,200,12,12);
ball.addImage(ballImage);
  
wall = createSprite(10, 200, 10, 400);

computerScore = 0;
playerScore = 0;
gameState = "serve";

}

function draw() {
  //fill the computer screen with white color
  background("white");
  edges = createEdgeSprites();
  //display Scores
  text(computerScore,170,20);
  text(playerScore, 230,20);

  //draw dotted lines
  for (var i = 0; i < 400; i+=20) {
     line(200,i,200,i+10);
  }

  if (gameState === "serve") {
    text("Press Space to Serve",150,180);
  }

  if (gameState === "over") {
    text("Game Over!",170,160);
    text("Press 'R' to Restart",150,180);
  }

  if (keyDown("r")) {
    gameState = "serve";
    computerScore = 0;
    playerScore = 0;
  }


  //give velocity to the ball when the user presses play
  //assign random velocities later for fun
  if (keyDown("space") && gameState == "serve") {
    ball.velocityX = 5;
    ball.velocityY = 5;
    gameState = "play";
  }

  //make the userPaddle move with the mouse
  userPaddle.y = World.mouseY;



  //make the ball bounce off the user paddle
  if(ball.isTouching(userPaddle)){
    ball.x = ball.x - 5;
    ball.velocityX = -ball.velocityX;
  }

  //make the ball bounce off the computer paddle
  if(ball.isTouching(computerPaddle)){
    ball.x = ball.x + 5;
    ball.velocityX = -ball.velocityX;
  }

  //place the ball back in the centre if it crosses the screen
  if(ball.x > 400 || ball.x < 0){

  if (ball.x < 0) {
      playerScore++;
    }
    else {
      computerScore++;
    }

    ball.x = 200;
    ball.y = 200;
    ball.velocityX = 0;
    ball.velocityY = 0;
    gameState = "serve";

    if (computerScore=== 5 || playerScore === 5){
      gameState = "over";
    }
  }

  //make the ball bounce off the top and bottom walls
  if (ball.isTouching(edges[2]) || ball.isTouching(edges[3])) {
    ball.bounceOff(edges[2]);
    ball.bounceOff(edges[3]);
  }

  //add AI to the computer paddle so that it always hits the ball
  computerPaddle.y = ball.y;
  drawSprites();
  computerPaddle.visible = false;
}
