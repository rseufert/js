    var data = [];     //array of data to be sorted


    //get a reference to the canvas 
    var canvas = document.getElementById('canvas');
	 
    //get a reference to the drawing context 
    var c = canvas.getContext('2d');

    //get canvas dimensions
    var canvasWidth = canvas.getAttribute("width");
    var canvasHeight = canvas.getAttribute("height");

    var canvasColor = "D1D9E8";
    var barColorNormal = "7D879B";
    var barWidth = 50;
    var barSpacing = 85;
    var leftOffset = 20;
    var bottomOffset = 2;
    var heightMultiple = 5;
    var labelColor = "white";
    var labelFont = "18pt sans-serif";
    

    var clear = function() {          //clears the canvas, sets the background color
        c.fillStyle = canvasColor;
        c.fillRect(0, 0, canvasWidth, canvasHeight);
    };

    var drawData = function(d, optionalColor) {          //need to draw the remaining elements in the data array
        optionalColor = (typeof optionalColor === "undefined") ? barColorNormal : optionalColor;
        clear(); 
        for (var i = 0; i < d.length; i++) { 
            var barValue = d[i];
            c.fillStyle = optionalColor;
            c.fillRect(leftOffset + i * barSpacing, canvasHeight - barValue * heightMultiple - bottomOffset, barWidth, barValue * heightMultiple);
            c.fillStyle = labelColor;
            c.font = labelFont;
            c.fillText(barValue, i * barSpacing + barWidth / 2, canvasHeight - barValue * heightMultiple / 2 - bottomOffset);
        }
    };

    clear();                                            //initial clear to set the background 
