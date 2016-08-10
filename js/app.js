// Enemies our player must avoid
var Enemy = function(y) {
    this.sprite = 'images/enemy-bug.png';

    this.x = -250;
    if (y == 1) {this.y = 130;}
    else if (y == 2) {this.y = 210;}
    else if (y == 3) {this.y = 290;}

    this.rate = 101 + Math.floor(Math.random() * 150);

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (dt * this.rate);

    if (this.x < player.x + 80 && player.x < this.x + 80 && this.y < player.y + 70 && player.y < this.y + 70) {
        player.reset();
        console.log("test");
    }

    if (this.x > 500) {
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
    this.x = 200;
    this.y = 370;
};

// Update the player's position
Player.prototype.update = function() {
    if (this.y < 85) {
        this.y = 130;
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
    console.log(this.x);
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

Player.prototype.reset = function(){
    this.x = 200;
    this.y = 370;
};

var player = new Player();

var allEnemies = [new Enemy(1), new Enemy(2), new Enemy(3)];
//var allEnemies = [];


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
