/*

- Copy your game project code into this file
- for the p5.Sound library look here https://p5js.org/reference/#/libraries/p5.sound
- for finding cool sounds perhaps look here
https://freesound.org/


*/

var gameChar_x;
var gameChar_y;
var floorPos_y;

var isLeft;
var isRight;
var isFalling;
var isPlummeting;

var collectables;

var canyon;
var canyonPoint;

var trees_x;

var clouds;

var mountain;
var mountains;

var cameraPosX;

var game_score;

var flagpole;

var gameChar_world_X ;
var scrollPos;

var platForms; 

var enemies;


var jumpSound;

function preload()
{
    soundFormats('mp3','wav');
    
    //load your sounds here
    jumpSound = loadSound('assets/jump.wav');
    jumpSound.setVolume(0.1);
}


function setup()
{
	createCanvas(1024, 576);

	game_score = 4;

	startGame();

}

function startGame()
		{
		
			gameChar_x = width/2;
			floorPos_y = height * 3/4;
			gameChar_y = floorPos_y;

			scrollPos = 0;
			gameChar_world_X = gameChar_x - scrollPos;

			isRight = false;
			isLeft = false;
			isFalling = false;
			isPlummeting = false;
			collectables = 
			[
			{x_pos: 50, y_pos: floorPos_y, size: 50, isFound: false},
			{x_pos: 900, y_pos: floorPos_y, size: 50, isFound: false},
			{x_pos: 2000, y_pos: floorPos_y, size: 50, isFound: false},
			{x_pos: 5000, y_pos: floorPos_y, size: 50, isFound: false},
			{x_pos: 4000, y_pos: floorPos_y, size: 50, isFound: false},
			{x_pos: 1400, y_pos: floorPos_y, size: 50, isFound: false},
			{x_pos: 3400, y_pos: floorPos_y, size: 50, isFound: false},
			];

			canyons = 
			[
			{x_pos: 100, y_pos: floorPos_y, width: 80},
			{x_pos: 1000, y_pos: floorPos_y, width: 80},
			{x_pos: 1900, y_pos: floorPos_y, width: 80},
			{x_pos: 1000, y_pos: floorPos_y, width: 80},
			{x_pos: 2900, y_pos: floorPos_y, width: 80},
			{x_pos: 4000, y_pos: floorPos_y, width: 80},
			{x_pos: 7900, y_pos: floorPos_y, width: 80},
			];
	
			canyonPoint =
			 {
				x: 50,
				y: 50
				}


			trees_x = [
				250, 600, 900, 1200, 2200, 3200, 4200, 5200, 6200, 1700, 7200, 8200, 1900, 9200, 12000, 13000, 14000, 15000,
								];
			treePos_y = floorPos_y;

			clouds = [
				100, 400, 700, 1000, 2000,  3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 110000, 120000, 130000, 140000, 15000, 16000,
							];

			mountains = [
				400, 700, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 2000, 13000, 14000, 15000, 16000, 17000, 18000, 
									];
			mountain = {x_pos: 0, y_pos: 0};
			mountain.y_pos = floorPos_y;

			cameraPosX = 0;

			flagpole = {isReached: false, x_pos: 5500};


			platForms = [];

			platForms.push(createPlatforms(200, 270, 100));
			platForms.push(createPlatforms(600, 270, 50));
			platForms.push(createPlatforms(1000, 270, 50));
			platForms.push(createPlatforms(1500, 300, 50));
			platForms.push(createPlatforms(1900, 300, 100));
			platForms.push(createPlatforms(2500, 300, 50));
			platForms.push(createPlatforms(3000, 300, 150));
			platForms.push(createPlatforms(3800, 300, 50));
			platForms.push(createPlatforms(4500, 300, 50));
			platForms.push(createPlatforms(4700, 300, 50));


			game_score -= 1;

			enemies = [];
			enemies.push(new Enemy(220, floorPos_y-10, 30));
			enemies.push(new Enemy(1000, floorPos_y - 10, 40));
			enemies.push(new Enemy(1700, floorPos_y - 10, 200));
			enemies.push(new Enemy(2600, floorPos_y - 10, 30));
			enemies.push(new Enemy(3600, floorPos_y - 10, 100));
			enemies.push(new Enemy(4200, floorPos_y - 10, 30));
			enemies.push(new Enemy(4700, floorPos_y - 10, 20));
		
		}



function draw()
{

	///////////DRAWING CODE//////////

	background(100,155,255); //fill the sky blue

	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height - floorPos_y); //draw some green ground


	
	cameraPosX += (gameChar_x - cameraPosX - width / 2) * 0.1;
  push();
  translate(-cameraPosX, 0);

	// draw trees
	// for loop trees
	drawTrees();


	//draw the mountains
	drawMountains();

	// draw clouds
	drawClouds();

	// draw the canyon
	for(var j =0; j<canyons.length; j++)
	{

			drawCanyon(canyons[j]);
			checkCanyon(canyons[j]);
		
	}
		// Collectable item
		for(var i =0; i<collectables.length; i++)
		{
	
			if(collectables[i].isFound == false)
			{
				
				drawCollectable(collectables[i]);
				checkCollectable(collectables[i]);
				
			}
			
		}


		// platforms
		for( var i=0; i < platForms.length; i++)
		{
			platForms[i].draw();
		}
	

	//the game character
	if(isLeft && isFalling)
	{
		// add your jumping-left code
		//Hands
		noStroke();
		stroke(0);
		line(gameChar_x, gameChar_y - 40, gameChar_x - 25, gameChar_y - 60);

		stroke(0);
		line(gameChar_x , gameChar_y - 40, gameChar_x + 25, gameChar_y - 30);
	
		// Head
		fill(220, 120, 120);
		ellipse(gameChar_x, gameChar_y - 60, 25, 28);
	
		// Body
		fill(220, 20, 20);
		rect(gameChar_x - 12, gameChar_y - 48, 25, 40);
		
		// Legs
		fill(0);
		ellipse(gameChar_x -16, gameChar_y - 10, 8, 12);
	
		fill(0);
		ellipse(gameChar_x + 9, gameChar_y - 6, 7, 12);

	}
	else if(isRight && isFalling)
	{
		// add your jumping-right code

		//Hands
		stroke(0);
		line(gameChar_x, gameChar_y - 40, gameChar_x - 25, gameChar_y - 30);

		stroke(0);
		line(gameChar_x , gameChar_y - 40, gameChar_x + 25, gameChar_y - 60);

			// Head
			fill(220, 120, 120);
			ellipse(gameChar_x, gameChar_y - 60, 25, 28);

			// Body
			fill(220, 20, 20);
			rect(gameChar_x - 12, gameChar_y - 48, 25, 40);
	
			// Legs
			fill(0);
			ellipse(gameChar_x - 8, gameChar_y - 3, 7, 12);

			fill(0);
			ellipse(gameChar_x + 17, gameChar_y - 10, 7, 12);
	}
	else if(isLeft)
	{
			// add your walking left code
	

			//Hands
			stroke(0);
			line(gameChar_x, gameChar_y - 40, gameChar_x - 25, gameChar_y - 60);

			stroke(0);
			line(gameChar_x , gameChar_y - 40, gameChar_x + 25, gameChar_y - 30);
	
			//Head
			fill(220, 120, 120);
			ellipse(gameChar_x, gameChar_y - 60, 25, 28);

			// Body
			fill(220, 20, 20);
			rect(gameChar_x - 12, gameChar_y - 48, 25, 40);

			// Legs
			fill(0);
			ellipse(gameChar_x - 14, gameChar_y - 10, 12, 10);

			fill(0);
			ellipse(gameChar_x + 12, gameChar_y - 5, 10, 10);
	}
	else if(isRight)
	{
			// add your walking right code

			//Hands
			stroke(0);
			line(gameChar_x, gameChar_y - 40, gameChar_x - 25, gameChar_y - 30);

			stroke(0);
			line(gameChar_x , gameChar_y - 40, gameChar_x + 25, gameChar_y - 60);


		//Head
		fill(220, 120, 120);
		ellipse(gameChar_x, gameChar_y - 60, 25, 28);

		// Body
		fill(220, 20, 20);
		rect(gameChar_x - 12, gameChar_y - 48, 25, 40);

		// Legs
		fill(0);
		ellipse(gameChar_x -10, gameChar_y - 5, 10, 10);

		fill(0);
		ellipse(gameChar_x + 14, gameChar_y - 10, 12, 10);
	}
	else if(isFalling || isPlummeting)
	{
		// add your jumping facing forwards code

		//hands
		stroke(0);
		line(gameChar_x, gameChar_y - 40, gameChar_x - 25, gameChar_y - 60);

		stroke(0);
		line(gameChar_x , gameChar_y - 40, gameChar_x + 25, gameChar_y - 60);
	
		// Head
		fill(220, 120, 120);
		ellipse(gameChar_x, gameChar_y - 60, 25, 28);

		// Body
		fill(220, 20, 20);
		rect(gameChar_x - 12, gameChar_y - 48, 25, 40);
	
		// Legs
		fill(0);
		ellipse(gameChar_x - 10, gameChar_y - 3, 7, 12);

		fill(0);
		ellipse(gameChar_x + 10, gameChar_y - 3, 7, 12);
	}
	else
	{
		// add your standing front facing code


		//hnds
		stroke(0);
		line(gameChar_x, gameChar_y - 40, gameChar_x - 25, gameChar_y - 30);

		stroke(0);
		line(gameChar_x , gameChar_y - 40, gameChar_x + 25, gameChar_y - 30);
	
		//Head
		fill(220, 120, 120);
		ellipse(gameChar_x, gameChar_y - 60, 25, 28);

		// Body
		fill(220, 20, 20);
		rect(gameChar_x - 12, gameChar_y - 48, 25, 40);

		// Legs
		fill(0);
		ellipse(gameChar_x - 10, gameChar_y - 3, 10, 10);

		fill(0);
		ellipse(gameChar_x + 10, gameChar_y - 3, 10, 10);

	}

	renderFlagpole();

	checkPlayerDie();

	// pop();

	// fill(255);
	// noStroke();
	// textSize(20);
	// text("Score: " + game_score, 20, 30);
	

	///////////INTERACTION CODE//////////
	//Put conditional statements to move the game character below here

	if (isLeft == true)
	{
		gameChar_x -= 3;
	}
	

	if(isRight == true)
	{
		gameChar_x += 3;
	}
	

	if (gameChar_y < floorPos_y) {

		var isContact = false;
		for( var i=0; i < platForms.length; i++)
		{
			if(platForms[i].checkContact(gameChar_world_X, gameChar_y) == true)
			{
				isContact = true;
				break;
			}
		}
		if(isContact == false)
		{
			gameChar_y += 3;
			isFalling = true;
		} 
		 else
		  {
		isFalling = false;
			}
		}
	
	if(flagpole.isReached == false)
	{
		checkFlagpole();

	}


	for( var i =0; i < enemies.length; i++)
	{
		enemies[i].draw();
 
		var isContact = enemies[i].checkContact(gameChar_world_X, gameChar_y);
 
		if(isContact)
		{
			if(game_score > 0)
			{
				startGame();
				break;
			}
		}
	}

	pop();

	fill(255);
	noStroke();
	textSize(20);
	text("Score: " + game_score, 20, 30);

	


// life token for loop 
			let lifeSpacing = 25;
  		let startX = 140;
  
  		for (let i = 0; i < game_score; i++)
			{
    		fill(255, 0, 0); // Red color for life token
    		ellipse(startX + i * lifeSpacing, 20, 20, 20); // Draw life token
			}

				if (game_score< 1) {
					fill(0);
					textSize(24);
					textAlign(CENTER, CENTER);
					text("Game over. Press space to continue.", width / 2, height / 2);
					return; // Exit the draw loop when game is over
				}
				
				if (flagpole.isReached) {
					fill(0);
					textSize(24);
					textAlign(CENTER, CENTER);
					text("Level complete. Press space to continue.", width / 2, height / 2);
					return; // Exit the draw loop when level is complete
				}

				gameChar_world_X = gameChar_x - scrollPos;


				// pop();

}



function keyPressed()
{
	// if statements to control the animation of the character when
	// keys are pressed.

	//open up the console to see how these work
	console.log("keyPressed: " + key);
	console.log("keyPressed: " + keyCode);

	if (key == "a")
	{
		console.log('left arrow');
 		isLeft = true;
	} 
	
	if (key == 'b')
	{
		console.log('right arrow');
		isRight = true;
	}

	if (key == "w" && gameChar_y >= floorPos_y) 
	{
		gameChar_y -= 200;
    jumpSound.play();
	
	}

///////////
if (keyCode === 32 && gameChar_y >= floorPos_y) { // Space key for jumping
	gameChar_y -= 100; // Jump height
}

}


function keyReleased()
{
	// if statements to control the animation of the character when
	// keys are released.

	console.log("keyReleased: " + key);
	console.log("keyReleased: " + keyCode);

	if (key == 'a')
	{
		console.log('left arrow');
		isLeft = false;
	} 
	
	if (key == 'b')
	{
		console.log('right arrow');
		isRight = false;
	}
}


function drawTrees()
	{
		for( i = 0; i < trees_x.length; i++){
	
		fill(205,133,63);
		rect(trees_x[i]- 25, treePos_y - 100, 50, 100);
	
		fill(46,139,87);
		triangle(trees_x[i] - 100, treePos_y - 150, trees_x[i], treePos_y - 250, trees_x[i] + 100, treePos_y - 150);
	
		fill(46,139,87);
		triangle(trees_x[i] - 100, treePos_y- 80, trees_x[i], treePos_y - 180, trees_x[i] + 100, treePos_y - 80);
		}
		
	}


function drawClouds()
	{

	for( i = 0; i < clouds.length; i++ )
	{
		r = 1.5
		ellipse(clouds[i] + random(-r, r) + 20,60 + random(-r, r) , 80,80);
		ellipse(clouds[i] + random(-r, r)  - 20, 60 + random(-r, r)  , 60, 60);
		ellipse(clouds[i] + random(-r, r)  + 60, 60 + random(-r, r) , 60, 60);
	}
	
	}

function drawMountains()
	{
		for( i = 0; i < mountains.length; i++)
		{
	 
		 fill(135,206,250, 250);
		 noStroke();
		 triangle(mountains[i] - 80, mountain.y_pos, mountains[i] + 20, mountain.y_pos - 152, mountains[i] + 120, mountain.y_pos);
	 
		 fill(255);
		 triangle(mountains[i] - 20, mountain.y_pos - 90, mountains[i] + 20, mountain.y_pos - 162, mountains[i] + 63, mountain.y_pos - 90);
	 
	 }

	}

	
function drawCollectable(t_collectable)
	{
		if(t_collectable.isFound == false)
		{

			fill(255, 255, 255, 160);
			ellipse(t_collectable.x_pos, t_collectable.y_pos - 23, t_collectable.size);
			fill(255,255,0);
			strokeWeight(1);
			beginShape();
			vertex(t_collectable.x_pos -15, t_collectable.y_pos - 20);
			vertex(t_collectable.x_pos +15, t_collectable.y_pos - 20);
			vertex(t_collectable.x_pos -10, t_collectable.y_pos  -38 );
			vertex(t_collectable.x_pos, t_collectable.y_pos  - 7);
			vertex(t_collectable.x_pos +10, t_collectable.y_pos - 38);
			vertex(t_collectable.x_pos -15, t_collectable.y_pos  -20);
			endShape();
			
			stroke('blue');
			strokeWeight(3);
			point(t_collectable.x_pos -3, t_collectable.y_pos -25);
			point(t_collectable.x_pos +3, t_collectable.y_pos - 25);
			
				noStroke();
				fill(255);
				text("collectable item", 300, 370);
		}
	}
	

	function checkCollectable(t_collectable)
	{
			if (dist(gameChar_x, gameChar_y, t_collectable.x_pos, t_collectable.y_pos) <= 20 ) 
		{
			t_collectable.isFound = true;
			game_score += 1;
		}

	}

		
		function drawCanyon(t_canyon)
		{
			if(dist(gameChar_x, gameChar_y, t_canyon.x_pos + 50, t_canyon.y_pos) < 550)
			{
				noStroke();
				fill(18, 63, 255);
				rect(t_canyon.x_pos, t_canyon.y_pos, t_canyon.width, 150);
			
			}

		
		}

		function checkCanyon(t_canyon)
		{
			if(dist(gameChar_x, gameChar_y, t_canyon.x_pos + 50, t_canyon.y_pos) < 40)
			{
				isPlummeting = true;
			
			}
		
			if(isPlummeting == true && gameChar_y >= floorPos_y) {
				gameChar_y += 1;
			} else {
				isPlummeting = false;
			}

		}


		function renderFlagpole()
		{
			push();
			strokeWeight(5);
			stroke(100)
			line(flagpole.x_pos, floorPos_y, flagpole.x_pos, floorPos_y - 250);
			fill(250, 0, 250);
			noStroke();

			if(flagpole.isReached)
			{
				rect(flagpole.x_pos, floorPos_y - 250, 50, 50);
			} else
			{
				rect(flagpole.x_pos, floorPos_y - 50, 50, 50);
			}
			pop();

		}

		function checkFlagpole()
		{
			var d = abs(gameChar_world_X - flagpole.x_pos);
			if(d < 20)
			{
				flagpole.isReached = true;
			}
		}

		
		
		function Enemy(x, y, range)
		{
			this.x = x;
			this.y = y;
			this.range = range;
	
			this.currentX = x;
			this.inc = 1;
	
			this.update = function()
			{
				this.currentX += this.inc;
	
				if(this.currentX >= this.x + this.range)
				{
					this.inc = -1;
				}
				else if(this.currentX < this.x)
				{
					this.inc = 1;
				}
			}

			this.draw = function () {
        this.update();
				noStroke();

        // Draw evil enemy
        push();
				translate(this.currentX, this.y);
        scale(this.inc, 1); // Flip the enemy when moving left

        // Legs
        fill(60, 60, 60);
        rect(-15, 20, 10, 20);
        rect(5, 20, 10, 20);

        // Body
        fill(60, 60, 60);
        ellipse(0, 0, 40, 60);

        // Eyes with evil-looking pupils
        fill(255);
        ellipse(-10, -15, 20, 30);
        ellipse(10, -15, 20, 30);
        fill(0);
        ellipse(-10, -15, 10, 20);
        ellipse(10, -15, 10, 20);

        // Eyebrows
        fill(0);
        rect(-15, -25, 10, 3);
        rect(5, -25, 10, 3);

        // Mouth
        fill(120, 0, 0);
        ellipse(0, 15, 20, 10);

        // Horns
        fill(100, 100, 100);
        triangle(-10, -30, 0, -40, 10, -30);

        // Hands
        fill(60, 60, 60);
        rect(-25, -10, 10, 30);
        rect(15, -10, 10, 30);
        pop();
			}
	
			this.checkContact = function(gameChar_x, gameChar_y)
			{
				var d = dist(gameChar_x, gameChar_y-10, this.currentX, this.y);
				if(d < 30)
				{
					return true;
				}
				return false;
	
			}
	
	
		}
	
	
		function checkPlayerDie()
		{
			if(gameChar_y > 570)
			{
				game_score --;
					if(game_score > 0 )
				{
					startGame();
				}
			}
		}


		

		function createPlatforms(x, y, length)
		{
			var p = {
				x: x,
				y: y,
				length: length,
				draw: function()
				{
					fill(250, 0, 250);
					rect(this.x, this.y, this.length, 20);
				},
				checkContact: function(gameChar_x, gameChar_y)
				{
					if(gameChar_x > this.x && gameChar_x < this.x + this.length)
					{
						var d = this.y - gameChar_y;
						if( d >= 0 && d < 5)
						{
							return true;
						}
					}
					return false;
				}
			}
			return p;
			

		
	}

	