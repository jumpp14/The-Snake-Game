var s;
var scl = 20;

var food;

var keyValid;


var ctx;



function setup() {
  createCanvas(600, 600);
  s = new Snake();
  s.tail.push(createVector(s.x, s.y));
  frameRate(10);
  pickLocation();
  ctx = canvas.getContext("2d");
  keyValid = true;
 
  
}

function pickLocation(){
  s.foodRed = Math.floor(Math.random() * 235) + 20;
  s.foodGreen = Math.floor(Math.random() * 235) + 20;
  s.foodBlue = Math.floor(Math.random() * 235) + 20;
  var cols = floor(600/scl);
  var rows = floor(600/scl);
  food = createVector(floor(random(cols)),floor(random(rows))); 
  food.mult(scl);
}


function draw() {
  
  background(51);
  
  fill(s.foodRed, s.foodGreen, s.foodBlue);
  rect(food.x,food.y, scl, scl);
  
  if(!s.paused){
    
    if(s.eat(food)){
      pickLocation();
      fill(s.foodRed, s.foodGreen, s.foodBlue);
      rect(food.x,food.y, scl, scl);
    }
  }
  
  s.ifEnd();
  
  if(!s.dead) {
    if(s.paused) {
      
      ctx.font = "50px 'Bowlby One SC'";
      ctx.fillStyle = '#cce6ff';
      ctx.fillText("Pause", 200, 300);
      s.show();
      
    } else {
    s.update();
    s.show();
  }
  } else {
      
    ctx.font = "60px 'Sedgwick Ave Display'";
    fill('#ff3385')
    ctx.fillText("Game Over", 180, 250);
    ctx.font = "50px 'Julee'";
    ctx.fillStyle = '#ffcc99';
    ctx.fillText("Start Over?", 200, 310);
    fill('#0073e6');
    ellipse(300, 380, 120, 120);
    fill('#ffe6f0');
    ellipse(300, 380, 100, 100);
    ctx.font = "30px 'Julee'";
    fill('#3973ac');
    ctx.fillText("Yes!", 280, 370);
    ctx.font = "20px 'Julee'";
    ctx.fillText("or Press 'y'", 260, 400);
    s.show();
    
    }
    
    
  if(keyValid === false){
    keyValid = true;
  }
    
}



function keyPressed() {
  if (keyValid === true && s.paused === false && keyCode === UP_ARROW && s.yspeed !== 1 && s.yspeed !== -1) {
    s.dir(0, -1);
    keyValid = false;
  } else if (keyValid === true && s.paused === false && keyCode === DOWN_ARROW && s.yspeed !== 1 && s.yspeed !== -1) {
    s.dir(0, 1);
    keyValid = false;
  } else if (keyValid === true && s.paused === false && keyCode === RIGHT_ARROW && s.xspeed !== 1 && s.xspeed !== -1) {
    s.dir(1, 0);
    keyValid = false;
  } else if (keyValid === true && s.paused === false && keyCode === LEFT_ARROW && s.xspeed !== 1 && s.xspeed !== -1) {
    s.dir(-1, 0);
    keyValid = false;
  } 
}

function keyTyped() {
  if (key === 'p'){
    s.togglePause();
  }
  if (key === 'y'){
    s.startOver();
    
  }
}

function mousePressed(){
  var d = dist(mouseX, mouseY, 300, 380);
  if (d <= 120) {
    s.startOver();
  }
}