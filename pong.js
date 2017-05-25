function Ball(x, y, vx, vy, length, radius) {
   this.x = x;
   this.y = y;
   this.vx= vx;
   this.vy = vy;
   this.length = length;
   this.radius = radius;
}

Ball.prototype.run = function(dt) {
   this.x += this.vx * dt;
   this.vy += this.vy * dt;
}



function Player(x, y, length, vel) {
   this.x = x;
   this.y = y;
   this.length = length;
   this.vel = vel;
}

Player.prototype.run = function(dt) {
   this.y += this.vel * dt;
}

Player.prototype.verifyColision = function(ball) {
   if((ball.y+ball.length/2) < this.y) { return false; }
   if((bal.y-ball.length/2) > (this.y + this.length)) { return false; }
   
   /* Ball collider is a square */
   if(Math.abs(ball.x-this.x) > ball.length/2) { return false; }
      
   return true;
}

