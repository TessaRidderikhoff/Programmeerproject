timesClicked = 0;

function createMap() {


	// set default year
	var yearMap = "y2013"

	// set map properties
	margin = {top: 20, right: 20, bottom: 20, left: 20}
	mapWidth = 600;
	mapHeight = 300;

	// select the mapsvg and set width and height
	mapsvg = d3.select(".mapsvg");

	// create projection to create map of the world
	var projection = d3.geo.mercator()
      .scale(90)
      .translate([mapWidth / 2, mapHeight / 2])

    // use projection to create path
    var path = d3.geo.path()
      .projection(projection);
    
    // use geo json of the world to create map

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
			countryid = d.properties.admin;
			countryid = countryid.replace(/\s+/g, "");
			return countryid;
		})

		// colour country grey in case the country is not in obesity dataset
		.attr("fill", "rgb(211, 211, 211)")

	mapData = adultsObese;


	for (i = 0; i < mapData.length; i++) {
		// determine id of country in map
		countryId = "#" + mapData[i].Country

		// remove spaces from id
		countryId = countryId.replace(/\s+/g, "");

		// select this country in map
		d3.selectAll(countryId)
			.attr("fill", function() {
				// determine obesity score
				yearScore = mapData[i][yearMap]

				// fill if country has obesity data
				if (yearScore) {
					// determine the level of obesity
					colourScheme = Math.floor(yearScore / 5)
					
					// colour country according to how obese the population is
					return "rgb(255," + (200 - (colourScheme * 25)) + ", " + (200 - (colourScheme * 25)) + ")" 
				}
			})
			// give country the obesity score as attribute
			.attr("obesity", function(d) {
				d.properties.obesity = yearScore;
				return yearScore;
			})
			.attr("class", function() {
				return "index" + colourScheme + " country"
			})

		// create tooltip with country name and obesity score
		var countrytip = d3.tip()
			.attr('class', 'd3-tip')
			.offset([-10, 0])
			.html(function(d) {
				var countryObesity = d3.select("#" + d.properties.admin.replace(/\s+/g, "")).attr("obesity")
				return "<strong>Country: </strong> <span>" + d.properties.admin + 
				"</span> <br> <strong> Percentage obesity: </strong> <span>" +
				countryObesity
			})

		// call the tooltip
		mapsvg.call(countrytip);

	}

	// show the tooltip on mouseover (and hide after)
	countries
		.on("mouseover", function(d) {
			countrytip.show(d);

			var self = this;

			d3.selectAll(".country")
				.filter(function() {
					return self != this;
				})
				.style("opacity", 0.3);

			selectedCountry = d3.select(self);

			d3.selectAll("#" + selectedCountry.attr("id"))
				.style("stroke", "black")
				.style("stroke-width", 0.15);

			d3.selectAll(".dataPoints")
				.style("opacity", 0.2)

			d3.selectAll("#scatter" + selectedCountry.attr("id"))
				.style("opacity", 1)
		})
		.on("mouseout", function(d) {
			countrytip.hide(d);

			d3.selectAll(".country")
				.style("opacity", 1)
				.style("stroke", "white")
				.style("stroke-width", 0.05);

			d3.selectAll(".dataPoints")
				.style("opacity", 1)
		})
		.on("click", function(d) {
			timesClicked += 1
			if (timesClicked % 2 == 1) {
				updateSankey(d.properties.admin, yearMap.replace("y", ""), "sankeysvg")
			}
			else {
				updateSankey(d.properties.admin, yearMap.replace("y", ""), "secondsankeysvg")
			}
			
		})


	// create legend

	// create array that holds the number of categories for the legend
	legendColours = [0, 1, 2, 3, 4, 5, 6, 7, 8]

	// create element to hold legend
	legend = mapsvg.append("g")

	// determine width of legend
	legendWidth = mapWidth/2

	// create rectangles for legend for different colours
	legendrects = legend.selectAll("rect")
		.data(legendColours)
		.enter()
		.append("rect")
		.attr("width", legendWidth/(legendColours.length))
		.attr("height", 10)
		.attr("x", function(d, i) {
			return (mapWidth/2)-(legendWidth/2) + i * legendWidth/(legendColours.length)
		})
		.attr("y", mapHeight - 23)
		.style("fill", function(d, i) {
			return "rgb(255," + (200 - (i * 25)) + ", " + (200 - (i * 25)) + ")" 
		})
		.attr("class", function(d, i) {
			return "index" + i
		})

	legendTitles = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

	legendtext = legend.selectAll(".legendLabels")
		.data(legendTitles)
		.enter()
		.append("text")
		.attr("class", "legendLabels")
		.attr("x", function(d, i) {
			return (mapWidth/2)-(legendWidth/2) + i * legendWidth/(legendColours.length) - 5
		})
		.attr("y", mapHeight - 28)
		.text(function(d, i) {
			return i * 5
		})

	var legendTitle = legend
		.append("text")
		.attr("class", "legendTitle")
		
		.attr("y", mapHeight - 3)
		.text("Percentage obesity")

	var textwidth = d3.select(".legendTitle").node()
	    	.getBoundingClientRect()
	    	.width;

	legendTitle
		.attr("x", function() {
			return mapWidth/2 - textwidth/2
		})


	legendrects
		.on("mouseover", function(d) {
			var self = this

			mapsvg.selectAll(".country")
				.transition()
				.style("opacity", 0.3)
				.style("stroke", "white")
			mapsvg.selectAll("." + this.getAttribute('class'))
				.filter(function() {
					return self != this
				})
				.transition()
				.style("opacity", 1)
				.style("stroke", "black")
				.style("stroke-width", 0.15)

		})
		.on("mouseout", function() {
			mapsvg.selectAll(".country")
				.transition()
				.style("opacity", 1)
				.style("stroke", "white")
				.style("stroke-width", 0.05)
		})
}

function updateMap(year){

	yearMap = "y" + year;

	for (i = 0; i < mapData.length; i++) {
		// determine id of country in map
		countryId = "#" + mapData[i].Country

		// remove spaces from id
		countryId = countryId.replace(/\s+/g, "");

		// select this country in map
		d3.selectAll(countryId)
			.attr("fill", function() {
				// determine obesity score
				yearScore = mapData[i][yearMap]

				// fill if country has obesity data
				if (yearScore) {
					// determine the level of obesity
					colourScheme = Math.floor(yearScore / 5)
					
					// colour country according to how obese the population is
					return "rgb(255," + (200 - (colourScheme * 25)) + ", " + (200 - (colourScheme * 25)) + ")" 
				}
			})
			// give country the obesity score as attribute
			.attr("obesity", yearScore)
			.attr("class", function() {
				return "index" + colourScheme + " country"
			})
		}
}

function updateMapGender(gender) {

	// var year = "y" + year

	boxes = d3.selectAll(".form-check-input")
	checkedlist = [];

	for (i = 0; i <= boxes.length; i++) {
		checkedlist.push(boxes[0][i].checked)
	}

	if (checkedlist[0] == true && checkedlist[1] == false) {
		mapData = femalesObese;
	}
	else if (checkedlist[0] == false && checkedlist[1] == true) {
		mapData = malesObese;
	}
	else if (checkedlist[0] == true && checkedlist[1] == true) {
		mapData = adultsObese;
	}
	else {
		countries.attr("fill", "rgb(211, 211, 211)");
		return
	}

	countries
		.attr("fill", "rgb(211, 211, 211)")


	for (i = 0; i < mapData.length; i++) {
		// determine id of country in map
		countryId = "#" + mapData[i].Country

		// remove spaces from id
		countryId = countryId.replace(/\s+/g, "");

		// select this country in map
		d3.selectAll(countryId)
			.attr("fill", function() {
				// determine obesity score
				yearScore = mapData[i]["y" + year]

				// fill if country has obesity data
				if (yearScore) {
					// determine the level of obesity
					colourScheme = Math.floor(yearScore / 5)
					
					// colour country according to how obese the population is
					return "rgb(255," + (200 - (colourScheme * 25)) + ", " + (200 - (colourScheme * 25)) + ")" 
				}
			})
			// give country the obesity score as attribute
			.attr("obesity", yearScore)
			.attr("class", function() {
				return "index" + colourScheme + " country"
			})
		}
}