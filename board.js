window.addEventListener('load', canvasApp, false);

function canvasApp () {
    var canvas = document.getElementById("pad");
    var ctx = canvas.getContext("2d");

	//clear
	var clear = document.getElementById("clear");
	
	//colors
	var black = document.getElementById("black");
	var red = document.getElementById("red");
	var blue = document.getElementById("green");
	var green = document.getElementById("blue");

	//line-weight
	var thin = document.getElementById("thin");
	var med = document.getElementById("medium");
	var thick = document.getElementById("thick");

	//shapes
	var point = document.getElementById("point");
	var line = document.getElementById("line");
	var circle = document.getElementById("circle");

    var pixels = {};
	
	//states
	var current_color = 'black';
	var curr_line_width = 3;
	var shape = 'point';
	var positionX = 0;
	var positionY = 0;

    var pixels = {}

    init();


    function init () {
        initPixels(pixels);

        var mouseState = {
			beginShape : false,
            isDown: false,
            previous: null
        };
        canvas.addEventListener('mousedown', eventMouseDown.bind(null, mouseState), false);
        canvas.addEventListener('mousemove', eventMouseMove.bind(null, mouseState), false);
        canvas.addEventListener('mouseup',   eventMouseUp.bind(null, mouseState), false);

		//colors
		red.addEventListener('click', function () {
					current_color = this.id;
    				});
		black.addEventListener('click', function () {
					current_color = this.id;
    				});
		green.addEventListener('click', function () {
					current_color = this.id;
    				});
		blue.addEventListener('click', function () {
					current_color = this.id;
    				});

		//stroke
		thin.addEventListener('click', function () {
					curr_line_width = 1;
    				});
		med.addEventListener('click', function () {
					curr_line_width = 3;
    				});
		thick.addEventListener('click', function () {
					curr_line_width = 5;
    				});

		point.addEventListener('click', function () {
					shape = this.id;
    				});
		line.addEventListener('click', function () {
					shape = this.id;
					console.log(shape);
    				});
		circle.addEventListener('click', function () {
					shape = this.id;
    				});

		//clear
		clear.addEventListener('click', function () {
					canvas.width = canvas.width;
    				});

    }

    function initPixels (pixels) {
        var pixelData;

        pixels["black"] = createPixel(ctx, 0, 0, 0, 255);


        pixels["black"] = createPixel(ctx, 0, 0, 0, 255);
    }

    function createPixel (ctx, red, green, blue, alpha) {
        var pixelData = ctx.createImageData(1, 1);
		ctx.lineWidth = curr_line_width;
		ctx.strokeStyle = current_color;
        pixelData.data[0] = red;
        pixelData.data[1] = green;
        pixelData.data[2] = blue;
        pixelData.data[3] = alpha;

        return pixelData;
    }


    // --------------------------------------------------
    // Event handlers
    // --------------------------------------------------
	
	//gets text input
	$('#submit-text').click(function(){
		console.log('clicked');
		var textData = document.getElementById('text-data').value;
		document.getElementById('text-data').value = '';
		console.log(textData);
		ctx.font="15px Helvetica";
		ctx.fillText(textData, 10, 50);
	});

    function eventMouseDown (state, e) {
        var mouse = getMousePosition(e);
		if (!state.beginShape) {
			state.beginShape = !state.beginShape;
			positionX = mouse.x;
			positionY = mouse.y;
			ctx.moveTo(mouse.x, mouse.y);
			console.log('started new shape');
		}
		initPixels(pixels);
        state.isDown = true;
        drawPixel(ctx, mouse.x, mouse.y, "black");
        state.previous = { x: mouse.x, y: mouse.y };

		if (shape === 'line') {
			ctx.beginPath();
		}
		
    }

    function eventMouseMove (state, e) {
        if (!state.isDown) return;

        var mouse = getMousePosition(e);
        
		if (shape === 'point'){
			ctx.beginPath();
		    ctx.moveTo(state.previous.x, state.previous.y);
		    ctx.lineTo(mouse.x, mouse.y);
		    ctx.stroke();
		}

		if (shape === 'line'){
		    ctx.lineTo(mouse.x, mouse.y);
		    ctx.stroke();
		}

        state.previous = { x: mouse.x, y: mouse.y };
    }

    function eventMouseUp (state, e) {
        state.previous = null;
        state.isDown = false;
    }

    // Helper function to get mouse event positions
    function getMousePosition (e) {
        var scroll = getScrollOffsets();
        var mouseX = e.clientX + scroll.x - canvas.offsetLeft;
        var mouseY = e.clientY + scroll.y - canvas.offsetTop;

        return { x: mouseX, y: mouseY };
    }

    // From David Flanagan's JavaScript: The Definitive Guide (6e)
    // See Example 15-8 (page 391) for more details
    // ------------------------------------------------------------
    // Return the current scrollbar offsets as the x and y properties of an object
    function getScrollOffsets(w) {
        // Use the specified window or the current window if no argument
        w = w || window;

        // This works for all browsers except IE versions 8 and before
        if (w.pageXOffset != null) return {x: w.pageXOffset, y:w.pageYOffset};

        // For IE (or any browser) in Standards mode
        var d = w.document;
        if (document.compatMode == "CSS1Compat") {
            return {x:d.documentElement.scrollLeft, y:d.documentElement.scrollTop};
        }

        // For browsers in Quirks mode
        return { x: d.body.scrollLeft, y: d.body.scrollTop };
    }


    // --------------------------------------------------
    // Drawing code
    // --------------------------------------------------

    function drawPixel (context, x, y, color) {
        pixel = pixels[color];
        context.putImageData(pixel, x, y);
    }

    function drawScreen () {
        drawPixel(ctx, 5,7, "black");
    }
}
