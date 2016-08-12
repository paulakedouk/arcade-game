// GAME CLASS

// Create the game constructor to to hold functions called against the overall game state
var Game = function(){
    // Initialize game variables
    this.gameWin = false;
    this.gameOver = false;
    this.boyHasGirl = false;

    player = new Player();
    allEnemies = [];
    girl = new Girl();

    // Add an enemies with interval of 3 seconds
    this.addEnemies();
    setInterval(this.addEnemies, 2500);

    //Preload audio sample
    this.collideEfx = new Audio('audio/sfx_collide.wav');
    this.girlEfx = new Audio('audio/sfx_cheering.wav');
    this.sadEfx = new Audio('audio/sfx_sad.wav');
    this.loveEfx = new Audio('audio/sfx_love.wav');

    this.startTimer();
};

// Declare the global variables
var player, allEnemies, girl, timer, timerInterval;

Game.prototype.startTimer = function() {
    timer = 0;
    timerInterval = setInterval(function(){
        document.getElementById('timer').innerHTML = 'Time: ' + timer;
        timer++;
    }, 100);
};

Game.prototype.stopTimer = function() {
    clearInterval(timerInterval);
};

// Push an enemy in each row
Game.prototype.addEnemies = function() {
    allEnemies.push(new Enemy(1));
    allEnemies.push(new Enemy(2));
    allEnemies.push(new Enemy(3));
};

Game.prototype.gameRestart = function() {
    this.gameWin = false;
    this.gameOver = false;
    this.boyHasGirl = false;

    player = new Player();
    allEnemies = [];
    girl = new Girl();
    game.startTimer();
};

// ENEMIES CLASS

// Create the enemy constructor
var Enemy = function(y) {
    // Set the image for the enemy
    this.sprite = 'images/enemy-bug.png';

    // Set the enemies position
    this.x = -250;
    if (y == 1) {this.y = 130;}
    else if (y == 2) {this.y = 210;}
    else if (y == 3) {this.y = 290;}

    // Set the speed rate for the enemy using a random
    this.rate = 101 + Math.floor(Math.random() * 350);
};

// Update the enemy's position and check for collisions
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Set the position of the enemy based on dt and the speed rate
    this.x = this.x + (dt * this.rate);


    // Check for collisions with the player and put girl back to her initial position
    if (!game.gameWin && !game.gameOver && this.x < player.x + 80 && player.x < this.x + 80 && this.y < player.y + 70 && player.y < this.y + 70) {
        game.collideEfx.play();
        player.reset();
        girl.reset();
        game.boyHasGirl = false;

        // Game over
        game.gameOver = true;
        game.stopTimer();
        game.sadEfx.play();
    }
};

// Randomize start location of enemy
Enemy.prototype.reset = function() {
  this.x = 0 - Math.random() * 150;
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// PLAYER CLASS

// Create the Player constructor
var Player = function() {

    this.sprite = 'images/char-boy.png';

    // Set the player position
    this.x = 200;
    this.y = 370;
};

// Update the players position
Player.prototype.update = function() {
    // Get girl collision
    if (this.x < girl.x + 80 && girl.x < this.x + 80 && this.y < girl.y + 70 && girl.y < this.y + 70) {
        this.getGirl();
    }

    // If the boy has the girl and back to his initial position, the game ends
    if (this.y >= 370 && game.boyHasGirl) {
        this.sprite = 'images/char-saved.png';
        this.x = 150;
        this.y = 200;
        game.gameWin = true;
        game.stopTimer();
        game.girlEfx.play();
    }

    if (!game.boyHasGirl && game.gameOver) {
        this.sprite = 'images/char-lost.png';
        this.x = 150;
        this.y = 200;
        game.stopTimer();
    }
};

// Reset the player to his original position and image
Player.prototype.reset = function() {
    this.sprite = 'images/char-boy.png';

    this.x = 200;
    this.y = 370;
};

// Set the image when the boy pickup the girl
Player.prototype.getGirl = function() {
    this.sprite = 'images/char-boy-girl.png';

    // Set girl position to the outside of the screen
    girl.y = -100;

    // When the boy has the girl
    game.boyHasGirl = true;
    game.loveEfx.play();
};

// Handle keyboard input
Player.prototype.handleInput = function(key) {
    if (!game.gameWin) {
        if (key == 'up') {
            this.y -= 80;
        } else if (key == 'down') {
            this.y += 80;
        } else if (key == 'right') {
            this.x += 100;
        } else if (key == 'left') {
            this.x -= 100;
        }
    }
    if ((key == 'enter' && game.gameOver) || (key == 'enter' && game.gameWin)) {
            game.gameRestart();

    }
    if (this.y < 0) {
        this.y = 50;
    }
    // Bottom
    if (this.y > 480) {
        this.y = 450;
    }
    // Left
    if (this.x < 0) {
        this.x = 0;
    }
    // Right
    if (this.x > 410) {
        this.x = 400;
    }
};

// Draw the player on the screen
Player.prototype.render = function() {
ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// GIRL CLASS

// Create the girl constructor
var Girl = function() {
    // Set the image for the girl
    this.sprite = 'images/char-cat-girl.png';

    // Set the girl position
    this.x = 200;
    this.y = 50;
};

// Reset the girl to her original position and image
Girl.prototype.reset = function() {
    this.sprite = 'images/char-cat-girl.png';

    this.x = 200;
    this.y = 50;
};

// Draw girl on the screen
Girl.prototype.render = function() {
ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Instantiate the game
game = new Game();

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        13: 'enter',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    // Pass the values to the handleInput method
    player.handleInput(allowedKeys[e.keyCode]);
});

