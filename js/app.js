// Enemies our player must avoid
var Enemy = function(y) {
    this.sprite = 'images/enemy-bug.png';

    this.x = -200;
    this.y = 100 * y;

    this.rate = 101 + Math.floor(Math.random() * 150);

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (dt * this.rate);

    if (this.y < player.y + 101 && this.y + 101 > player.y && this.x < player.x + 171 && this.x + 171 > player.y) {
        player.reset();
    }

    if (this.x > 505) {
        this.x = -100;
    }
};

/*Enemy.prototype.collision = function(enemy,player) {
    var rect1 = Enemy;
    var rect2 = Player;

    if (rect1.x < rect2.x + rect2.width &&
       rect1.x + rect1.width > rect2.x &&
       rect1.y < rect2.y + rect2.height &&
       rect1.height + rect1.y > rect2.y) {
        // collision detected!
    }

    // filling in the values =>

    if (5 < 30 &&
        55 > 20 &&
        5 < 20 &&
        55 > 10) {
        // collision detected!
    }
};*/

// Randomize start location of enemy
Enemy.prototype.reset = function() {
    if (this.x == -100) {
        this.x = this.x + this.rate;
    }
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
    this.x = 220;
    this.y = 400;

};

// Update the player's position
Player.prototype.update = function() {

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
        this.x += 101;
    } else if (key == 'left') {
        this.x -= 101;
    }
};

Player.prototype.reset = function(){
    // Reset the image
    this.sprite = 'images/char-boy.png';

    // Set player to start position
    this.x = 100;
    this.y = 400;
};

var player = new Player();

var allEnemies = [new Enemy(1), new Enemy(2)];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
