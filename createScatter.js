function c10(n) {
  var colores_g = ["#3366cc", "#dc3912", "#ff9900", "#109618", "#990099", "#0099c6", "#dd4477", "#66aa00", "#b82e2e", "#316395", "#994499", "#22aa99", "#aaaa11", "#6633cc", "#e67300", "#8b0707", "#651067", "#329262", "#5574a6", "#3b3eac"];
  return colores_g[n % colores_g.length];
}

function createScatter() {

	margin = {top: 30, right: 120, bottom: 40, left: 80}
	scatterWidth = 700;
	scatterHeight = 300;

	scattersvg = d3.select(".scattersvg")

	year = 2013
	sizeData = adultsObese;
	xData = caloriesData;
	yData = cardiovascData;

	var scatterTitle = scattersvg
		.append("text")
		.attr("class", "scattertitle")
		.attr("x", scatterWidth/2)
		.attr("y", margin.top)
		.style("fill", "gray")
		.text("Year " + year)

	xDataList = {};

	for (i = 0; i < xData.length; i++) {
		// console.log(xData[i]["Year"])
		if (xData[i]["Year"] == year) {
			countryXname = xData[i]["Entity"].replace(/\s+/g, "");
			xDataList[countryXname] = xData[i]["Total"]
			}

		}

	yDataList = {};

	for (i = 0; i < yData.length; i++) {
		if (yData[i]["Year"] == year) {
			countryYname = yData[i]["Entity"].replace(/\s+/g, "");
			yDataList[countryYname] = yData[i]["Cardiovascular deaths / 100,000"]
		}
	}

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
			console.log(d["y2016"])
			return "<strong>Country: </strong> <span>" + d["Country"] + 
			"<br> <strong> Percentage obesity: </strong> <span>" +
			d["y" + year] 
			+ "<br> <strong> Calories: </strong> <span>"+ 
			xDataList[d["Country"].replace(/\s+/g, "")] + 
			"<br> <strong> Cardiovascular deaths / 100,000: </strong> <span>" +
			yDataList[d["Country"].replace(/\s+/g, "")]
		})

	// call the tooltip
	scattersvg.call(dotTip);

	

	var xScale = d3.scale.linear()
		.domain([1500, 4000])
		.range([margin.left, scatterWidth - margin.right])

	var xAxis = d3.svg.axis()
		.scale(xScale)
		.orient("bottom")
		.tickSize(0)

	scattersvg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0, " + (scatterHeight - margin.bottom) + ")")
        .call(xAxis)


	var yScale = d3.scale.linear()
		.domain([1000, 0])
		.range([margin.top, scatterHeight - margin.bottom])


	var yAxis = d3.svg.axis()
		.scale(yScale)
		.orient("left")
		.tickSize(0)

	// verticalCrosshairs = scattersvg.selectAll(".xCrosshair")
	// 	.data(sizeData)
	// 	.enter()
	// 	.append("line")
	// 	.attr("class", "xCrosshair")
	// 	.attr("x1", function(d) {
	// 		return xScale(xDataList[d["Country"].replace(/\s+/g, "")])
	// 	})
	// 	.attr("x2", function(d) {
	// 		return xScale(xDataList[d["Country"].replace(/\s+/g, "")])
	// 	})
	// 	.attr("y1", function(d) {
	// 		return yScale(yDataList[d["Country"].replace(/\s+/g, "")])
	// 	})
	// 	.attr("y2", scatterHeight - margin.bottom)
	// 	.attr("stroke-width", 0.5)
	// 	.attr("stroke", "gray")
	// 	.style("opacity", 0)

	// horizontalCrosshairs = scattersvg.selectAll(".yCrosshair")
	// 	.data(sizeData)
	// 	.enter()
	// 	.append("line")
	// 	.attr("class", "yCrosshair")
	// 	.attr("x1", function(d) {
	// 		return xScale(xDataList[d["Country"].replace(/\s+/g, "")])
	// 	})
	// 	.attr("x2", margin.left)
	// 	.attr("y1", function(d) {
	// 		return yScale(yDataList[d["Country"].replace(/\s+/g, "")])
	// 	})
	// 	.attr("y2", function(d) {
	// 		return yScale(yDataList[d["Country"].replace(/\s+/g, "")])
	// 	})
	// 	.attr("stroke-width", 0.5)
	// 	.attr("stroke", "gray")
	// 	.style("opacity", 0)

	scattersvg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + margin.left + ", 0)")
        .call(yAxis)

    // y-axis title
	scattersvg.append("g")
            .append("text")
            .attr("class", "axistitle")
            .attr("transform", "rotate(-90)")
            .attr("y", 40)
            .attr("x", -margin.left + 40)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Cardiovascular deaths / 100,000 people");

    var xVariables = ["Calories eaten on average (per day)", "Mean years of schooling", "Gross Domestic Product", "Percentage insuffiently exercise"]
 
    xDropdown = d3.select("body")
    	.append("select")
    	.attr("class", "xSelect")
    	.style("z-index", 1)
    	.style("position", "absolute")
    	.style("left", "800px")
    	.style("top", "330px")
    	.on("change", updateScatter);

    xOptions = xDropdown
    	.selectAll("option")
    	.data(xVariables)
    	.enter()
    	.append("option")
    	.text(function(d) {
    		return d;
    	});

	sizeScale = d3.scale.linear()
		.domain([0, 100])
		.range([1, 15])



	for (i = 0; i < sizeData.length; i++) {
		countryname = sizeData[i]["Country"].replace(/\s+/g, "")
		countryId = "#" + "scatter" + countryname;

		d3.selectAll(countryId)
			.attr("cx", function() {
				if (xDataList[countryname]) {
					return xScale(xDataList[countryname])
				}
				else {
					return -10
				}
			})
			.attr("cy", function() {
				if (yDataList[countryname]) {
					return yScale(yDataList[countryname])
				}
				else {
					return -10
				}
			})
			.attr("r", function(d) {
				sizeYear = "y" + year
				return sizeScale(d[sizeYear])
			})
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

			})
			.on("mouseout", function(d) {
				dotTip.hide(d);

				d3.selectAll(".dataPoints")
					.style("opacity", 1)
					.style("stroke-width", 0)

				// d3.selectAll(".xCrosshair")
				// 	.style("opacity", 1)
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
		})
		.on("mouseout", function(d) {
			d3.selectAll(".dataPoints")
				.transition()
				.style("opacity", 1)
				.style("stroke-width", 0)
		})

	var legendText = scatterLegend.selectAll("text")
		.data(continents)
		.enter()
		.append("text")
		.attr("height", 10)
		.attr("width", 30)
		.attr("x", scatterWidth - margin.right + 23)
		.attr("y", function(d, i) {
			return margin.top + (i * 15) + 9;
		})
		.text(function(d, i) {
			return continents[i]
		})
}

function updateScatter() {
	selectXValue = d3.select('.xSelect').property('value')

	console.log(selectXValue)
}

function updateScatterYear(year) {

	d3.selectAll(".scattertitle")
		.text("Year " + year)

	xDataList = {};

	for (i = 0; i < xData.length; i++) {
		if (xData[i]["Year"] == year) {
			countryXname = xData[i]["Entity"].replace(/\s+/g, "");
			xDataList[countryXname] = xData[i]["Total"]
			}

		}

	let xArr = Object.values(xDataList);
	let xMin = Math.min(...xArr);
	let xMax = Math.max(...xArr);

	yDataList = {};

	for (i = 0; i < yData.length; i++) {
		if (yData[i]["Year"] == year) {
			countryYname = yData[i]["Entity"].replace(/\s+/g, "");
			yDataList[countryYname] = yData[i]["Cardiovascular deaths / 100,000"]
		}
	}

	let yArr = Object.values(yDataList);
	let yMin = Math.min(...yArr);
	let yMax = Math.max(...yArr);

	var xScale = d3.scale.linear()
		.domain([1500, 4000])
		.range([margin.left, mapWidth - margin.right])

	var yScale = d3.scale.linear()
		.domain([1000, 0])
		.range([margin.top, mapHeight - margin.bottom])

	noDataCountries = [];

	for (i = 0; i < sizeData.length; i++) {
		countryname = sizeData[i]["Country"].replace(/\s+/g, "")
		countryId = "#" + "scatter" + countryname;

		
		d3.selectAll(countryId)
			.style("opacity", 1)
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
				.style("opacity", 0)
		}

}