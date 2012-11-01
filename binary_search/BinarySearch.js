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
    //draw background

    var searchResult = -1;  //index of search item (default is out of the array)
    var searchState = [];    //array of "data" array states
    var stateIndex = 0;    //searchState's index
    var animateIndex = 0;   //used to "playback" the values in searchState


    function clear() {          //clears the canvas
        c.fillStyle = "D1D9E8";
        c.fillRect(0,0,1000,500);
    }


    function drawData(d) {          //draw data
        clear();
        c.fillStyle = "7D879B"; 
        for(var i=0; i<d.length; i++) { 
            var dp = d[i]; 
            c.fillRect(25 + i*100, 500-dp*5 - 30 , 50, dp*5); 
        }
    }
	
    function drawResult(d, r) {     //draws all of the data with the search result highlighted
        clear();
        c.fillStyle = "7D879B"; 
        for(var i=0; i<d.length; i++) { 
            var dp = d[i]; 
            if (i === r){
                c.fillStyle = "EC8A6F";
                c.fillRect(25 + i*100, 500-dp*5 - 30 , 50, dp*5);
                c.fillStyle = "7D879B";
            } else {
                c.fillRect(25 + i*100, 500-dp*5 - 30 , 50, dp*5); 
            }
        }
    }



    function binarySearch(searchTerm, data, left, right) {  //recurse binary search function
        function storeState() {                            //stores the state of the data each time the binary search function divides it
            searchState[stateIndex] = data.slice(left, right+1);
            console.log(searchState[stateIndex]);
            stateIndex++;
        };
		
        if (left > right)
            return -1;
	 
        var mid = parseInt((left + right)/2);
	 
        if (data[mid] === searchTerm) {
            storeState();
            return mid;
        } else if (data[mid] > searchTerm) {
            storeState();
            return binarySearch(searchTerm, data, left, mid-1);
        } else {
            storeState();
            return binarySearch(searchTerm, data, mid+1, right);
        }
    }


    function search() {             //calls binarySearch then animates the results
        function animate() {        //iterates through the array of changes and draws each state
            if(animateIndex < stateIndex) {
                for(var i=0; i<searchState[animateIndex].length; i++) {
                    drawData(searchState[animateIndex]);
                }
                animateIndex++;
            } else {
                drawResult(data, result);
                window.clearInterval(intId);
            }
        }

        var result = binarySearch(75, data, 0, data.length - 1);
        console.log(result);
        var intId = window.setInterval(animate, 1750);
        if (result === -1) {
            document.write("<br /><br /> <b>***Spoiler Alert*** Sorry, the number you are looking for is not in the array.</b> \n");
            document.write("<br /><br /> <img src='i' />");
        } else {
            document.write("<br /><br /> <b>***Spoiler Alert*** The number you are looking for is at array position: " + result + "</b>");
        }
    }
	
    clear();    //initial clear to set the background color (I'm anal...)
    search();   //Makes magics happens!!1