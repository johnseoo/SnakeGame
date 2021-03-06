window.onload = function() {
	var gameCanvas = document.getElementById("gameCanvas");
	var ctx = gameCanvas.getContext("2d");
	var snakeWidth = 20;
	var snakeHeight = 20;
	
	var direction = "right";

	document.addEventListener("keydown",getDirection);
	function getDirection(event) {
		if(event.keyCode == 37 && direction != "right") {
			direction = "left";
		}else if(event.keyCode == 38 && direction != "down") {
			direction = "up";
		}else if(event.keyCode == 39 && direction != "left") {
			direction = "right";
		}else if(event.keyCode == 40 && direction != "up") {
			direction = "down";
		}
	}

	function clearCanvas(){
		
		ctx.clearRect(0,0,gameCanvas.width,gameCanvas.height);
		ctx.fillStyle = "black";
		ctx.fillRect(0,0,gameCanvas.width,gameCanvas.height);
	}

	function drawSnake(x,y){
		
		ctx.fillStyle = "green";
		ctx.fillRect(x*snakeWidth,y*snakeHeight,snakeWidth,snakeHeight);
		ctx.fillStyle = "white";
		ctx.strokeRect(x*snakeWidth,y*snakeHeight,snakeWidth,snakeHeight);
	}
	//length of starting snake
	var len = 1;
	//empty array to move snake
	var snake = [];
	for(var i = len-1; i>=0;i--) {
		snake.push(
			{x:i,
			 y:0
			}
		);
	}
	food = {
		x:Math.round(Math.random()*(gameCanvas.width/snakeWidth)+1),
		y:Math.round(Math.random()*(gameCanvas.height/snakeHeight)+1)
	}
	function drawFood(x,y) {
		ctx.fillStyle = "red";
		ctx.fillRect(x*snakeWidth,y*snakeHeight,snakeWidth,snakeHeight);
	}
	function draw(){
		clearCanvas();

		for(var i = 0;i<snake.length;i++){
			var x = snake[i].x;
			var y = snake[i].y;
			drawSnake(x,y);
		}
		//drawFood
		drawFood(food.x,food.y);
		var snakeX = snake[0].x;
		var snakeY = snake[0].y;
		if(snakeX < 0 || snakeY < 0 || snakeX >= gameCanvas.width/snakeWidth || snakeY >= gameCanvas.height/snakeHeight) {
		
			location.reload();
		}
		
		if(direction == "right") snakeX++;
		else if(direction == "left") snakeX--;
		else if(direction == "down") snakeY++;
	 	else if(direction == "up") snakeY--;
		
		if(snakeX == food.x && snakeY == food.y){
			food = {
				x:Math.round(Math.random()*(gameCanvas.width/snakeWidth)+1),
				y:Math.round(Math.random()*(gameCanvas.height/snakeHeight)+1)
			}
			console.log(snake)
			
			var newHead = {
					x:snakeX,
					y:snakeY
			};
			console.log(snake)
		}else{
			//remove the last snake part
			snake.pop();
			var newHead = {
					x:snakeX,
					y:snakeY
				};
	}
		snake.unshift(newHead);
	}
	
	setInterval(draw,100);
}
