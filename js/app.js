// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

	//set the X position at a random spot
	this.x = Math.floor(Math.random() * 505);

	//Set the Y position (randomly through the rows 2 through 4)
	this.y = Math.floor(Math.random() * 3) * 83 + 65;

	//Set the speed to random (150 to 300 pixels per second)
	this.speed = Math.floor(Math.random() * 150) + 151;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
	if (this.x > 505) {
		//set the X position to 0
		this.x = 0;

		//Set the Y position (randomly through the rows 2 through 4)
		this.y = Math.floor(Math.random() * 3) * 83 + 65;
	} else {
		this.x = this.x + this.speed * dt;
	}
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Our player
var Player = function() {
    // The image/sprite for our player, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';

	//set the X position at a random spot
	this.x = 505/2 - 50;

	//Set the Y position (randomly through the rows 2 through 4)
	this.y = 405;
};

//Our player behaves somewhat like an enemy, so it should be a subclass of enemy
Player.prototype = Object.create(Enemy.prototype);
Player.prototype.constructor = Player;

//Players will reset to the bottom middle square
Player.prototype.reset = function() {
	//set the X position in the middle of the last row
	this.x = 505/2 - 50;

	//Set the Y position at the bottom
	this.y = 405;
};

// This function moves the players based on input and current position.
// If the reaches the top, the player will reset back to beginning
// The player will not be able to move off the board.
Player.prototype.handleInput = function(key) {
	switch (key) {
		case "up":
			if (this.y < 100) {
				this.reset();
			} else {
				this.y = this.y - 83;
			}
			break;
		case "down" :
			if (this.y < 350) {
				this.y = this.y + 83;
			}
			break;
		case "left" :
			if (this.x > 101) {
				this.x = this.x - 101;
			}
			break;
		case "right" :
			if (this.x < 400) {
				this.x = this.x + 101;
			}
			break;
		default:
			break;
		//do nothing if another key was passed in
	}
};

// This function handles collision checking.
// If a player is close to an enemy, the player will reset back
// to the starting position.
Player.prototype.update = function() {
	var i;
	for (i = 0; i < allEnemies.length; i+=1) {
		if ((Math.abs(this.x - allEnemies[i].x) < 30) && (Math.abs(this.y - allEnemies[i].y) < 30)) {
			this.reset();
		}
	}
};

//Insantiate the enemies and player
var allEnemies = [new Enemy(), new Enemy(), new Enemy()];
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. 
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
