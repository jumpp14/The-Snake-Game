var s;
var scl = 20;

var food;

var pauseIcon;
var ctx;
var gameOverIcon;

function setup() {
  createCanvas(600, 600);
  s = new Snake();
  s.tail.push(createVector(s.x, s.y));
  frameRate(10);
  pickLocation();
  pauseIcon = document.getElementById("pause");
  gameOverIcon = document.getElementById("over");
  ctx = canvas.getContext("2d");
  
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
  
  gameOverIcon.style.display = "none";
  
  background(51);
  
  fill(s.foodRed, s.foodGreen, s.foodBlue);
  rect(food.x,food.y, scl, scl);
  
  if(!s.paused){
    
    pauseIcon.style.display = "none"; 
    
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
      
    ctx.font = "50px 'Julee'";
    ctx.fillStyle = '#ffcc99';
    ctx.fillText("Game Over", 200, 250);
    ctx.fillText("Start Over?", 200, 310);
    s.show();
    
    }
    
}



function keyPressed() {
  if (keyCode === UP_ARROW && s.yspeed !== 1 && s.yspeed !== -1) {
    s.dir(0, -1);
  } else if (keyCode === DOWN_ARROW && s.yspeed !== 1 && s.yspeed !== -1) {
    s.dir(0, 1);
  } else if (keyCode === RIGHT_ARROW && s.xspeed !== 1 && s.xspeed !== -1) {
    s.dir(1, 0);
  } else if (keyCode === LEFT_ARROW && s.xspeed !== 1 && s.xspeed !== -1) {
    s.dir(-1, 0);
  } 
}

function keyTyped() {
  if (key === 'p'){
    s.togglePause();
  }
  if (key === 'y'){
    s.startOver();
    //gameOverIcon.style.display = "none";
    
  }
}