    var data = [67, 43, 50, 29, 37, 13, 80, 74, 47, 111, 26, 32, 58, 99, 21, 34, 95];     //array of data to be sorted


    //get a reference to the canvas 
    var canvas = document.getElementById('canvas');

    //get a reference to the drawing context 
    var c = canvas.getContext('2d');

    //get canvas dimensions
    var canvasWidth = canvas.getAttribute("width");
    var canvasHeight = canvas.getAttribute("height");

    var canvasColor = "BBDDF2";
    var barColorNormal = "0B3B59";
    var barWidth = 50;
    var barSpacing = 70;
    var leftOffset = 18;
    var bottomOffset = 2;
    var heightMultiple = 5;
    var labelColor = "E2F266";
    var labelFont = "16pt Lucida Sans";



    var clear = function() {                               //clears the canvas, sets the background color
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


    var bubbleSort = function(d) {                      //iterates through the array, compares values, moves higher value one position to the right...
        var len = d.length;
        var bound = len - 1;
        var newBound = 0;
        var temp;
        console.log("Starting array: " + d);
        for (var i = 1; i <= len; i++) {
            newBound = 0;
            for (var j = 0; j <= bound; j++) {
                if (d[j] > d[j +1 ]) {
                    temp = d[j];                        //if left value is greater than right value, use temp variable to swap the values
                    d[j] = d[j + 1];
                    d[j + 1] = temp;
                    newBound = j - 1;                   //keeps track of the last two values sorted, so it doesn't have to waste time comparing them again
                    console.log("Sorting... " + d);
                }
            }
            bound = newBound;
        }
        console.log("Sorted array: " + d);
        return d;
    };


    var sortData = function() {
        var sortedData = data.slice(0);
        sortedData = bubbleSort(sortedData);
        drawData(sortedData);
    };


    var reset = function() {
        console.log("Resetting data array.");
        drawData(data);
    };
    

    clear();                                            //initial clear to set the background
    drawData(data);
