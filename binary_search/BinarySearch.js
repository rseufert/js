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


    //get a reference to the canvas 
    var canvas = document.getElementById('canvas');
	 
    //get a reference to the drawing context 
    var c = canvas.getContext('2d');

    var searchResult = -1;  //index of search item (default is out of the array)
    var searchState = [];    //array of "data" array states
    var stateIndex = 0;    //searchState's index
    var animateIndex = 0;   //used to "playback" the values in searchState


    var clear = function() {          //clears the canvas, sets the background color
        c.fillStyle = "D1D9E8";
        c.fillRect(0, 0, 1000, 500);
    };


    var drawData = function(d) {          //need to draw the remaining elements in the data array
        clear();
        c.fillStyle = "7D879B"; 
        for(var i = 0; i < d.length; i++) { 
            var dp = d[i]; 
            c.fillRect(25 + i*100, 500 - dp*5 - 30, 50, dp*5); 
        }
    };
	

    var drawResult = function(d, r) {     //similar to draw data, but highlights the search result
        clear();
        c.fillStyle = "7D879B"; 
        for(var i = 0; i < d.length; i++) { 
            var dp = d[i]; 
            if (i === r){
                c.fillStyle = "EC8A6F";
                c.fillRect(25 + i*100, 500 - dp*5 - 30, 50, dp*5);
                c.fillStyle = "7D879B";
            } else {
                c.fillRect(25 + i*100, 500 - dp*5 - 30, 50, dp*5); 
            }
        }
    };


    var animate = function() {        //draw the appropriate frame each time the user clicks Next
        if(animateIndex < stateIndex) {
            for(var i = 0; i < searchState[animateIndex].length; i++) {
                drawData(searchState[animateIndex]);
            }
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

        searchState[stateIndex] = data.slice(left, right + 1);    //stores the state of the data each time the binary search function divides it
        console.log(searchState[stateIndex]);
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
        console.log(searchResult);
        document.getElementById("next").innerHTML = "<button onclick='animate();'>Next</button>";
    };


    var readForm = function() {                         //read the value of the text input field when the search button is clicked
        var search_term = document.search.term.value;
        search_term = parseInt(search_term, 10);        //parseInt is used to convert the search_term from a string to a number. The '10' parameter is the optional radix, though Crockford advises using it all the time to avoid octal confusion.
        search(search_term);
    };


    clear();    //initial clear to set the background color (I'm anal...)
    document.getElementById("search").innerHTML = "<form name='search'>Search: <input type='text' id='term' name='term'></form><button name='searchButton' onclick='readForm();'>Search</button>";