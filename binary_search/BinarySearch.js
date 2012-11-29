var data = [];  //ordered array of values
    data[0] = 23;
    data[1] = 28;
    data[2] = 34;
    data[3] = 40;
    data[4] = 47;
    data[5] = 54;
    data[6] = 60;
    data[7] = 68;
    data[8] = 75;
    data[9] = 81;
    data[10] = 90;
    data[11] = 99;
    data[12] = 111;
    data[13] = 125;


    //get a reference to the canvas 
    var canvas = document.getElementById('canvas');
	 
    //get a reference to the drawing context 
    var c = canvas.getContext('2d');

    var searchResult = -1;  //index of search item (default is out of the array)
    var searchState = [];    //array of objects that contain "data" array "left" and "right" index values
    var stateIndex = 0;    //searchState's index
    var animateIndex = 0;  //index value used to "playback" the searchState array
    
    var canvasWidth = canvas.getAttribute("width");
    var canvasHeight = canvas.getAttribute("height");
    var canvasColor = "D1D9E8";
    var barColorNormal = "7D879B";
    var barColorResult = "EC8A6F";
    var barColorInitial = "2B9F7D";
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
	

    var drawResult = function(d, r) {     //similar to draw data, but highlights the search result
        clear(); 
        for (var i = 0; i < d.length; i++) { 
            var barValue = d[i];
            c.fillStyle = barColorNormal;
            if (i === r){
                c.fillStyle = barColorResult;
                c.fillRect(leftOffset + i * barSpacing, canvasHeight - barValue * heightMultiple - bottomOffset, barWidth, barValue * heightMultiple);
                c.fillStyle = labelColor;
                c.font = labelFont;
                c.fillText(barValue, i * barSpacing + barWidth / 2, canvasHeight - barValue * heightMultiple / 2 - bottomOffset);
            } else {
                c.fillRect(leftOffset + i * barSpacing, canvasHeight - barValue * heightMultiple - bottomOffset, barWidth, barValue * heightMultiple);
                c.fillStyle = labelColor;
                c.font = labelFont;
                c.fillText(barValue, i * barSpacing + barWidth / 2, canvasHeight - barValue * heightMultiple / 2 - bottomOffset); 
            }
        }
        document.getElementById("nextButton").disabled = true;
        document.getElementById("searchButton").disabled = false;
    };


    var animate = function() {                  //draw the appropriate frame each time the user clicks Next
        if(searchState[animateIndex] !== undefined) {
            drawData(data.slice(searchState[animateIndex].l, searchState[animateIndex].r));
            animateIndex++;
        } else {
        
            drawResult(data, searchResult);

            if (searchResult === -1) {
                document.getElementById("found").innerHTML = "";
                document.getElementById("not_found").innerHTML = "Sorry, the number you are looking for is not in the array.";
                document.getElementById("i").innerHTML = "<img src='i' />";
            } else {
                document.getElementById("not_found").innerHTML = "";
                document.getElementById("i").innerHTML = "";
                document.getElementById("found").innerHTML = "The number you are looking for is at array position: " + searchResult;
            }
        }
    };


    var binarySearch = function(searchTerm, data, left, right) {
        if (left > right)
            return -1;

        searchState[stateIndex] =  {             //stores the boundary indices of the relevant data each time the binary search function divides it
            l: left,
            r: right + 1
        };
        
        console.log("Relevant indices: " + searchState[stateIndex].l + ", " + searchState[stateIndex].r);
        console.log("Remaining data: " + data.slice(searchState[stateIndex].l, searchState[stateIndex].r));
        
        stateIndex++;
	 
        var mid = Math.round((left + right) / 2);
	 
        if (data[mid] === searchTerm) {
            return mid;
        } else if (data[mid] > searchTerm) {
            return binarySearch(searchTerm, data, left, mid - 1);
        } else {
            return binarySearch(searchTerm, data, mid + 1, right);
        }
    };


    var search = function(term) {
        console.log("Searching for " + term);
        searchResult = binarySearch(term, data, 0, data.length - 1);
        console.log("Search result: " + searchResult);
        document.getElementById("nextButton").disabled = false;
        document.getElementById("searchButton").disabled = true;
        drawData(data, barColorInitial);
    };


    var readForm = function() {                         //read the value of the text input field when the search button is clicked
        var search_term = document.search.term.value;
        search_term = parseInt(search_term, 10);        //parseInt is used to convert the search_term from a string to a number. The '10' parameter is the optional radix, though Crockford advises using it all the time to avoid octal confusion.
        search(search_term);
    };


    clear();    //initial clear to set the background color (I'm anal...)
    drawData(data, barColorInitial);
    document.getElementById("nextButton").disabled = true;
    
