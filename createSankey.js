function createSankey(svgname) {

	sankeyMargin = {top: 70, bottom: 50, right: 20, left: 20}
	sankeyWidth = 600;
	sankeyHeight = 400;

	nodeWidth = 40;

	sankeysvg = d3.select("." + svgname)

	var sankeyTitle = sankeysvg
		.append("text")
		.attr("class", "sankeytitle graphtitle")
		.attr("x", 0)
		.attr("y", sankeyMargin.top/2)
		.style("fill", "gray")

	var sankeyYearTitle = sankeysvg
		.append("text")
		.attr("class", "sankeyYearTitle graphtitle")
		.attr("x", sankeyWidth - 75)
		.attr("y", sankeyMargin.top/2)
		.style("fill", "gray")

	var caloriesTitle = sankeysvg
		.append("text")
		.attr("class", "caloriestitle sankeylabels")
		.attr("transform", "rotate(-90)")
        .attr("y", 0)
        .attr("x", -margin.left - 50)
        .attr("width", sankeyHeight)
        .style("text-anchor", "middle")
        .attr("dy", ".71em")
        .style("text-anchor", "end")

		

	var caloriesRect = sankeysvg
		.append("rect")
		.attr("class", "calRect node")
		.attr("x", sankeyMargin.right)
		.attr("y", sankeyMargin.top)
		.attr("height", 0)
		.attr("width", nodeWidth)
		.attr("fill", c10(0));

	foodgroups = ["Sugar", "Oils & Fats", "Meat", "Dairy & Eggs", "Fruits & Vegetables", "Starchy Roots", "Pulses", "Cereals & Grains", "Alcoholic Beverages", "Other"];
	foodgroupsShortcuts = ["sugar", "oil", "meat", "dairy", "fruit", "roots", "pulses", "grains", "alcohol", "other"];
	
	var foodgroupRects = sankeysvg.selectAll(".secondNode")
		.data(foodgroups)
		.enter()
		.append("rect")
		.attr("class", function(d, i) {
			return foodgroupsShortcuts[i] + "Rect" + " secondNode node"
		})
		.attr("id", foodgroupsShortcuts[i])
		.attr("fill", function(d, i) {
			return c10(i);
		})
		.attr("x", (sankeyWidth - margin.right - nodeWidth) / 2)
		.attr("y", 0)
		.attr("height", 0)
		.attr("width", nodeWidth)
		.style("opacity", function(d, i) {
			if (foodgroupsShortcuts[i] == "grains" || foodgroupsShortcuts[i] == "meat"){
				return 1
			}
			else {
				return 0.7
			}
		})

	var foodgroupTitles = sankeysvg.selectAll(".secondTitles")
		.data(foodgroups)
		.enter()
		.append("text")
		.attr("class", function(d, i) {
			return foodgroupsShortcuts[i] + "nodeTitle"+" secondTitles sankeylabels"
		})
		.attr("x", (sankeyWidth - margin.right - nodeWidth) / 2 + nodeWidth + 5)
		.attr("y", 0)
		.style("opacity", function(d, i) {
			if (foodgroupsShortcuts[i] == "grains" || foodgroupsShortcuts[i] == "meat"){
				return 1
			}
			else {
				return 0.7
			}
		})

	var links = sankeysvg.selectAll(".link")
		.data(foodgroups)
		.enter()
		.append("polygon")
		.attr("class", function(d, i) {
			return foodgroupsShortcuts[i] + " link"
		})
	    .attr("points", "0,0 0,0 0,0 0,0")
	    .style("fill", "rgb(211, 211, 211)");

	grainTypes = ["Oats", "Rye", "Barley", "Sorghum", "Maize", "Wheat", "Rice"];

	var thirdNodeRects = sankeysvg.selectAll(".thirdNode")
		.data(grainTypes)
		.enter()
		.append("rect")
		.attr("class", function(d, i) {
			return grainTypes[i] + "Rect" + " thirdNode node"
		})
		.attr("fill", function(d, i) {
			return LightenDarkenColor(c10(7), (100 - (30 * i)));
		})
		.attr("x", (sankeyWidth - margin.right - nodeWidth))
		.attr("y", 0)
		.attr("height", 0)
		.attr("width", nodeWidth)
		.style("opacity", function(d, i) {
			return (0.3 + (0.1 * i));
		});

	var thirdNodeLinks = sankeysvg.selectAll(".thirdNodeLink")
		.data(grainTypes)
		.enter()
		.append("polygon")
		.attr("class", function(d, i) {
			return grainTypes[i] + " thirdNodeLink link"
		})
	    .attr("points", "0,0 0,0 0,0 0,0")
	    .style("fill", "rgb(211, 211, 211)");

	var thirdNodeTitles = sankeysvg.selectAll(".thirdNodeTitles")
		.data(grainTypes)
		.enter()
		.append("text")
		.attr("class", function(d, i) {
			return grainTypes[i] + "nodeTitle"+" thirdNodeTitles sankeylabels"
		})
		.attr("x", (sankeyWidth - margin.right - nodeWidth) + nodeWidth + 5)
		.attr("y", 0)


	meatTypes = ["Sheep & Goat", "Beef & Buffalo", "Pig", "Poultry"];
	meatShortcuts = ["sheep", "beef", "pig", "poultry"];

	var meatRects = sankeysvg.selectAll(".meatNode")
		.data(meatTypes)
		.enter()
		.append("rect")
		.attr("class", function(d, i) {
			return meatShortcuts[i] + "Rect" + " meatNode node"
		})
		.attr("fill", function(d, i) {
			return LightenDarkenColor(c10(2), (50 - (30 * i)));
		})
		.attr("x", (sankeyWidth - margin.right - nodeWidth))
		.attr("y", 0)
		.attr("height", 0)
		.attr("width", nodeWidth)

	var meatNodeLinks = sankeysvg.selectAll(".meatNodeLink")
		.data(meatTypes)
		.enter()
		.append("polygon")
		.attr("class", function(d, i) {
			return meatShortcuts[i] + " meatNodeLink link"
		})
	    .attr("points", "0,0 0,0 0,0 0,0")
	    .style("fill", "rgb(211, 211, 211)");

	var meatNodeTitles = sankeysvg.selectAll(".meatNodeTitles")
		.data(meatTypes)
		.enter()
		.append("text")
		.attr("class", function(d, i) {
			return	meatShortcuts[i] + "nodeTitle"+" meatNodeTitles"
		})
		.attr("x", (sankeyWidth - margin.right - nodeWidth) + nodeWidth + 5)
		.attr("y", 0)

	heightScale = d3.scale.linear()
		.domain([0, 4000])
		.range([0, sankeyHeight - margin.bottom - margin.top])
}

function updateSankey(country, year, svgname) {

	console.log(country, year)

	sankeysvg = d3.select("." + svgname)

	if (year > 2013) {
		year = 2013;
	}

	sankeysvg.selectAll(".link")
			.attr("opacity", 1)

	sankeysvg.selectAll(".thirdNode")
		.style("opacity", 0);

	sankeysvg.selectAll(".meatNode")
		.style("opacity", 0);

	sankeysvg.selectAll(".thirdNodeLink")
		.style("opacity", 0);

	sankeysvg.selectAll(".meatNodeLink")
		.style("opacity", 0);

	sankeysvg.selectAll(".noDataMessage")
		.remove()

	sankeysvg.selectAll(".thirdNodeTitles")
		.style("opacity", 0)
		.style("font-size", 11)

	sankeysvg.selectAll(".meatNodeTitles")
		.style("opacity", 0)
		.style("font-size", 11)

	sankeysvg.select(".sankeytitle")
		.text(function() {
			if (country.length > 12) {
				for (i = 0; i < countryAbbreviations.length; i++) {
					if (countryAbbreviations[i]["name"] == country) {
						return countryAbbreviations[i]["alpha-3"] + ", " + year
					}
				}
			}
			else {
				return country + ", " + year
			}
		})

	// sankeysvg.select(".sankeyYearTitle")
	// 	.text(year)

	country = country.replace(/\s+/g, "")

	

	cumulativeHeight = 0;
	heightList = [0];

	var sankeyTip = d3.tip()
		.attr('class', 'd3-tip')
		.offset([-10, 0])
		.html(function(d) {
			return "<strong>Food group: </strong> <span>" + d + 
			"<br> <strong> Calories: </strong> <span>" +
			countryCaloriesData[d]
		})
		.style("z-index", 2)

	// call the tooltip
	sankeysvg.call(sankeyTip);

	foodgroupDataFound = false;

	for (i = 0; i < foodgroupCalories.length; i++) {

		if (foodgroupCalories[i]["Entity"].replace(/\s+/g, "") == country) {
			if (foodgroupCalories[i]["Year"] == year) {
				foodgroupDataFound = true;
				countryCaloriesData = foodgroupCalories[i]

				sankeysvg.select(".calRect")
					.transition()
					.attr("height", function(d) {
						calHeight = heightScale(foodgroupCalories[i]["Total"]);
						return calHeight;
					})
					.attr("y", function() {
						calY = sankeyHeight/2 - calHeight/2;
						return calY;
					});

				sankeysvg.select(".caloriestitle")
					.text(function() {
						return "Calories: " + foodgroupCalories[i]["Total"]
					})

				for (j = 0; j < foodgroups.length; j++) {
					rectClass = foodgroupsShortcuts[j] + "Rect";

					sankeysvg.select("." + rectClass)
						.on("mouseover", function(d) {
							sankeyTip.show(d)
						})
						.on("mouseout", sankeyTip.hide)
						.on("click", function(d) {
							if (d == "Cereals & Grains") {
								createGrainSankey(country, year, svgname);
							}
							else if (d == "Meat") {
								calories = countryCaloriesData[d]
								createMeatSankey(country, year, calories, svgname);
							}
						})
						.transition()
						.attr("y", function() {
							secondNodesHeight = calHeight + ((foodgroups.length - 1) * 10)
							secondNodesY = sankeyHeight/2 - secondNodesHeight/2;
							return secondNodesY + cumulativeHeight + (10 * j)
						})
						.attr("height", function() {
							height = heightScale(foodgroupCalories[i][foodgroups[j]])
							
							cumulativeHeight = cumulativeHeight + height
							heightList.push(cumulativeHeight)
							return height
						})
						

					sankeysvg.selectAll("." + foodgroupsShortcuts[j])
						.transition()
					    .attr("points", function(d, i) {
					    	x1 = sankeyMargin.right + nodeWidth
					    	x2 = (sankeyWidth - margin.right - nodeWidth) / 2
					    	y1 = calY + heightList[j]
					    	y2 = calY + heightList[j + 1]
					    	y3 = secondNodesY + heightList[j + 1] + (10 * j)
					    	y4 = secondNodesY + heightList[j] + (10 * j)
					    	return (x1 + "," + y1 + " " + x1 + "," + y2 + " " + x2 + "," + y3 + " " + x2 + "," + y4)
					    })
					    .style("fill", "rgb(211, 211, 211)")

					sankeysvg.selectAll("." + foodgroupsShortcuts[j] + "nodeTitle")
						.attr("y", secondNodesY + ((heightList[j] + heightList[j + 1])/2) + (10 * (j)) + 5)
						.text(foodgroups[j]);
				}
			}
		}
	}

	if (foodgroupDataFound == false) {
		noDataMessage(1);

		sankeysvg.selectAll(".node")
			.attr("height", 0)

		sankeysvg.selectAll(".link")
			.attr("opacity", 0)

		sankeysvg.selectAll(".sankeylabels")
			.text("")
	}

	createCompareButton();
}

function createGrainSankey(country, year, svgname) {

	sankeysvg = d3.select("." + svgname)

	cumulativeGrainHeight = 0;
	heightGrainList = [0];

	var thirdNodeTip = d3.tip()
		.attr('class', 'd3-tip')
		.offset([-10, 0])
		.html(function(d, calories) {
			return "<strong>Food group: </strong> <span>" + d + 
			"<br> <strong> Calories: </strong> <span>" +
			countryCerealData[d]
		})
		.style("z-index", 2)

	// call the tooltip
	sankeysvg.call(thirdNodeTip);

	grainDataFound = false;

	for (i = 0; i < cerealCalories.length; i++) {
		if (cerealCalories[i]["Entity"] == country) {
			if (cerealCalories[i]["Year"] == year) {
				grainDataFound = true;
				countryCerealData = cerealCalories[i];
				if (foodgroupCalories[i] == undefined) {
						noDataMessage(2);
						break
					}

				for (j = 0; j < grainTypes.length; j++) {
					sankeysvg.selectAll("." + grainTypes[j] + "Rect")
						.on("mouseover", thirdNodeTip.show)
						.on("mouseout", thirdNodeTip.hide)
						.transition()
						.style("opacity", 1)
						.attr("y", function() {
							grainHeight = heightScale(foodgroupCalories[i]["Cereals & Grains"]);
							grainY = heightList[7] + 70 + secondNodesY
							thirdNodesHeight = grainHeight + ((grainTypes.length - 1) * 10);
							thirdNodesY = grainY - ((thirdNodesHeight - grainHeight)/2)				
							return thirdNodesY + cumulativeGrainHeight + (10 * j)
						})
						.attr("height", function() {
							height = heightScale(cerealCalories[i][grainTypes[j]])

							if (height == 0) {
								sankeysvg.selectAll("." + grainTypes[j] + "nodeTitle")
									.style("font-size", 0)
							} 
							
							cumulativeGrainHeight = cumulativeGrainHeight + height
							heightGrainList.push(cumulativeGrainHeight)
							return height
						})

					sankeysvg.selectAll("." + grainTypes[j] + "nodeTitle")
						.style("opacity", 1)
						.attr("y", thirdNodesY + ((heightGrainList[j] + heightGrainList[j + 1])/2) + (10 * (j)) + 5)
						.text(grainTypes[j]);

					sankeysvg.selectAll("." + grainTypes[j])
						.transition()
					    .attr("points", function(d, i) {
					    	x1 = (sankeyWidth - margin.right - nodeWidth) / 2 + nodeWidth
					    	x2 = (sankeyWidth - margin.right - nodeWidth)
					    	console.log(heightGrainList)
					    	y1 = grainY + heightGrainList[j]
					    	y2 = grainY + heightGrainList[j + 1]
					    	y3 = thirdNodesY + heightGrainList[j + 1] + (10 * j)
					    	y4 = thirdNodesY + heightGrainList[j] + (10 * j)
					    	return (x1 + "," + y1 + " " + x1 + "," + y2 + " " + x2 + "," + y3 + " " + x2 + "," + y4)
					    })
					    .style("opacity", 1)
					    .style("fill", "rgb(211, 211, 211)")


				}
			}
		}
	}

	if (grainDataFound == false) {
		noDataMessage(2);
	}
}

function createMeatSankey(country, year, calories, svgname) {
	sankeysvg = d3.select("." + svgname)

	cumulativeMeatHeight = 0;
	heightMeatList = [0];

	var meatNodeTip = d3.tip()
		.attr('class', 'd3-tip')
		.offset([-10, 0])
		.html(function(d, calories) {
			return "<strong>Food group: </strong> <span>" + d + 
			"<br> <strong> Calories: </strong> <span>" +
			Math.round(countryMeatData[d])
		})
		.style("z-index", 2)

	// call the tooltip
	sankeysvg.call(meatNodeTip);

	meatDataFound = false;

	for (i = 0; i < meatPercentage.length; i++) {
		if (meatPercentage[i]["Entity"] == country) {
			if (meatPercentage[i]["Year"] == year) {
				meatDataFound = true;
				countryMeatData = meatPercentage[i];
				for (j = 0; j < meatTypes.length; j++) {
					console.log(meatPercentage[i][meatTypes[j]])

					meatPercentage[i][meatTypes[j]] = (meatPercentage[i][meatTypes[j]] / 100) * calories
					console.log(foodgroupCalories[i])
					if (foodgroupCalories[i] == undefined) {
						noDataMessage(2);
						break
					}
					
					console.log(meatPercentage[i][meatTypes[j]])
					sankeysvg.selectAll("." + meatShortcuts[j] + "Rect")
						.on("mouseover", meatNodeTip.show)
						.on("mouseout", meatNodeTip.hide)
						.transition()
						.style("opacity", 1)
						.attr("y", function() {
							meatHeight = heightScale(foodgroupCalories[i]["Meat"]);
							meatY = heightList[2] + 20 + secondNodesY
							thirdNodesHeight = meatHeight + ((meatTypes.length - 1) * 10);
							thirdNodesY = meatY - ((thirdNodesHeight - meatHeight)/2)				
							return thirdNodesY + cumulativeMeatHeight + (10 * j)
						})
						.attr("height", function() {
							height = heightScale(meatPercentage[i][meatTypes[j]])

							if (height == 0) {
								sankeysvg.selectAll("." + meatShortcuts[j] + "nodeTitle")
									.style("font-size", 0)
							} 
							
							cumulativeMeatHeight = cumulativeMeatHeight + height
							heightMeatList.push(cumulativeMeatHeight)
							return height
						})

					sankeysvg.selectAll("." + meatShortcuts[j])
						.transition()
					    .attr("points", function(d, i) {
					    	x1 = (sankeyWidth - margin.right - nodeWidth) / 2 + nodeWidth
					    	x2 = (sankeyWidth - margin.right - nodeWidth)
					    	y1 = meatY + heightMeatList[j]
					    	y2 = meatY + heightMeatList[j + 1]
					    	y3 = thirdNodesY + heightMeatList[j + 1] + (10 * j)
					    	y4 = thirdNodesY + heightMeatList[j] + (10 * j)
					    	return (x1 + "," + y1 + " " + x1 + "," + y2 + " " + x2 + "," + y3 + " " + x2 + "," + y4)
					    })
					    .style("opacity", 1)
					    .style("fill", "rgb(211, 211, 211)")

					sankeysvg.selectAll("." + meatShortcuts[j] + "nodeTitle")
						.style("opacity", 1)
						.attr("y", thirdNodesY + ((heightMeatList[j] + heightMeatList[j + 1])/2) + (10 * (j)) + 5)
						.text(meatTypes[j]);
				}
			}
		}
	}

	if (meatDataFound == false) {
		noDataMessage(2);
	}
}

function noDataMessage(position) {
	sankeysvg.append("text")
			.attr("class", "noDataMessage")
			.attr("x", function() {
				if (position == 1) {
					return sankeyWidth / 2
				}
				else if (position == 2) {
					return sankeyWidth - margin.right - nodeWidth
				}
			})
			.attr("y", sankeyHeight/2)
			.style("font-size", 18)
			.style("fill", "gray")
			.text("No data available")
}

// source: https://css-tricks.com/snippets/javascript/lighten-darken-color/
function LightenDarkenColor(col, amt) {
  
    var usePound = false;
  
    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }
 
    var num = parseInt(col,16);
 
    var r = (num >> 16) + amt;
 
    if (r > 255) r = 255;
    else if  (r < 0) r = 0;
 
    var b = ((num >> 8) & 0x00FF) + amt;
 
    if (b > 255) b = 255;
    else if  (b < 0) b = 0;
 
    var g = (num & 0x0000FF) + amt;
 
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
 
    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
  
}

