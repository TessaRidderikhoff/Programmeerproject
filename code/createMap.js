/******************************************************************************

createMap.js
Tessa Ridderikhoff
10759697
June 2018

This script contains a function for creating a world map, coloured according to
the obesity prevalence in each country. It also contains two update functions
for the map, for different years and for the displaying of the genders. 

******************************************************************************/

// count number of times a country is selected (for sankey update)
var timesClicked = 0;

// set default year
var yearMap = "y2013"

function createMap() {
/* This function creates a world map with coloured countries according to obesity
data. */

	// select the mapsvg
	mapsvg = d3.select(".mapsvg");

	// select map properties
	mapWidth = Number(mapsvg.attr("width"));
	mapHeight = Number(mapsvg.attr("height"));

	// create projection to create map of the world
	var projection = d3.geo.mercator()
      .scale(90)
      .translate([mapWidth / 2, mapHeight / 2])

    // use projection to create path
    var path = d3.geo.path()
      .projection(projection);

	// append g element to svg to hold the map
	countryGroup = mapsvg.append("g").attr("id", "map");

	// create map
	countries = countryGroup
		.selectAll("path")
		.data(geojson.features)
		.enter()
		.append("path")
		.attr("d", path)

		// set id of country to name of country (without spaces)
		.attr("id", function(d) {
			var countryid = d.properties.admin;
			countryid = countryid.replace(/\s+/g, "");
			return countryid;
		})

		// colour country grey in case the country is not in obesity dataset
		.attr("fill", "rgb(211, 211, 211)")

	// select default data (male and female)
	mapData = adultsObese;

	// colour map with obesity data
	colourMap();

	// create tooltip with country name and obesity score
	var countrytip = d3.tip()
		.attr('class', 'd3-tip')
		.offset(function(d) {
	    	
			// determine y-location of country (to see if it falls of the map)
	    	countryY = d3.select("#" + d.properties.admin.replace(/\s+/g, "")).node()
	    		.getBoundingClientRect()
	    		.y;

	    	// check if tooltip would fall of the map
	    	if (countryY < 100) {

	    		// determine height of country
		    	countryHeight = d3.select("#" + d.properties.admin.replace(/\s+/g, "")).node()
		    		.getBoundingClientRect()
		    		.height;

		    	// put tooltip at bottom of country on map
	    		return [countryHeight + 40, 0]
	    	}

	    	// if tooltip wouldn't fall of map
	    	else {
				
	    		// put tooltip 10 pixels above country on map
				return [-10, 0]
			}
		})
		.html(function(d) {

			// determine obesity percentage of hovered-over country
			var countryObesity = d3.select("#" + d.properties.admin.replace(/\s+/g, "")).attr("obesity")
			
			// display name and obesity percentage in tooltip
			return "<strong>Country: </strong> <span>" + d.properties.admin + 
			"</span> <br> <strong> Percentage obesity: </strong> <span>" +
			countryObesity
		})

	mapsvg.call(countrytip);

	// set instructions for countries on mouse over
	countries
		.on("mouseover", function(d) {
			countrytip.show(d);

			var self = this;

			// reduce opacity of all other countries
			d3.selectAll(".country")
				.filter(function() {
					return self != this;
				})
				.style("opacity", 0.3);

			selectedCountry = d3.select(self);

			// give selected country a black border
			d3.selectAll("#" + selectedCountry.attr("id"))
				.style("stroke", "black")
				.style("stroke-width", 0.15);

			// select dots in scatterplot and reduce opacity
			d3.selectAll(".dataPoints")
				.style("opacity", 0.2)

			// restore opacity of dot of selected country back to 1
			d3.selectAll("#scatter" + selectedCountry.attr("id"))
				.style("opacity", 1)
		})

		// restore settings on mouse out
		.on("mouseout", function(d) {
			countrytip.hide(d);

			// restore opacity and border-colour of all countries on map
			d3.selectAll(".country")
				.style("opacity", 1)
				.style("stroke", "white")
				.style("stroke-width", 0.05);

			// restore opacity of all dots in scatterplot
			d3.selectAll(".dataPoints")
				.style("opacity", 1)
		})

		// set instructions when clicked on a country in the map
		.on("click", function(d) {
			
			// add click to counter
			timesClicked += 1

			// if click-counter is uneven, create sankey diagram in first sankey-svg
			if (timesClicked % 2 == 1) {
				updateSankey(d.properties.admin, yearMap.replace("y", ""), "sankeysvg")
			}

			// if counter is even, create sankey diagram in second sankey-svg
			else {
				updateSankey(d.properties.admin, yearMap.replace("y", ""), "secondsankeysvg")
			}
		})


	/* create legend */

	// create array that holds the number of categories for the legend
	var legendColours = [0, 1, 2, 3, 4, 5, 6, 7, 8]

	// create element to hold legend
	var legend = mapsvg.append("g")

	// determine width of legend
	var legendWidth = mapWidth/2

	// create rectangles for legend for different colours
	var legendrects = legend.selectAll("rect")
		.data(legendColours)
		.enter()
		.append("rect")

		// width of each rect is dependent on number of categories
		.attr("width", legendWidth/(legendColours.length))
		.attr("height", 10)

		// legend is placed in the middle of the map
		.attr("x", function(d, i) {
			return (mapWidth/2)-(legendWidth/2) + i * legendWidth/(legendColours.length)
		})
		.attr("y", mapHeight - 23)

		// fill legend (same as countries)
		.style("fill", function(d, i) {
			return "rgb(255," + (200 - (i * 25)) + ", " + (200 - (i * 25)) + ")" 
		})

		// assign level of obesity (index) as class to rect (same as countries)
		.attr("class", function(d, i) {
			return "index" + i
		})

	// array for number of labels for legend
	var legendTitles = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

	// create labels for the legend
	var legendtext = legend.selectAll(".legendLabels")
		.data(legendTitles)
		.enter()
		.append("text")
		.attr("class", "legendLabels")
		.attr("x", function(d, i) {
			return (mapWidth/2)-(legendWidth/2) + i * legendWidth/(legendColours.length) - 5
		})
		.attr("y", mapHeight - 28)
		
		// label is the number of the label times 5
		.text(function(d, i) {
			return i * 5
		})

	// create title for legend
	var legendTitle = legend
		.append("text")
		.attr("class", "legendTitle")
		.attr("y", mapHeight - 3)
		.text("Percentage obesity")

	// determine width of legend title
	var textwidth = d3.select(".legendTitle").node()
	    	.getBoundingClientRect()
	    	.width;

	// put title in the middle of the map (and middle of legend)
	legendTitle
		.attr("x", function() {
			return mapWidth/2 - textwidth/2
		})

	// set instructions for mouse-over of rectangles of legend
	legendrects
		.on("mouseover", function(d) {
			var self = this

			// reduce opacity of all countries and set all stroke-colours to 
			// white (default)
			mapsvg.selectAll(".country")
				.transition()
				.style("opacity", 0.3)
				.style("stroke", "white")

			// select countries with the same level of obesity as the rectangle 
			// selected in the legend
			mapsvg.selectAll("." + this.getAttribute('class'))

				// don't include the rectangle itself
				.filter(function() {
					return self != this
				})
				.transition()

				// restore opacity to 1 of selected countries
				.style("opacity", 1)

				// give selected countries black borders
				.style("stroke", "black")
				.style("stroke-width", 0.15)

		})

		// restore settings on mouse out
		.on("mouseout", function() {
			mapsvg.selectAll(".country")
				.transition()
				.style("opacity", 1)
				.style("stroke", "white")
				.style("stroke-width", 0.05)
		})
}

function updateMap(year){
/* This function selects the data of another year (selected by the slider) */

	yearMap = "y" + year;

	// colour map with data of this year
	colourMap();
}

function updateMapGender(gender) {
/* This function selects the dataset for obesity in males, females or both
(selected by checkboxes) */

	// select checkboxes
	var boxes = d3.selectAll(".form-check-input")

	// create array to hold which boxes are checked
	var checkedlist = [];

	// store whether boxes are checked
	for (i = 0; i <= boxes.length; i++) {
		checkedlist.push(boxes[0][i].checked)
	}

	// if only female checkbox is checked
	if (checkedlist[0] == true && checkedlist[1] == false) {
		
		// select female obesity data
		mapData = femalesObese;
	}

	// if only male checkbox is checked
	else if (checkedlist[0] == false && checkedlist[1] == true) {
		
		// select male obesity data
		mapData = malesObese;
	}
	
	// if both boxes are checked
	else if (checkedlist[0] == true && checkedlist[1] == true) {
		
		// select obesity for all adults
		mapData = adultsObese;
	}
	
	// if no boxes are checked
	else {
		
		// colour all countries grey (the no-data colour)
		countries.attr("fill", "rgb(211, 211, 211)");
		
		// exit this function
		return
	}

	// colour map with new dataset
	colourMap();
}

function colourMap() {
/* This function colours the world map according to obesity data */

	// colour all countries grey in case no data is available
	countries
		.attr("fill", "rgb(211, 211, 211)")

	// loop through obesity data for each country
	for (i = 0; i < mapData.length; i++) {

		// determine id of country in map
		countryId = "#" + mapData[i].Country

		// remove spaces from id
		countryId = countryId.replace(/\s+/g, "");

		// select this country in map
		d3.selectAll(countryId)
			.attr("fill", function() {

				// determine obesity score (of new year)
				yearScore = mapData[i][yearMap]

				// fill if country has obesity data
				if (yearScore) {

					// determine the level of obesity
					colourScheme = Math.floor(yearScore / 5)
					
					// colour country according to how obese the population is
					return "rgb(255," + (200 - (colourScheme * 25)) + ", " + (200 - (colourScheme * 25)) + ")" 
				}
			})

			// update obesity attribute of country to obesity score of this year
			.attr("obesity", yearScore)

			// update class to new level of obesity
			.attr("class", function() {
				return "index" + colourScheme + " country"
			})
	}
} 