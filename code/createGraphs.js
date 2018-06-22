window.onload = function() {

	// wait for all datasets to load
	d3.queue()
		.defer(d3.json, "sources/custom.geo.json")
		.defer(d3.json, "sources/AdultsObese.json")
		.defer(d3.json, "sources/FemalesObese.json")
		.defer(d3.json, "sources/MalesObese.json")
		.awaitAll(main);
}

function main (error, loadedJSONs) {
	if (error) throw error;

	geojson = loadedJSONs[0]
	adultsObese = loadedJSONs[1]
	femalesObese = loadedJSONs[2]
	malesObese = loadedJSONs[3]

	createMap();
	createSlider();
}

function createMap() {


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

function updateMapGender(gender) {
	boxes = d3.selectAll(".form-check-input")
	checkedlist = [];

	for (i = 0; i <= boxes.length; i++) {
		checkedlist.push(boxes[0][i].checked)
	}

	if (checkedlist[0] == true && checkedlist[1] == false) {
		dataset = femalesObese;
	}
	else if (checkedlist[0] == false && checkedlist[1] == true) {
		dataset = malesObese;
	}
	else if (checkedlist[0] == true && checkedlist[1] == true) {
		dataset = adultsObese;
	}
	else {
		countries.attr("fill", "rgb(211, 211, 211)");
		return
	}

	countries
		.attr("fill", "rgb(211, 211, 211)")

	for (i = 0; i < dataset.length; i++) {
		// determine id of country in map
		countryId = "#" + dataset[i].Country

		// remove spaces from id
		countryId = countryId.replace(/\s+/g, "");

		// select this country in map
		d3.selectAll(countryId)
			.attr("fill", function() {
				// determine obesity score
				yearScore = dataset[i][year]

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

function createSlider() {


	timeWidth = 200
	timeHeight = 50
	margin = {right: 20, left: 20}

    var svg = d3.select(".timesvg")
    	// .append("text")

    slider1 = new simpleSlider();

    yearInfo = svg.append("text")
		.attr("x", 180)
		.attr("y", timeHeight/2 + 3)
		.attr("class", "yearInfo")
		.text("Year: 2015")

    var xScale = d3.scale.linear()
		.domain([0, 1])
		.range([1975, 2015])

    slider1.width(150).x(10).y(timeHeight/2).value(1.0).event(function(){
    	selectedyear = Math.round(xScale(slider1.value()));
    	year = "y" + selectedyear
        yearInfo
        	.text("Year: " + selectedyear);

        updateMap(year);
    });


	

    svg.call(slider1);
}

// source: https://bl.ocks.org/Lulkafe/3832d628340038d9484fbd9edb705e01
function simpleSlider () {

    var width = 100,
        value = 0.5, /* Domain assumes to be [0 - 1] */
        event,
        x = 0,
        y = 0;

    function slider (selection) {

        //Line to represent the current value
        var valueLine = selection.append("line")
            .attr("x1", x)
            .attr("x2", x + (width * value))
            .attr("y1", y)
            .attr("y2", y)
            .style({stroke: "red",
                    "stroke-linecap": "round",
                    "stroke-width": 6 });

        //Line to show the remaining value
        var emptyLine = selection.append("line")
            .attr("x1", x + (width * value))
            .attr("x2", x + width)
            .attr("y1", y)
            .attr("y2", y)
            .style({
                "stroke": "#ECECEC",
                "stroke-linecap": "round",
                "stroke-width": 6
            });

        var drag = d3.behavior.drag().on("drag", function() {
            var newX = d3.mouse(this)[0];

            if (newX < x)
                newX = x;
            else if (newX > x + width)
                newX = x + width;

            value = (newX - x) / width;
            valueCircle.attr("cx", newX);
            valueLine.attr("x2", x + (width * value));
            emptyLine.attr("x1", x + (width * value));

            if (event)
                event();

            d3.event.sourceEvent.stopPropagation();
        })

        //Draggable circle to represent the current value
        var valueCircle = selection.append("circle")
            .attr("cx", x + (width * value))
            .attr("cy", y)
            .attr("r", 8)
            .style({
                "stroke": "black",
                "stroke-width": 1.0,
                "fill": "white"
            })
            .call(drag);
    }


    slider.x = function (val) {
        x = val;
        return slider;
    }

    slider.y = function (val) {
        y = val;
        return slider;
    }

    slider.value = function (val) {
        if (val) {
            value = val;
            return slider;
        } else {
            return value;
        }
    }

    slider.width = function (val) {
        width = val;
        return slider;
    }

    slider.event = function (val) {
        event = val;
        return slider;
    }

    return slider;
}

