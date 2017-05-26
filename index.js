function Ball(x, y, vx, vy, width) {
   this.initX = x;
   this.initY = y;
   this.x = x;
   this.y = y;
   this.vx = vx;
   this.vy = vy;
   this.width = width;
}

Ball.prototype.run = function(dt) {
   this.x = this.x + this.vx * dt;
   this.y = this.y + this.vy * dt;
}

Ball.prototype.draw = function(context) {
   context.beginPath();
   context.fillStyle = "#00ff00";
   context.rect(this.x-this.width/2, this.y-this.width/2, this.width, this.width);
   context.fill();  
}

Ball.prototype.reset = function() {
   this.x = this.initX;
   this.y = this.initY;
   this.vx = 0;
   this.vy = 0;
}

function Player(x, y, width, vel) {
   this.x = x;
   this.y = y;
   this.width = width;
   this.vel = vel;
}

Player.prototype.run = function(dt) {
   this.y += this.vel * dt;
}

Player.prototype.verifyColision = function(ball) {
   
   if(!ball) { return false; }

   if((ball.y+ball.width/2) < this.y) { return false; }
   if((ball.y-ball.width/2) > (this.y + this.len)) { return false; }
   
   //console.log('No collistion by out-bounds');

   /* Ball collider is a square */
   if(Math.abs(ball.x-this.x + 5) > ball.width/2) { return false; }

   //console.log('No Collision yet');

   return true;
}

Player.prototype.draw = function(context) {
   context.beginPath();
   context.fillStyle = "#00ff00";
   context.rect(this.x, this.y, 5, this.width);
   context.fill();  
}

function GameField(x0, y0, width, height) {
   this.x0 = x0;
   this.y0 = y0;
   this.width = width;
   this.height = height;
   this.player1 = undefined;
   this.player2 = undefined;
   this.ball = undefined;
}

GameField.prototype.verifyCollision = function(ball) {
   if((ball.y - ball.width/2) <= this.y0) { return true; }
   if((ball.y + ball.width/2) >= (this.y0+this.height)) { return true; }

   return false; 
}

GameField.prototype.run = function(dt) {

   this.ball.run(dt);
   this.player1.run(dt);
   this.player2.run(dt);
   
   if(this.player1.verifyColision(this.ball) || 
      this.player2.verifyColision(this.ball)) {
      this.ball.vx = -this.ball.vx;
   }
   
   if(this.verifyCollision(this.ball)) {
      this.ball.vy = -this.ball.vy;
   }
}

GameField.prototype.draw = function(context) {

   context.fillStyle = 'rgba(0, 0, 0, 1.0)';
   context.fillRect(0, 0, this.width, this.height);

   this.player1.draw(context);
   this.player2.draw(context);
   this.ball.draw(context);

}

function update() {

   game.run(FRAME_TIME/1000.0);

   var canvas = document.querySelector("canvas");
   var ctx = canvas.getContext('2d');
   /* draw elements */
   game.draw(ctx);

   console.log("Running");
}

let gameStarted = false;
const FRAME_TIME = 1000/30;
let game = undefined;
var timerId = -1;

window.onload = function() {

   var canvas = document.querySelector("canvas");
   var ctx = canvas.getContext('2d');

   var width = canvas.width = 980;
   var height = canvas.height = 450;

   game = new GameField(0, 0, canvas.width, canvas.height);
   
   var p1 = new Player(25, game.height/2 - 50, 100, 0);
   var p2 = new Player(game.width-25, game.height/2 - 50, 100, 0);   
   var ball = new Ball(game.width/2-10, game.height/2-10, 0, 0, 20);

   game.player1 = p1;
   game.player2 = p2;
   game.ball = ball;

   initGameControl();

   update();

}

function initGameControl() {
   document.getElementById("play-button").addEventListener("click", function() {
      if(!gameStarted) {
         gameStarted = true;
         timerId = setInterval(update, FRAME_TIME);
         // game.ball.vx = 100;
         game.ball.vy = 100;
      }
   });

   document.getElementById("reset-button").addEventListener("click", function() {
      if(timerId >= 0) {
         gameStarted = false;
         clearTimeout(timerId);
         timerID = -1;
         game.ball.reset();
         update();
      }
   });
}

