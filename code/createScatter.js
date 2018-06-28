

function createScatter() {
/* This function creates a scatterplot in which each dot represents a country, 
the size of each dot determined by the level of obesity in that country, the 
colour representing the continent that country is in. It also creates a legend
for the colour and size of the dots. */

	// select the scatterplot svg
	scattersvg = d3.select(".scattersvg");

	// set scatterplot graph properties
	scatterMargin = {top: 80, right: 120, bottom: 40, left: 80};
	scatterWidth = Number(scattersvg.attr("width"));
	scatterHeight = Number(scattersvg.attr("height"));

	// set default year and select dataset for size of dots
	year = 2013;
	sizeData = adultsObese;

	// create title of scatterplot displaying the year of the data
	var scatterTitle = scattersvg
		.append("text")
		.attr("class", "scattertitle")
		.attr("y", scatterMargin.top/2)
		.style("fill", "gray")
		.text("Year " + year)

	// determine width of title
	var titleWidth = d3.select(".scattertitle").node()
    	.getBoundingClientRect()
    	.width;

    // place title in the middle of the graph (without margins)
    scatterTitle
    	.attr("x", function() {
    		return (scatterWidth - scatterMargin.right - scatterMargin.left)/2 
    		- titleWidth/2 + scatterMargin.left;
    	})

	// create dots of scatterplot, without placing them yet (one per country)
	var dots = scattersvg.selectAll(".dataPoints")
		.data(sizeData)
		.enter()
		.append("circle")
		.attr("class", "dataPoints")

		// id is scatter + name of country
		.attr("id", function(d) {
			countryid = "scatter" + d["Country"].replace(/\s+/g, "");
			return countryid;
		});

	// create tooltip for dots, containing the country and percentage of obesity
	var dotTip = d3.tip()
		.attr('class', 'd3-tip')
		.offset([-10, 0])
		.html(function(d) {
			return "<strong>Country: </strong> <span>" + d["Country"] + 
			"<br> <strong> Percentage obesity: </strong> <span>" +
			d["y" + year] 
		})

		// make sure the tooltip is always on top of other elements
		.style("z-index", 2)

	scattersvg.call(dotTip);

	// create g-element to hold the x-axis (without any content yet)
	xAxisG = scattersvg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0, " + (scatterHeight - scatterMargin.bottom) + ")")

    // create g-element to hold the y-axis (also without content yet)
	yAxisG = scattersvg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + scatterMargin.left + ", 0)")

    // define possible variables for the x-axis
    var xVariables = ["Calories eaten on average (per day)", "Mean years of schooling (years per person)", "Gross Domestic Product (US Dollar)", "Insuffient physical activity (% of population)"]
 
    // create label for x-dropdown
    var xAxisSelectText = scattersvg
    	.append("text")
    	.attr("class", "xAxisSelectText axisSelect")
    	.attr("x", scatterMargin.left)
    	.attr("y", scatterMargin.top - 17)
    	.text("x-axis: ")

    // create x-axis title (default: first of x-axis variable options)
    var xAxisTitle = xAxisG
    	.append("text")
    	.attr("class", "xAxisTitle axisTitle")
    	.attr("y", scatterMargin.bottom - 10)
    	.text(xVariables[0])

    // place x-axis title in middle of x-axis
    xAxisTitle
    	.attr("x", function() {

    		// determine width of axis title
			var textwidth = d3.select(".xAxisTitle").node()
		    	.getBoundingClientRect()
		    	.width;

			// place title in middle of axis
			return (scatterWidth - scatterMargin.right - scatterMargin.left)/2 - textwidth/2 + scatterMargin.left
		})

    // create dropdown for choosing x-axis variable
    var xDropdown = d3.select("body")
    	.append("select")
    	.attr("class", "xSelect")

    	// place dropdown on top of svg
    	.style("z-index", 1)
    	.style("position", "absolute")
    	.style("left", function () {
    		return scatterMargin.left + Number(mapWidth) + 75 + "px"
    	})
    	.style("top", "100px")

    	// update scatterplot when another variable is chosen
    	.on("change", updateVariableScatter);

    // put possible x-variables in the dropdown
    var xOptions = xDropdown
    	.selectAll("option")
    	.data(xVariables)
    	.enter()
    	.append("option")
    	.text(function(d) {
    		return d;
    	});

    // define possible variables for the y-axis
    var yVariables = ["Cardiovascular deaths / 100,000 people", "High blood pressure rate", "Cancer prevalence (% of population)"]

    // create label for y-axis dropdown
    var yAxisSelectText = scattersvg
    	.append("text")
    	.attr("class", "yAxisSelectText axisSelect")
    	.attr("x", scatterWidth/2)
    	.attr("y", scatterMargin.top - 17)
    	.text("y-axis: ");

    // create dropdown for selecting y-axis variables
    var yDropdown = d3.select("body")
    	.append("select")
    	.attr("class", "ySelect")
    	.attr("transform", "rotate(90)")
    	.style("z-index", 1)
    	.style("position", "absolute")
    	.style("left", function() {
    		return mapWidth + (scatterWidth/2) + 75 + "px"
    	})
    	.style("top", "100px")

    	// update scatterplot when another y-variable is selected
    	.on("change", updateVariableScatter);

    // put text in y-dropdown of the possible y-variables
    var yOptions = yDropdown
    	.selectAll("option")
    	.data(yVariables)
    	.enter()
    	.append("option")
    	.text(function(d) {
    		return d;
    	});

    // create y-axis title (default: first of y-variable options)
    var yAxisTitle = yAxisG
    	.append("text")
    	.attr("class", "yAxisTitle axisTitle")
    	.attr("transform", "rotate(-90)")
        .attr("y", -40)
        .attr("x", -scatterMargin.left)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text(yVariables[0]);

    // create scale for size of dots
	sizeScale = d3.scale.linear()
		.domain([0, 100])
		.range([1, 15])

	// put dots in scatterplot (with right size and location)
	updateVariableScatter();

	// loop through dots to specify colour, class and mouse-over instructions
	for (i = 0; i < sizeData.length; i++) {

		// create an id of country to select dot
		countryname = sizeData[i]["Country"].replace(/\s+/g, "");
		countryId = "#" + "scatter" + countryname;

		// select dot of country
		d3.selectAll(countryId)

			// fill dot with colour based on continent
			.style("fill", function(d) {

				// specify possible continents
				var continents = ["Africa", "Asia", "Europe", "Middle-East", 
				"North-America", "Oceania", "South-America"];

				// determine number in continent array of country's continent
				colourIndex = continents.indexOf(d["Continent"]);

				// use this number to colour country-dot
				return c10(colourIndex);
			})
			.attr("class", function(d) {
				return d["Continent"] + " dataPoints"
			})

			// set instructions for hovering over a dot
			.on("mouseover", function(d) {

				dotTip.show(d);

				var self = this;

				// lower opacity of all dots except the hovered-over dot
				d3.selectAll(".dataPoints")
					.filter(function() {
						return self != this
					})
					.style("opacity", 0.2);

				// determine x and y location of hovered-over dot
				var selectedcircle = d3.select(self);
				var circleY = selectedcircle.attr("cy");
				var circleX = selectedcircle.attr("cx");

				// create horizontal crosshair from hovered-over dot
				var horizontalCrosshair = scattersvg
					.append("line")
					.attr("class", "xCrosshair crosshair")
					.attr("x1", circleX)
					.attr("x2", circleX)
					.attr("y1", scatterHeight - scatterMargin.bottom)
					.attr("y2", circleY)
					.style("stroke-width", 0.5)
					.style("stroke", "gray");

				// create vertical crosshair from hovered-over dot
				var verticalCrosshair = scattersvg
					.append("line")
					.attr("class", "yCrosshair crosshair")
					.attr("x1", circleX)
					.attr("x2", scatterMargin.left)
					.attr("y1", circleY)
					.attr("y2", circleY)
					.style("stroke-width", 0.5)
					.style("stroke", "gray");

				// determine ID of this country on map (remove "scatter")
				dotID = selectedcircle.attr("id").split("scatter");

				// lower opacity of all countries on map
				d3.selectAll(".country")
					.style("opacity", 0.3);

				// restore opacity of selected country, and colour border black
				d3.selectAll("#" + dotID[1])
					.style("opacity", 1)
					.style("stroke", "black")
					.style("stroke-width", 0.15);

			})

			// restore settings in scatterplot and map on mouse-out
			.on("mouseout", function(d) {
				dotTip.hide(d);

				// restore opacity of all dots
				d3.selectAll(".dataPoints")
					.style("opacity", 1);

				// remove crosshair
				d3.selectAll(".crosshair")
					.remove();

				// restore opacity and borders of countries on map
				d3.selectAll(".country")
					.style("opacity", 1)
					.style("stroke", "white")
					.style("stroke-width", 0.05);
			})

			// update sankey diagram when clicked on dot
			.on("click", function(d) {
				timesClicked += 1
				
				// if click-counter is uneven, put diagram in first sankey-svg
				if (timesClicked % 2 == 1) {
					updateSankey(d["Country"], year, "sankeysvg");
				}

				// else, put diagram in second sankey-svg
				else {
					updateSankey(d["Country"], year, "secondsankeysvg");
				}
			})
	}

	/* create scatterplot legend */

	// specify continents for legend
	var continents = ["Africa", "Asia", "Europe", "Middle-East", "North-America", "Oceania", "South-America"]

	// create g-element to hold legend
	var scatterLegend = scattersvg.append("g")

	// add rectangles to legend to display different categories
	var legendRects = scatterLegend.selectAll("rect")
		.data(continents)
		.enter()
		.append("rect")
		.attr("height", 10)
		.attr("width", 20)
		.attr("x", scatterWidth - scatterMargin.right)
		
		// put each rectangle beneath the last one
		.attr("y", function(d, i) {
			return scatterMargin.top + (i * 15);
		})

		// colour the rectangles the same as the dots for each continent
		.attr("fill", function(d, i) {
			return c10(i)
		})
		.attr("class", function(d, i) {
			return continents[i]
		})

		// set instructions when continent rectangle is hovered over
		.on("mouseover", function(d) {
			var self = this

			// lower opacity of all dots and remove all outlines of dots
			d3.selectAll(".dataPoints")
				.transition()
				.style("opacity", 0.2)
				.style("stroke-width", 0);

			// select all dots with the same continent as class as selected rect
			d3.selectAll("." + this.getAttribute('class'))
				.transition()

				// exclude rectangle itself
				.filter(function() {
					return self != this
				})

				// restore opacity to 1
				.style("opacity", 1)

				// give dots a black outline
				.style("stroke", "black")
				.style("stroke-width", 0.4)

				// move dots to front
				.style("z-index", 1)
		})

		// restore setting of all dots 
		.on("mouseout", function(d) {
			d3.selectAll(".dataPoints")
				.transition()
				.style("opacity", 1)
				.style("stroke-width", 0)
				.style("z-index", 0)
		})

	// add labels to legend (of continents)
	var legendText = scatterLegend.selectAll("text")
		.data(continents)
		.enter()
		.append("text")
		.attr("x", scatterWidth - scatterMargin.right + 23)
		.attr("y", function(d, i) {
			return scatterMargin.top + (i * 15) + 9;
		})
		.text(function(d, i) {
			return continents[i]
		})

	/* create circle-size legend */

	// specify percentages of obesity for circle-legend
	var legendCircleSizes = [50, 35, 20, 5];

	// create g-element to hold cirlce-legend
	var circleLegend = scattersvg.append("g")

	// append circles to legend
	var legendCircles = circleLegend.selectAll(".legendCircles")
		.data(legendCircleSizes)
		.enter()
		.append("circle")
		.attr("class", "legendCircles")
		.attr("cx", scatterWidth - scatterMargin.right + 10)
		.attr("cy", function(d, i) {
			return scatterMargin.top + 150 +(i * 20);
		})
		.attr("r", function(d) {
			return sizeScale(d);
		});

	// add labels to circle-legend
	var circleText = circleLegend.selectAll(".circleText")
		.data(legendCircleSizes)
		.enter()
		.append("text")
		.attr("class", "circleText")
		.attr("x", scatterWidth - scatterMargin.right + 23)
		.attr("y", function(d, i) {
			return scatterMargin.top + 150 +(i * 20)
		})

		// label is percentage of obesity the circle represents + "% obesity"
		.text(function(d) {
			return d + "% obesity"
		});
}

function updateVariableScatter() {
/* This function selects the datasets for different variables for the 
x- or y-axis of the scatterplot, chosen by the x- or y-dropdown. */

	// determine current selection x-dropdown
	selectXValue = d3.select(".xSelect").property("value");

	// determine current selection y-dropdown
	selectYValue = d3.select(".ySelect").property("value");

	/* Create x-data-dictionary with selected x-variable dataset */

	if (selectXValue == "Gross Domestic Product (US Dollar)") {
		
		// select GDP dataset for x-axis data
		xData = GDP;

		xDataList = {};

		// add data of country and year to x-data dictionary
		for (i = 0; i < xData.length; i++) {
			countryXname = xData[i]["Entity"].replace(/\s+/g, "");
			xDataList[countryXname] = xData[i]["y" + year]
		}

		// determine minimum and maximum for x-scale
		minX = 0;
		maxX = 120000;
	}

	else if (selectXValue == "Insuffient physical activity (% of population)") {
		xData = insuffientlyActive;

		// only one year is available for this dataset
		year = 2010;

		xDataList = {};

		for (i = 0; i < xData.length; i++) {
			countryXname = xData[i]["Country"].replace(/\s+/g, "");
			xDataList[countryXname] = xData[i]["y2010"]
		}

		minX = 0;
		maxX = 70;
	}

	else if (selectXValue == "Mean years of schooling (years per person)"){
		xData = meanYearsOfSchooling;

		// this dataset has only data available of every five years
		while (year % 5 != 0) {
			year -= 1;
		}

		xDataList = {};

		for (i = 0; i < xData.length; i++) {
			countryXname = xData[i]["Country"].replace(/\s+/g, "");
			xDataList[countryXname] = xData[i]["y" + year]
		}

		minX = 0;
		maxX = 14;
	}

	else if (selectXValue == "Calories eaten on average (per day)") {
		xData = caloriesData;

		xDataList = {};

		for (i = 0; i < xData.length; i++) {
			if (xData[i]["Year"] == year) {
				countryXname = xData[i]["Entity"].replace(/\s+/g, "");
				xDataList[countryXname] = xData[i]["Total"]
			}
		}

		minX = 1400;
		maxX = 3800;
	}

	/* Create y-data-dictionary with selected y-variable dataset */

	if (selectYValue == "Cardiovascular deaths / 100,000 people") {
		yData = cardiovascData;

		// data is not available before 1990
		if (year < 1990) {
			year = 1990;

			// start this function again to update this year for x-data as well
			updateVariableScatter();
		}

		yDataList = {};

		// put data of each country of the right year in y-data dictionary
		for (i = 0; i < yData.length; i++) {
			if (yData[i]["Year"] == year) {
				countryYname = yData[i]["Entity"].replace(/\s+/g, "");
				yDataList[countryYname] = yData[i]["Cardiovascular deaths / 100,000"]
			}
		}

		// set minimum and maximum y-values for y-scale
		minY = 0;
		maxY = 1000;
	}

	else if (selectYValue == "High blood pressure rate") {
		yData = highBloodPressure;

		yDataList = {};

		for (i = 0; i < yData.length; i++) {
			if (yData[i]["Year"] == year) {
				countryYname = yData[i]["Country/Region/World"].replace(/\s+/g, "");
				yDataList[countryYname] = yData[i]["Prevalence raised blood pressure"]
			}
		}

		minY = 0;
		maxY = 0.5;
	}

	else if (selectYValue == "Cancer prevalence (% of population)") {
		yData = cancer;

		// no data in this dataset is available before 1990
		if (year < 1990) {
			year = 1990;

			// start this function again to update this year for x-data as well
			updateVariableScatter();
		}

		yDataList = {};

		for (i = 0; i < yData.length; i++) {
			if (yData[i]["Year"] == year) {
				countryYname = yData[i]["Entity"].replace(/\s+/g, "");
				yDataList[countryYname] = yData[i]["Cancer prevalence"]
			}
		}

		minY = 0;
		maxY = 1;		
	}

	// create scale for x-data
	var xScale = d3.scale.linear()
		.domain([minX, maxX])
		.range([scatterMargin.left, scatterWidth - scatterMargin.right])

	// create x-axis
	var xAxis = d3.svg.axis()
		.scale(xScale)
		.orient("bottom")
		.tickSize(0)

	xAxisG.call(xAxis);

	// put chosen x-variable as title on x-axis
	scattersvg.select(".xAxisTitle")
		.text(selectXValue)

	// put x-axis title in the middle of the axis
	scattersvg.select(".xAxisTitle")
    	.attr("x", function() {
			var textwidth = d3.select(".xAxisTitle").node()
		    	.getBoundingClientRect()
		    	.width;

			return (scatterWidth - scatterMargin.right - scatterMargin.left)/2 - textwidth/2 + scatterMargin.left
		})

	// create scale for y-data
	var yScale = d3.scale.linear()
		.domain([maxY, minY])
		.range([scatterMargin.top, scatterHeight - scatterMargin.bottom]);

	// create y-axis
	var yAxis = d3.svg.axis()
		.scale(yScale)
		.orient("left")
		.tickSize(0);

	yAxisG.call(yAxis);

	// use chosen y-variable as y-axis title
	scattersvg.select(".yAxisTitle")
		.text(selectYValue)

	// put y-axis title in middle of y-axis
	scattersvg.select(".yAxisTitle")
		.attr("x", function() {

			// determine width of axis title
			var textwidth = d3.select(".xAxisTitle").node()
		    	.getBoundingClientRect()
		    	.width;

		    return -(scatterHeight - scatterMargin.top - scatterMargin.bottom) / 2 
		    + textwidth / 2 - scatterMargin.top
		})

	// update title of scatterplot to current year
	d3.selectAll(".scattertitle")
		.text("Year " + year)

	// put dots with right data in scatterplot
	updateScatter(xScale, yScale, xDataList, yDataList);

}

function updateScatterYear(year) {
/* This function changes the year of the scatterplot, and then calls the function
to update the x- and y-data to the new year */

	year = year;

	updateVariableScatter();
}

function updateScatter(xScale, yScale, xDataList, yDataList) {
/* This function correctly places the dots in the scatterplot, based on the x-
and y-data dictionaries, with the right size.  */

	// create empty list to save countries without data available
	noDataCountries = [];

	// loop through country-dots and place them in scatterplot
	for (i = 0; i < sizeData.length; i++) {
		
		// create same ID as dot to select dot
		countryname = sizeData[i]["Country"].replace(/\s+/g, "")
		countryId = "#" + "scatter" + countryname;

		// select country-dot
		d3.selectAll(countryId)
			.attr("cx", function() {

				// if x-data is available, determine x-location of dot
				if (xDataList[countryname]) {
					return xScale(xDataList[countryname])
				}

				// if not, put country in no-data list
				else {
					noDataCountries.push(countryId)
					return
				}
			})
			.attr("cy", function() {
				if (yDataList[countryname]) {
					return yScale(yDataList[countryname])
				}
				else {
					noDataCountries.push(countryId)
					return
				}
			})

			// determine radius of dot based on percentage obesity
			.attr("r", function(d) {
				sizeYear = "y" + year
				return sizeScale(d[sizeYear])
			})

		// end of loop through dots
		}

		// set radius of country-dot to 0 if x- or y-data of country was not available
		for (i = 0; i < noDataCountries.length; i++) {
			d3.selectAll(noDataCountries[i])
				.attr("r", 0);
		}
}

function c10(n) {
/* This function returns a colour (10 possible colours) */

	var colores_g = ["#3366cc", "#dc3912", "#ff9900", "#109618", "#990099", "#0099c6", "#dd4477", "#66aa00", "#b82e2e", "#316395", "#994499", "#22aa99", "#aaaa11", "#6633cc", "#e67300", "#8b0707", "#651067", "#329262", "#5574a6", "#3b3eac"];
	return colores_g[n % colores_g.length];
}