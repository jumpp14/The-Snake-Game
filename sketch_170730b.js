var ourSnake;
var scl = 20;
var food;
var isKeyValid;
var canvasContext;

function setup() {
  createCanvas(600, 600);
  ourSnake = new Snake();
  ourSnake.tail.push(createVector(ourSnake.x, ourSnake.y));
  frameRate(10);
  pickLocation();
  canvasContext = canvas.getContext("2d");
  isKeyValid = true;
}

function pickLocation(){
  ourSnake.foodRed = Math.floor(Math.random() * 235) + 20;
  ourSnake.foodGreen = Math.floor(Math.random() * 235) + 20;
  ourSnake.foodBlue = Math.floor(Math.random() * 235) + 20;
  var columns = floor(600/scl);
  var rows = floor(600/scl);
  food = createVector(floor(random(columns)),floor(random(rows))); 
  food.mult(scl);
}

function draw() {  
  background(51);
  fill(ourSnake.foodRed, ourSnake.foodGreen, ourSnake.foodBlue);
  rect(food.x,food.y, scl, scl);
  if(!ourSnake.paused){
    if(ourSnake.eat(food)){
      pickLocation();
      fill(ourSnake.foodRed, ourSnake.foodGreen, ourSnake.foodBlue);
      rect(food.x,food.y, scl, scl);
    }
  }
  
  ourSnake.isEnd();
  if(!ourSnake.dead) {
    if(ourSnake.paused) {
      canvasContext.font = "50px 'Bowlby One SC'";
      canvasContext.fillStyle = '#cce6ff';
      canvasContext.fillText("Pause", 200, 300);
      ourSnake.show();
    } 
    else {
    ourSnake.update();
    ourSnake.show();
    }
  } 
  else {   
    canvasContext.font = "60px 'Sedgwick Ave Display'";
    fill('#ff3385')
    canvasContext.fillText("Game Over", 180, 250);
    canvasContext.font = "50px 'Julee'";
    canvasContext.fillStyle = '#ffcc99';
    canvasContext.fillText("Start Over?", 200, 310);
    fill('#0073e6');
    ellipse(300, 380, 120, 120);
    fill('#ffe6f0');
    ellipse(300, 380, 100, 100);
    canvasContext.font = "30px 'Julee'";
    fill('#3973ac');
    canvasContext.fillText("Yes!", 280, 370);
    canvasContext.font = "20px 'Julee'";
    canvasContext.fillText("or Press 'y'", 260, 400);
    ourSnake.show();
  }

  if(isKeyValid === false){
    isKeyValid = true;
  }  
}

function keyPressed() {
  if (isKeyValid === true && ourSnake.paused === false && keyCode === UP_ARROW && ourSnake.yspeed !== 1 && ourSnake.yspeed !== -1) {
    ourSnake.dir(0, -1);
    isKeyValid = false;
  } else if (isKeyValid === true && ourSnake.paused === false && keyCode === DOWN_ARROW && ourSnake.yspeed !== 1 && ourSnake.yspeed !== -1) {
    ourSnake.dir(0, 1);
    isKeyValid = false;
  } else if (isKeyValid === true && ourSnake.paused === false && keyCode === RIGHT_ARROW && ourSnake.xspeed !== 1 && ourSnake.xspeed !== -1) {
    ourSnake.dir(1, 0);
    isKeyValid = false;
  } else if (isKeyValid === true && ourSnake.paused === false && keyCode === LEFT_ARROW && ourSnake.xspeed !== 1 && ourSnake.xspeed !== -1) {
    ourSnake.dir(-1, 0);
    isKeyValid = false;
  } 
}

function keyTyped() {
  if (key === 'p'){
    ourSnake.togglePause();
  }
  if (key === 'y'){
    ourSnake.startOver();    
  }
}

function mousePressed(){
  var d = dist(mouseX, mouseY, 300, 380);
  if (d <= 120) {
    ourSnake.startOver();
  }
}