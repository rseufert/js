var data = [];
	data[0] = 23;
	data[1] = 28;
	data[2] = 34;
	data[3] = 40;
	data[4] = 47;
	data[5] = 54;
	data[6] = 60;
	data[7] = 68;
	data[8] = 75;

	//var colors = ["white", "green", "orange", "blue", "red", "yellow"];
	//var color_index = 0;

	//get a reference to the canvas 
	var canvas = document.getElementById('canvas'); 
	 
	//get a reference to the drawing context 
	var c = canvas.getContext('2d'); 
	//draw background

	var searchResult = -1;


	function clear(){
		c.fillStyle = "D1D9E8"; 
		c.fillRect(0,0,1000,500);
	}
	//c.globalCompositeOperation = "xor";
	//c.save();

	function drawData(d){
		//draw data
		//c.restore();
		clear();
		c.fillStyle = "7D879B"; 
		for(var i=0; i<d.length; i++) { 
			var dp = d[i]; 
			c.fillRect(25 + i*100, 500-dp*5 - 30 , 50, dp*5); 
		}
	}
	
	function drawResult(d, r){
		//draw result
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



	function binarySearch(searchTerm, data, left, right) 
	{
		var drawChange = function(){	
			dataChange = data.slice(left, right+1);
			console.log(dataChange);
			//drawData(dataChange);
		};
		//window.setTimeout(drawChange, 2000);
		drawChange();

		
		if (left > right)
			return -1;
	 
		var mid = parseInt((left + right)/2);
	 
		if (data[mid] === searchTerm) {
			return mid;
		} else if (data[mid] > searchTerm) {
			return binarySearch(searchTerm, data, left, mid-1);
		} else if (data[mid] < searchTerm) {
			return binarySearch(searchTerm, data, mid+1, right);
		}
	}

	function search(){
		var result = binarySearch(34, data, 0, data.length - 1);
		console.log(result);
		drawResult(data, result);
		if (result === -1) {
			document.write("<b>Sorry, the number you are looking for is not in the array.</b>");
		} else {
			document.write("<b>The number you are looking for is at array position: </b>"+ result);
			}
	}
	
	document.write("<h2>Binary Search</h2>");
	clear();
	drawData(data);
	search();