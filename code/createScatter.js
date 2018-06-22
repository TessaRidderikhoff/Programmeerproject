function c10(n) {
  var colores_g = ["#3366cc", "#dc3912", "#ff9900", "#109618", "#990099", "#0099c6", "#dd4477", "#66aa00", "#b82e2e", "#316395", "#994499", "#22aa99", "#aaaa11", "#6633cc", "#e67300", "#8b0707", "#651067", "#329262", "#5574a6", "#3b3eac"];
  return colores_g[n % colores_g.length];
}

function createScatter() {

	margin = {top: 80, right: 120, bottom: 40, left: 80}
	scatterWidth = 700;
	scatterHeight = 350;

	scattersvg = d3.select(".scattersvg")

	year = 2013
	sizeData = adultsObese;

	var scatterTitle = scattersvg
		.append("text")
		.attr("class", "scattertitle")
		.attr("x", (scatterWidth - margin.right)/2)
		.attr("y", margin.top/2)
		.style("fill", "gray")
		.text("Year " + year)

	dots = scattersvg.selectAll(".dataPoints")
		.data(sizeData)
		.enter()
		.append("circle")
		.attr("class", "dataPoints")
		.attr("id", function(d) {
			countryid = "scatter" + d["Country"].replace(/\s+/g, "");
			return countryid;
		});

	var dotTip = d3.tip()
		.attr('class', 'd3-tip')
		.offset([-10, 0])
		.html(function(d) {
			return "<strong>Country: </strong> <span>" + d["Country"] + 
			"<br> <strong> Percentage obesity: </strong> <span>" +
			d["y" + year] 
		})
		.style("z-index", 2)

	// call the tooltip
	scattersvg.call(dotTip);

	xAxisG = scattersvg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0, " + (scatterHeight - margin.bottom) + ")")


	yAxisG = scattersvg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + margin.left + ", 0)")
        // .call(yAxis)

    var xVariables = ["Calories eaten on average (per day)", "Mean years of schooling", "Gross Domestic Product", "Percentage insuffiently exercise"]
 
    xAxisSelectText = scattersvg
    	.append("text")
    	.attr("class", "xAxisSelectText axisSelect")
    	.attr("x", margin.left)
    	.attr("y", margin.top - 17)
    	.text("x-axis: ")

    xAxisTitle = xAxisG
    	.append("text")
    	.attr("class", "xAxisTitle axisTitle")
    	.attr("y", 30)
    	.text(xVariables[0])

    xAxisTitle
    	.attr("x", function() {
			var textwidth = d3.select(".xAxisTitle").node()
		    	.getBoundingClientRect()
		    	.width;

			return (scatterWidth - margin.right - margin.left)/2 - textwidth/2 + margin.left
		})

    xDropdown = d3.select("body")
    	.append("select")
    	.attr("class", "xSelect")
    	.style("z-index", 1)
    	.style("position", "absolute")
    	.style("left", function () {
    		return margin.left + mapWidth + 75 + "px"
    	})
    	.style("top", "100px")
    	.on("change", updateVariableScatter);

    xOptions = xDropdown
    	.selectAll("option")
    	.data(xVariables)
    	.enter()
    	.append("option")
    	.text(function(d) {
    		return d;
    	});

    var yVariables = ["Cardiovascular deaths / 100,000 people", "High blood pressure prevalence", "Cancer prevalence"]

    yAxisSelectText = scattersvg
    	.append("text")
    	.attr("class", "yAxisSelectText axisSelect")
    	.attr("x", scatterWidth/2)
    	.attr("y", margin.top - 17)
    	.text("y-axis: ");

    yDropdown = d3.select("body")
    	.append("select")
    	.attr("class", "ySelect")
    	.attr("transform", "rotate(90)")
    	.style("z-index", 1)
    	.style("position", "absolute")
    	.style("left", function() {
    		return mapWidth + (scatterWidth/2) + 75 + "px"
    	})
    	.style("top", "100px")
    	.on("change", updateVariableScatter);

    yAxisTitle = yAxisG
    	.append("text")
    	.attr("class", "yAxisTitle axisTitle")
    	.attr("transform", "rotate(-90)")
        .attr("y", -40)
        .attr("x", -margin.left)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text(yVariables[0]);

    yOptions = yDropdown
    	.selectAll("option")
    	.data(yVariables)
    	.enter()
    	.append("option")
    	.text(function(d) {
    		return d;
    	});

	sizeScale = d3.scale.linear()
		.domain([0, 100])
		.range([1, 15])

	updateVariableScatter();

	for (i = 0; i < sizeData.length; i++) {
		countryname = sizeData[i]["Country"].replace(/\s+/g, "")
		countryId = "#" + "scatter" + countryname;

		d3.selectAll(countryId)
			.style("fill", function(d) {
				if (d["Continent"] == "Africa") {
					return c10(0)
				}
				else if (d["Continent"] == "Asia") {
					return c10(1)
				}
				else if (d["Continent"] == "Europe") {
					return c10(2)
				}
				else if (d["Continent"] == "Middle-East") {
					return c10(3)
				}
				else if (d["Continent"] == "North-America") {
					return c10(4)
				}
				else if (d["Continent"] == "Oceania") {
					return c10(5)
				}
				else if (d["Continent"] == "South-America") {
					return c10(6)
				}
			})
			.attr("class", function(d) {
				return d["Continent"] + " dataPoints"
			})
			.on("mouseover", function(d) {

				dotTip.show(d);

				var self = this;

				d3.selectAll(".dataPoints")
					.filter(function() {
						return self != this
					})
					.style("opacity", 0.2)

				selectedcircle = d3.select(self);

				horizontalCrosshair = scattersvg
					.append("line")
					.attr("class", "xCrosshair crosshair")
					.attr("x1", function(d) {
						return selectedcircle.attr("cx");
					})
					.attr("x2", function(d) {					
						return selectedcircle.attr("cx");
					})
					.attr("y1", scatterHeight - margin.bottom)
					.attr("y2", function(d) {
						return selectedcircle.attr("cy");
					})
					.style("stroke-width", 0.5)
					.style("stroke", "gray")

				verticalCrosshair = scattersvg
					.append("line")
					.attr("class", "yCrosshair crosshair")
					.attr("x1", function(d) {
						return selectedcircle.attr("cx");
					})
					.attr("x2", function(d) {					
						return margin.left;
					})
					.attr("y1", function(d) {
						return selectedcircle.attr("cy");
					})
					.attr("y2", function(d) {
						return selectedcircle.attr("cy");
					})
					.style("stroke-width", 0.5)
					.style("stroke", "gray")

				dotID = selectedcircle.attr("id").split("scatter")

				d3.selectAll(".country")
					.style("opacity", 0.3)

				d3.selectAll("#" + dotID[1])
					.style("opacity", 1)
					.style("stroke", "black")
					.style("stroke-width", 0.15)

			})
			.on("mouseout", function(d) {
				dotTip.hide(d);

				d3.selectAll(".dataPoints")
					.style("opacity", 1)
					.style("stroke-width", 0)

				d3.selectAll(".crosshair")
					.remove()

				d3.selectAll(".country")
					.style("opacity", 1)
					.style("stroke", "white")
					.style("stroke-width", 0.05)
			})
			.on("click", function(d) {
				timesClicked += 1
				if (timesClicked % 2 == 1) {
					console.log(d)
					console.log(year)
					updateSankey(d["Country"], year, "sankeysvg")
				}
				else {
					updateSankey(d["Country"], year, "secondsankeysvg")
				}
			})
	}



	var continents = ["Africa", "Asia", "Europe", "Middle-East", "North-America", "Oceania", "South-America"]

	var scatterLegend = scattersvg.append("g")

	var legendRects = scatterLegend.selectAll("rect")
		.data(continents)
		.enter()
		.append("rect")
		.attr("height", 10)
		.attr("width", 20)
		.attr("x", scatterWidth - margin.right)
		.attr("y", function(d, i) {
			return margin.top + (i * 15);
		})
		.attr("fill", function(d, i) {
			return c10(i)
		})
		.attr("class", function(d, i) {
			return continents[i]
		})
		.on("mouseover", function(d) {
			var self = this

			d3.selectAll(".dataPoints")
				.transition()
				.style("opacity", 0.2)
				.style("stroke-width", 0)
			d3.selectAll("." + this.getAttribute('class'))
				.transition()
				.filter(function() {
					return self != this
				})
				.style("opacity", 1)
				.style("stroke", "black")
				.style("stroke-width", 0.4)
				.style("z-index", 1)
		})
		.on("mouseout", function(d) {
			d3.selectAll(".dataPoints")
				.transition()
				.style("opacity", 1)
				.style("stroke-width", 0)
				.style("z-index", 0)
		})

	var legendText = scatterLegend.selectAll("text")
		.data(continents)
		.enter()
		.append("text")
		.attr("x", scatterWidth - margin.right + 23)
		.attr("y", function(d, i) {
			return margin.top + (i * 15) + 9;
		})
		.text(function(d, i) {
			return continents[i]
		})

	var legendCircleSizes = [50, 35, 20, 5];

	var circleLegend = scattersvg.append("g")

	var legendCircles = circleLegend.selectAll(".legendCircles")
		.data(legendCircleSizes)
		.enter()
		.append("circle")
		.attr("class", "legendCircles")
		.attr("cx", scatterWidth - margin.right + 10)
		.attr("cy", function(d, i) {
			return margin.top + 150 +(i * 20);
		})
		.attr("r", function(d) {
			return sizeScale(d);
		})
		// .style("fill", c10(0));

	var circleText = circleLegend.selectAll(".circleText")
		.data(legendCircleSizes)
		.enter()
		.append("text")
		.attr("class", "circleText")
		.attr("x", scatterWidth - margin.right + 23)
		.attr("y", function(d, i) {
			return margin.top + 150 +(i * 20)
		})
		.text(function(d) {
			return d + "% obesity"
		})

}

function updateVariableScatter() {
	selectXValue = d3.select(".xSelect").property("value");

	selectYValue = d3.select(".ySelect").property("value");

	if (selectXValue == "Gross Domestic Product") {
		xData = GDP;

		xDataList = {};

		for (i = 0; i < xData.length; i++) {
			countryXname = xData[i]["Entity"].replace(/\s+/g, "");
			xDataList[countryXname] = xData[i]["y" + year]
		}

		minX = 0;
		maxX = 120000;
	}

	else if (selectXValue == "Percentage insuffiently exercise") {
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

	else if (selectXValue == "Mean years of schooling"){
		xData = meanYearsOfSchooling;

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

		if (year > 2013) {
			year = 2013;
		}

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

		

	if (selectYValue == "Cardiovascular deaths / 100,000 people") {
		yData = cardiovascData;

		if (year < 1990) {
			year = 1990;
			updateVariableScatter();
		}

		yDataList = {};

		for (i = 0; i < yData.length; i++) {
			if (yData[i]["Year"] == year) {
				countryYname = yData[i]["Entity"].replace(/\s+/g, "");
				yDataList[countryYname] = yData[i]["Cardiovascular deaths / 100,000"]
			}
		}

		minY = 0;
		maxY = 1000;
	}

	else if (selectYValue == "High blood pressure prevalence") {
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

	else if (selectYValue == "Cancer prevalence") {
		yData = cancer;

		if (year < 1990) {
			year = 1990;
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

	// let xArr = Object.values(xDataList);
	// let xMin = Math.min(...xArr);
	// let xMax = Math.max(...xArr);

	// let yArr = Object.values(yDataList);
	// let yMin = Math.min(...yArr);
	// let yMax = Math.max(...yArr);

	var xScale = d3.scale.linear()
		.domain([minX, maxX])
		.range([margin.left, scatterWidth - margin.right])

	var xAxis = d3.svg.axis()
		.scale(xScale)
		.orient("bottom")
		.tickSize(0)

	xAxisG.call(xAxis);

	xAxisTitle
		.text(selectXValue)

	xAxisTitle
    	.attr("x", function() {
			var textwidth = d3.select(".xAxisTitle").node()
		    	.getBoundingClientRect()
		    	.width;

			return (scatterWidth - margin.right - margin.left)/2 - textwidth/2 + margin.left
		})

	var yScale = d3.scale.linear()
		.domain([maxY, minY])
		.range([margin.top, scatterHeight - margin.bottom])

	var yAxis = d3.svg.axis()
		.scale(yScale)
		.orient("left")
		.tickSize(0)

	yAxisG.call(yAxis);

	yAxisTitle
		.text(selectYValue)

	d3.selectAll(".scattertitle")
		.text("Year " + year)

	updateScatter(xScale, yScale, xDataList, yDataList);

}

function updateScatterYear(year) {

	year = year;

	updateVariableScatter();
}

function updateScatter(xScale, yScale, xDataList, yDataList) {
	noDataCountries = [];

	for (i = 0; i < sizeData.length; i++) {
		countryname = sizeData[i]["Country"].replace(/\s+/g, "")
		countryId = "#" + "scatter" + countryname;

		
		d3.selectAll(countryId)
			.attr("cx", function() {
				if (xDataList[countryname]) {
					return xScale(xDataList[countryname])
				}
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
			.attr("r", function(d) {
				sizeYear = "y" + year
				return sizeScale(d[sizeYear])
			})
		}

		for (i = 0; i < noDataCountries.length; i++) {
			d3.selectAll(noDataCountries[i])
				.attr("r", 0);
		}
}