//function init() {
//    var stage = new createjs.Stage('demoCanvas');
//    var circle = new createjs.Shape();
//    circle.graphics.beginFill('#1D3998').drawCircle(0, 0, 50);
//    circle.x = 100;
//    circle.y = 100;
//    stage.addChild(circle);
//    stage.update();
//
//    createjs.Tween.get(circle, {loop: true})
//            .to({x: 400}, 1000, createjs.Ease.getPowInOut(4))
//            .to({alpha: 0, y: 175}, 500, createjs.Ease.getPowInOut(2))
//            .to({alpha: 0, y: 225}, 100)
//            .to({alpha: 1, y: 200}, 500, createjs.Ease.getPowInOut(2))
//            .to({x: 100}, 800, createjs.Ease.getPowInOut(2));
//
//    createjs.Ticker.setFPS(60);
//    createjs.Ticker.addEventListener("tick", stage);
//};



var canvas;
var stage;
var shape;
var radius = 10;
var rings = 1;

function init() {
	// create a new stage and point it at our canvas:
	canvas = document.getElementById("demoCanvas");
	stage = new createjs.Stage(canvas);

	// create a large number of slightly complex vector shapes, and give them random positions and velocities:

	var colors = ["#1D3998"];

	for (var i = 0; i < 25; i++) {
		shape = new createjs.Shape();
		for (var j = rings; j > 0; j--) {
			shape.graphics.beginFill(colors[Math.random() * colors.length | 0]).drawCircle(0, 0, radius * j / rings);
		}
		shape.x = Math.random() * canvas.width;
		shape.y = Math.random() * canvas.height;
		shape.velX = Math.random() * 8 - 5;
		shape.velY = Math.random() * 8 - 5;

		// turn snapToPixel on for all shapes - it's set to false by default on Shape.
		// it won't do anything until stage.snapToPixelEnabled is set to true.
		shape.snapToPixel = true;

		stage.addChild(shape);
                shape.addEventListener("click", function(event) { alert("clicked"); });

                
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


//(function(){
//    var stage;
//    var circles;
//    var colors = [{r:126,g:190,b:197}, {r:239,g:143,b:97}, {r:106,g:206,b:182}, {r:77,g:123,b:125},
//        {r:177,g:157,b:201}, {r:168,g:88,b:88}, {r:94,g:97,b:97}];
//
//    function init() {
//        initStage();
//        initCircles();
//        moveCircles();
//        animate();
//    }
//
//    function initStage() {
//        stage = new createjs.Stage("stage");
//        stage.canvas.width = window.innerWidth;
//        stage.canvas.height = window.innerHeight;
//    }
//
//    function initCircles() {
//        circles = [];
//        var n = stage.canvas.width*stage.canvas.height/700;
//        for(var i=0; i<n; i++) {
//            var circle = new createjs.Shape();
//            var r = 2 + Math.random()*6;
//            var x = Math.random()*stage.canvas.width;
//            var y = Math.random()*stage.canvas.height;
//            var color = colors[Math.floor(i%colors.length)];
//            var alpha = 0.2 + Math.random()*0.5;
//            circle.alpha = alpha;
//            circle.radius = r;
//            circle.graphics.beginFill('rgb('+color.r+','+color.g+','+color.b+')').drawCircle(0, 0, r);
//            circle.x = x;
//            circle.y = y;
//            circles.push(circle);
//            stage.addChild(circle);
//        }
//    }
//
//    function animate() {
//        /*createjs.Ticker.addEventListener("tick", handleTick);*/
//        handleTick();
//        requestAnimationFrame(animate);
//        
//    }
//
//    function moveCircles() {
//        for(var i= 0, l=circles.length; i<l; i++) {
//            shiftCircle(circles[i]);
//        }
//    }
//
//    function shiftCircle(c) {
//        var x = -100 + Math.random()*200;
//        var y = -100 + Math.random()*200;
//        var delay = Math.random()*1.5;
//        var radius = 2 + Math.random()*6;
//        var scale = radius/c.radius;
//        var a = 0.2 + Math.random()*0.5;
//        TweenLite.to(c, 1.3, {x: c.x + x, y: c.y + y, scaleX: scale, scaleY: scale, alpha: a, ease:Quad.easeInOut,
//            delay: delay, onComplete: function() {
//            shiftCircle(c);
//        }});
//    }
//
//    function handleTick(event) {
//        stage.update();
//    }
//
//    window.onload = function() { init() };
//})();