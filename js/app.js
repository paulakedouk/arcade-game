// Enemies our player must avoid
var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';

    this.x = -200;
    this.y = 100;

    this.rate = 100 + Math.floor(Math.random() * 150);

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (dt * this.rate);

    if (this.x > 505) {
        this.x = -100;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    allEnemies.forEach(function(){
        this.x = 300;
    });
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [new Enemy()];

var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 350;

};

// Update the player's position
Player.prototype.update = function() {
    this.x = this.x;
    this.y = this.y;
};

//Draw player on the screen
Player.prototype.render = function() {
ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function() {};

var player = new Player();

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
