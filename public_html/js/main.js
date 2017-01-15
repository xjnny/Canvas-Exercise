var canvas;
var stage;
var shape;
var radius = 10;
var colors = [{r:126,g:190,b:197}, {r:239,g:143,b:97}, {r:106,g:206,b:182}, {r:77,g:123,b:125},
{r:177,g:157,b:201}, {r:168,g:88,b:88}, {r:94,g:97,b:97}];
        //["#1D3998", "#EDE998", "#15F198", "#BD3117", "#3991D8", "#D33119", "#AAA811"];
var color;

function init() {
    canvas = document.getElementById('demoCanvas');
    stage = new createjs.Stage(canvas);
    
for (var i = 0; i < 25; i++) {
    shape = new createjs.Shape();
    color = colors[Math.floor(i%colors.length)];
    shape.graphics.beginFill('rgb('+color.r+','+color.g+','+color.b+')').drawCircle(0, 0, radius);
    
    shape.x = Math.random() * canvas.width;
    shape.y = Math.random() * canvas.height;
    shape.velX = Math.random() * 8 - 5;
    shape.velY = Math.random() * 8 - 5;

    // turn snapToPixel on for all shapes - it's set to false by default on Shape.
    // it won't do anything until stage.snapToPixelEnabled is set to true.
    shape.snapToPixel = true;

    stage.addChild(shape);
    shape.addEventListener("click", function (event) {
        alert("clicked"); });
}

// add a text object to output the current FPS:
	fpsLabel = new createjs.Text//("-- fps", "bold 18px Arial", "#FFF");
	stage.addChild;//(fpsLabel);
	fpsLabel.x = 10;
	fpsLabel.y = 20;

	// start the tick and point it at the window so we can do some work before updating the stage:
	createjs.Ticker.timingMode = createjs.Ticker.RAF;
	createjs.Ticker.addEventListener("tick", tick);
        
        }

function tick(event) {
	var w = canvas.width + radius * 2;
	var h = canvas.height + radius * 2;
	var l = stage.getNumChildren() - 1;

	// iterate through all the children and move them according to their velocity:
	for (var i = 1; i < l; i++) {
		var shape = stage.getChildAt(i);
		shape.x = (shape.x + radius + shape.velX + w) % w - radius;
		shape.y = (shape.y + radius + shape.velY + h) % h - radius;
	}

	fpsLabel.text = Math.round(createjs.Ticker.getMeasuredFPS()) + " fps";

	// draw the updates to stage:
	stage.update(event);
}

;
