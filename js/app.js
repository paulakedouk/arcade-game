var Game = function(){
    // Global variables
    player = new Player();
    allEnemies = [];

    target = new Target();

    // Add enemies
    this.addEnemies();
    setInterval(this.addEnemies, 3000);

    this.collideEfx = new Audio('audio/sfx_collide.wav');
};

Game.prototype.addEnemies = function() {
    allEnemies.push(new Enemy(1));
    allEnemies.push(new Enemy(2));
    allEnemies.push(new Enemy(3));
};

// Enemies our player must avoid
var Enemy = function(y) {
    this.sprite = 'images/enemy-bug.png';

    this.x = -250;
    if (y == 1) {this.y = 130;}
    else if (y == 2) {this.y = 210;}
    else if (y == 3) {this.y = 290;}

    this.rate = 101 + Math.floor(Math.random() * 50);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (dt * this.rate);

    // Enemy collision;
    if (this.x < player.x + 80 && player.x < this.x + 80 && this.y < player.y + 70 && player.y < this.y + 70) {
        game.collideEfx.play();
        player.reset();
        target.reset();
    }
};

// Randomize start location of enemy
Enemy.prototype.reset = function() {
  this.x = 0 - Math.random() * 150;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player


var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 370;
};

// Update the player's position
Player.prototype.update = function() {
    if (this.y < 0) {
        this.y = 50;
    }
    if (this.y > 480) {
        this.y = 450;
    }
    if (this.x < 0) {
        this.x = 0;
    }
    if (this.x > 410) {
        this.x = 400;
    }

    //Get girl collision
    if (this.x < target.x + 80 && target.x < this.x + 80 && this.y < target.y + 70 && target.y < this.y + 70) {
        player.getGirl();
        game.collideEfx.play();
    }
};

//Draw player on the screen
Player.prototype.render = function() {
ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    if (key == 'up') {
        this.y -= 80;
    } else if (key == 'down') {
        this.y += 80;
    } else if (key == 'right') {
        this.x += 100;
    } else if (key == 'left') {
        this.x -= 100;
}
};

Player.prototype.reset = function() {
    this.sprite = 'images/char-boy.png';

    this.x = 200;
    this.y = 370;
};

Player.prototype.getGirl = function() {
    this.sprite = 'images/char-boy-girl.png';
    target.y = -100;
};

var Target = function() {
    this.sprite = 'images/char-cat-girl.png';
    this.x = 200;
    this.y = 50;
};

//Draw player on the screen
Target.prototype.render = function() {
ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Target.prototype.reset = function() {
    this.sprite = 'images/char-cat-girl.png';

    this.x = 200;
    this.y = 50;
};

game = new Game();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    // Pass the values to the handleInput method
    player.handleInput(allowedKeys[e.keyCode]);
});

