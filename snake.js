function Snake(){
  this.x = 0;
  this.y = 0;
  this.xspeed = 0;
  this.yspeed = 0;
  this.total = 1;
  this.tail = [];
  this.paused = false;
  this.dead = false;
  
  this.foodRed = 255;
  this.foodGreen = 255;
  this.foodBlue = 255;
  this.snakeRed = this.foodRed;
  this.snakeGreen = this.foodGreen;
  this.snakeBlue = this.foodBlue;
  
  this.dir = function(x, y) {
    this.xspeed = x;
    this.yspeed = y;
  }
  
  this.togglePause = function() {
    if (!this.paused){
      this.paused = true;
    } 
    else if (this.paused){
      this.paused= false;
      }
  }

  this.startOver = function(){
    this.x = 0;
    this.y = 0;
    this.xspeed = 0;
    this.yspeed = 0;
    this.total = 1;
    this.tail = [];
    this.paused = false;
    this.dead = false;
  }

  
  this.isEnd = function() {
    if (this.x < 0 || this.x > width - scl || this.y < 0 || this.y > height - scl){
        this.dead = true;
    } else {
      for(var i = 0; i < this.tail.length-1; i++){
        var pos = this.tail[i];     
        var d = dist(this.x, this.y, pos.x, pos.y);
        if (d < 1) {
          this.dead = true;
        }
      }
    }
  }
  
  this.eat = function(pos){
    var d = dist(this.x, this.y, pos.x, pos.y);
    if (d < 1){
      this.total++;
      this.snakeRed = this.foodRed;
      this.snakeGreen = this.foodGreen;
      this.snakeBlue = this.foodBlue;
      return true;
    } else {
      return false;
    }
  }
  
  this.update = function() {
    if (this.total === this.tail.length){
      for(var i = 0; i < this.tail.length-1; i++) {
      this.tail[i] = this.tail[i+1];
      }
      this.tail[this.total-1] = createVector(this.x, this.y);
    } else {
      this.tail.push(createVector(this.x, this.y));
    }
    this.x = this.x + this.xspeed * scl;
    this.y = this.y + this.yspeed * scl;
  }
  
  this.show = function() {
    fill(this.snakeRed, this.snakeGreen, this.snakeBlue);
    for(var i = 0; i < this.tail.length; i++){
      rect(this.tail[i].x, this.tail[i].y, scl, scl);
    }
  }
}