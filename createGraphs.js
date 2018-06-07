window.onload = function() {

	// wait for all datasets to load
	d3.queue()
		.defer(d3.json, "sources/custom.geo.json")
		.defer(d3.json, "sources/AdultsObese.json")
		.awaitAll(createMap);
}

function createMap(error, loadedJSONs) {
	if (error) throw error;

	geojson = loadedJSONs[0]
	adultsObese = loadedJSONs[1]

	// set default year
	year = "y2016"

	// set map properties
	margin = {top: 20, right: 20, bottom: 20, left: 20}
	mapWidth = 600;
	mapHeight = 300;

	// select the mapsvg and set width and height
	mapsvg = d3.select(".mapsvg");
		// .attr("width", mapWidth)
		// .attr("height", mapHeight);

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

	console.log(adultsObese.length)
	for (i = 0; i < adultsObese.length; i++) {
		// determine id of country in map
		countryId = "#" + adultsObese[i].Country

		// remove spaces from id
		countryId = countryId.replace(/\s+/g, "");

		// select this country in map
		d3.selectAll(countryId)
			.attr("fill", function() {
				// determine obesity score
				yearScore = adultsObese[i][year]

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

		// create tooltip with country name and obesity score
		var countrytip = d3.tip()
			.attr('class', 'd3-tip')
			.offset([-10, 0])
			.html(function(d) {
				return "<strong>Country: </strong> <span>" + d.properties.admin + 
				"</span> <br> <strong> Percentage obesity: </strong> <span>" +
				d3.select(this).attr('obesity')
			})

		// call the tooltip
		mapsvg.call(countrytip);

	}

	// show the tooltip on mouseover (and hide after)
	countries
		.on("mouseover", countrytip.show)
		.on("mouseout", countrytip.hide)


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
		.attr("y", mapHeight - 10)
		.style("fill", function(d, i) {
			return "rgb(255," + (200 - (i * 25)) + ", " + (200 - (i * 25)) + ")" 
		})
		.attr("class", function(d, i) {
			return "index" + i
		})

	legendTitles = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

	legendtext = legend.selectAll("text")
		.data(legendTitles)
		.enter()
		.append("text")
		.attr("x", function(d, i) {
			return (mapWidth/2)-(legendWidth/2) + i * legendWidth/(legendColours.length) - 5
		})
		.attr("y", mapHeight - 15)
		.text(function(d, i) {
			return i * 5
		})

	legendrects
		.on("mouseover", function(d) {
			var self = this

			mapsvg.selectAll(".country")
				.transition()
				.style("opacity", 0.3)
			mapsvg.selectAll("." + this.getAttribute('class'))
				.filter(function() {
					return self != this
				})
				.transition()
				.style("opacity", 1)
				.style("stroke", "black")
				.style("stroke-width", 0.2)
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
	for (i = 0; i < adultsObese.length; i++) {
		// determine id of country in map
		countryId = "#" + adultsObese[i].Country

		// remove spaces from id
		countryId = countryId.replace(/\s+/g, "");

		// select this country in map
		d3.selectAll(countryId)
			.attr("fill", function() {
				// determine obesity score
				yearScore = adultsObese[i][year]

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

// =VERSCHUIVING($D$2;(RIJ()-2)*37;0)