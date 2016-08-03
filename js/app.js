// Create the game constructor to store the game variables
var Game = function() {
    this.paused = false;
    this.gameOn = false;
    this.gameOver = false;
    this.gameWin = false;
};

// Toggle between paused and un-paused states by blocking updates.
Game.prototype.togglePause = function() {
    this.paused = !this.paused;
};

Game.prototype.addAnEnemy = function() {
  /* Determine what row to put the new enemy on. This is determined
   * by finding how many enemies there are, and adding one to the next
   * stone row. When all rows are filled, start again at the first stone row.
   */
  var rows = 4;
  var count = allEnemies.length + 1;

  // Loop to top if count > rows available.
  if (count > rows) {
    count -= rows;
  }

  // Add the new enemy to the allEnemies array
  var enemy = new Enemy(-100, (count * 83) - 21);
  allEnemies.push(enemy);
};

Game.prototype.gameReset = function() {

  // Place all enemy objects in an array called allEnemies
  allEnemies = [];
  for(var i=1; i<4; i++){
    var enemy = new Enemy(0-i*101, 83*i-21);
    allEnemies.push(enemy);
  }

  /* Create array to hold items in scoring position. Prepopulate start and end
   * positions (walls) as nonusable.
   */
  allScorePositions = [];
  var score = new ScorePosition('blank',0);
  allScorePositions.push(score);
  var score2 = new ScorePosition('blank',606);
  allScorePositions.push(score2);

  /* Instantiate book offscreen, then randomize its location to start
   * Do not use 'var', so that it becomes global.
   */
  book = new Item('book', -100, -100);
  book.reset();

  /* Place the player object in a variable called player
   * Do not use 'var', so that it becomes global.
   */
  player = new Player(303, 404);

  // Turn on game indicator. This will start game rendering.
  this.gameOn = true;
};

// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // Enemy position
    thix.x = x;
    thix.y = y;

    // Enemy speed

    this.rate = Math.floor((Math.random() * 5) + 1);
};

// Update the enemy's position and check for collisions
Enemy.prototype.update = function(dt) {
    if (!game.paused){
        this.x = this.x + (dt + this.rate);
    }

    // When bug goes off one side, reappear on the other side
    if (this.x > 700){
        this.x = -100;
    }
};

// Randomize start location of enemy
Enemy.prototype.reset = function() {
    this.x = 0 - Math.random() * 200;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function(x, y) {
    this.sprite = 'images/Miriam.png';
    this.x = x;
    this.y = y;
    this.carryItem = false;
};

Player.prototype.reset = function() {
  /* Switch between player sprites if scoring row not reached
   * or scoring row is reached without carrying the item.
   * Switching is based on a search against the sprite name.
   * A ternary operator is used to alternate between images.
   */
  if (this.y > 0 || (this.y < 0 && !this.carryItem)) {
    var name = (this.sprite.search('Mike') !== -1) ? 'Miriam' : 'Mike';
    this.sprite = 'images/' + name + '.png';
  }

  /* If player is carrying an item, set carryItem to false and
   * modify sprite name to no longer display that item
   */
  if (this.carryItem) {
    this.carryItem = false;
    this.sprite = this.sprite.replace('_w_' + book.name,'');
  }

  // Set player to start position
  this.x = 303;
  this.y = 404;
};

/* Handle keyboard input during gameplay.
 * 'IF' statements verify movement will not allow the player outside the
 * canvas boundaries before the movement is calculated.
 * @param {String} key, the keyCode from the key pressed
 */
Player.prototype.handleInput = function(key) {
  switch(key) {
    case 'up':
      if (this.y > 0 && !game.paused){
        this.y -= 83;
      }
      break;
    case 'down':
      if (this.y < 404 && !game.paused) {
        this.y += 83;
      }
      break;
    case 'left':
      if (this.x > 0 && !game.paused) {
        this.x -= 101;
      }
      break;
    case 'right':
      if (this.x < 606 && !game.paused){
        this.x += 101;
      }
      break;
    case 'pause':
      game.togglePause();
      break;
    case 'restart':
      game.gameReset();
      break;
  }
};

//Draw player on the screen
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Initialize game (implicity global)
game = new Game();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
  var allowedKeys;
  if (!game.gameOn) {
    allowedKeys = {
      32: 'spacebar'
    };
  } else {
    allowedKeys = {
      32: 'spacebar',
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down',
      65: 'left',      // A
      68: 'right',     // D
      83: 'down',      // S
      80: 'pause',
      82: 'restart',
      87: 'up'         // W
    };
    player.handleInput(allowedKeys[e.keyCode]);
  }
  if (e.keyCode in allowedKeys){
    e.preventDefault();
  }
});