


nv.addGraph(function() {
  var chart = nv.models.discreteBarChart()
      .x(function(d) { return d.label })
      .y(function(d) { return d.value })
      .staggerLabels(false)
      .tooltips(false)
      .showValues(true)

  d3.select('#chart svg')
      .datum(gadgetData())
    .transition().duration(500)
      .call(chart);

  nv.utils.windowResize(chart.update);

  return chart;
});







function gadgetData() {
 return  [ 
    {
      key: "Percent Change In Sales",
      values: [
        { 
          "label" : "iPhone" ,
          "value" : 31
        } , 
        { 
          "label" : "Android" , 
          "value" : 17.3
        } , 
        { 
          "label" : "Camcorders" , 
          "value" : -43
        } , 
        { 
          "label" : "Digital Picture Frames" , 
          "value" : -38
        } , 
        { 
          "label" : "GPS" ,
          "value" : -33
        } , 
        { 
          "label" : "MP3 Players" , 
          "value" : -21
        } , 
        { 
          "label" : "Cameras" , 
          "value" : -21
        } , 
		{ 
          "label" : "Desktop PCs" , 
          "value" : -2
        } , 
        { 
          "label" : "Laptops" , 
          "value" : -5
        }
      ]
    }
  ];
}

