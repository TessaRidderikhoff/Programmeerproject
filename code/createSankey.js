function createSankey(svgname) {
/* This function prepares all elements for the sankey diagram, in a specified
svg, but does not display anything yet. */

	// select the svg that is specified
	sankeysvg = d3.select("." + svgname)

	// set svg properties
	sankeyMargin = {top: 80, bottom: 40, right: 80, left: 20}
	sankeyWidth = Number(sankeysvg.attr("width"));
	sankeyHeight = Number(sankeysvg.attr("height"));;

	nodeWidth = 40;

	// create sankkey title (without giving text yet)
	var sankeyTitle = sankeysvg
		.append("text")
		.attr("class", "sankeytitle graphtitle")
		.attr("x", 0)
		.attr("y", sankeyMargin.top/2)
		.style("fill", "gray")

	// create label for calorie-node
	var caloriesTitle = sankeysvg
		.append("text")
		.attr("class", "caloriestitle sankeylabels")
		.attr("transform", "rotate(-90)")
        .attr("y", 0)
        .attr("x", -sankeyMargin.left - 110)
        .attr("width", sankeyHeight)
        .style("text-anchor", "middle")
        .attr("dy", ".71em")
        .style("text-anchor", "end")

    // create calorie-node (height and y not specified, so not visible yet)
	var caloriesRect = sankeysvg
		.append("rect")
		.attr("class", "calRect node")
		.attr("x", sankeyMargin.left)
		.attr("width", nodeWidth)
		.attr("fill", c10(0));

	// specify foodgroups the calories are divided in
	foodgroups = ["Sugar", "Oils & Fats", "Meat", "Dairy & Eggs", "Fruits & Vegetables", "Starchy Roots", "Pulses", "Cereals & Grains", "Alcoholic Beverages", "Other"];
	
	// specify the shortcuts of these foodgroups (for class/id purposes)
	foodgroupsShortcuts = ["sugar", "oil", "meat", "dairy", "fruit", "roots", "pulses", "grains", "alcohol", "other"];
	
	// create foodgroup nodes (height and y not specified, so not visible yet)
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
		.attr("x", (sankeyWidth - sankeyMargin.right - nodeWidth) / 2)
		.attr("width", nodeWidth)

	// create labels for the foodgroup-nodes (text and y not yet specified)
	var foodgroupTitles = sankeysvg.selectAll(".secondTitles")
		.data(foodgroups)
		.enter()
		.append("text")
		.attr("class", function(d, i) {
			return foodgroupsShortcuts[i] + "nodeTitle"+" secondTitles sankeylabels"
		})
		.attr("x", (sankeyWidth - sankeyMargin.right - nodeWidth) / 2 + nodeWidth + 5)

	// create links from the calorie-node to the foodgroup-nodes
	var links = sankeysvg.selectAll(".link")
		.data(foodgroups)
		.enter()
		.append("polygon")
		.attr("class", function(d, i) {
			return foodgroupsShortcuts[i] + " link"
		})

		// colour of all links is grey
	    .style("fill", "rgb(211, 211, 211)");

	// specify the possible grain-types in the Cereals & Grains foodgroup
	grainTypes = ["Oats", "Rye", "Barley", "Sorghum", "Maize", "Wheat", "Rice"];
	grainShortcuts = ["oats", "rye", "barley", "sorghum", "maize", "wheat", "rice"];

	// create nodes for the grain-foodgroup for the different graintypes
	var grainNodeRects = sankeysvg.selectAll(".grainNode")
		.data(grainShortcuts)
		.enter()
		.append("rect")
		.attr("class", function(d, i) {
			return grainShortcuts[i] + "Rect" + " grainNode node"
		})

		// colour the grain-nodes with the colour of the parent-node, but lighter/darker
		.attr("fill", function(d, i) {
			
			// this makes every node a shade darker than the last
			return LightenDarkenColor(c10(7), (100 - (30 * i)));
		})
		.attr("x", (sankeyWidth - sankeyMargin.right - nodeWidth))
		.attr("width", nodeWidth);

	// create links to the grainnodes (without shape yet)
	var grainNodeLinks = sankeysvg.selectAll(".grainNodeLink")
		.data(grainTypes)
		.enter()
		.append("polygon")
		.attr("class", function(d, i) {
			return grainTypes[i] + " grainNodeLink link"
		})
	    .style("fill", "rgb(211, 211, 211)");

	// create labels for the grain nodes (without text yet)
	var grainNodeTitles = sankeysvg.selectAll(".grainNodeTitles")
		.data(grainTypes)
		.enter()
		.append("text")
		.attr("class", function(d, i) {
			return grainShortcuts[i] + "nodeTitle"+" grainNodeTitles sankeylabels"
		})
		.attr("x", (sankeyWidth - sankeyMargin.right - nodeWidth) + nodeWidth + 5);

	// define different types of meat
	meatTypes = ["Sheep & Goat", "Beef & Buffalo", "Pig", "Poultry"];
	
	// define shortcuts for types of meat (for class/id purposes)
	meatShortcuts = ["sheep", "beef", "pig", "poultry"];

	// create nodes for the meat-foodgroup for the different types of meat
	var meatRects = sankeysvg.selectAll(".meatNode")
		.data(meatTypes)
		.enter()
		.append("rect")
		.attr("class", function(d, i) {
			return meatShortcuts[i] + "Rect" + " meatNode node"
		})

		// colour the nodes with different shades of the parentnode
		.attr("fill", function(d, i) {
			return LightenDarkenColor(c10(2), (50 - (30 * i)));
		})
		.attr("x", (sankeyWidth - sankeyMargin.right - nodeWidth))
		.attr("width", nodeWidth);

	// create links from the parentnode to the meatnode (not visible yet)
	var meatNodeLinks = sankeysvg.selectAll(".meatNodeLink")
		.data(meatTypes)
		.enter()
		.append("polygon")
		.attr("class", function(d, i) {
			return meatShortcuts[i] + " meatNodeLink link"
		})

		// colour of all links is grey
	    .style("fill", "rgb(211, 211, 211)");

	// create labels for the different types of meat
	var meatNodeTitles = sankeysvg.selectAll(".meatNodeTitles")
		.data(meatTypes)
		.enter()
		.append("text")
		.attr("class", function(d, i) {
			return	meatShortcuts[i] + "nodeTitle"+" meatNodeTitles"
		})
		.attr("x", (sankeyWidth - sankeyMargin.right - nodeWidth) + nodeWidth + 5);

	// create height-scale for all nodes
	heightScale = d3.scale.linear()

		// maximum calories eaten is around 4000
		.domain([0, 4000])
		.range([0, sankeyHeight - sankeyMargin.bottom - sankeyMargin.top])
}

function updateSankey(country, year, svgname) {
/* This function updates the first and second nodes of the sankey diagram in a 
specified svg, with the data of the selected country and year. */

	// select specified sankey-svg
	sankeysvg = d3.select("." + svgname)

	// restore opacity of links if opacity had been reduced by no-data message
	sankeysvg.selectAll(".link")
		.attr("opacity", 1)

	// reduce opacity to 0 of all nodes, links and titles of grain- and meat-nodes
	sankeysvg.selectAll(".grainNode")
		.style("opacity", 0);

	sankeysvg.selectAll(".meatNode")
		.style("opacity", 0);

	sankeysvg.selectAll(".grainNodeLink")
		.style("opacity", 0);

	sankeysvg.selectAll(".meatNodeLink")
		.style("opacity", 0);

	sankeysvg.selectAll(".grainNodeTitles")
		.style("opacity", 0)
		.style("font-size", 11)

	sankeysvg.selectAll(".meatNodeTitles")
		.style("opacity", 0)
		.style("font-size", 11)

	// remove the no-data-message if it was present
	sankeysvg.selectAll(".noDataMessage")
		.remove()

	// update title of diagram to current country and year
	sankeysvg.select(".sankeytitle")
		.text(function() {

			// if countryname is too long
			if (country.length > 12) {

				// use abbreviation of countryname
				for (i = 0; i < countryAbbreviations.length; i++) {
					if (countryAbbreviations[i]["name"] == country) {
						return countryAbbreviations[i]["alpha-3"] + ", " + year
					}
				}
			}

			// else, return countryname and year
			else {
				return country + ", " + year
			}
		})

	// remove spaces from countryname, to use name as id-check
	country = country.replace(/\s+/g, "")

	// initiate cumulative-height variable, to determine where next node can be placed
	cumulativeHeight = 0;

	// initiate heightlist, to store where all nodes are placed
	heightList = [0];

	// create tooltip for sankey-nodes, containing category and amount of calories
	var firstSankeyTip = d3.tip()
		.attr('class', 'd3-tip')
		.offset([-10, 0])
		.html(function(d) {
			return "<strong>Food group: </strong> <span>" + d + 
			"<br> <strong> Calories: </strong> <span>" +
			firstCountryCaloriesData[d]
		})
		.attr("class", svgname)

		// place tooltip above other elements
		.style("z-index", 2)

	var secondSankeyTip = d3.tip()
		.attr('class', 'd3-tip')
		.offset([-10, 0])
		.html(function(d) {
			return "<strong>Food group: </strong> <span>" + d + 
			"<br> <strong> Calories: </strong> <span>" +
			secondCountryCaloriesData[d]
		})
		.attr("class", svgname)

		// place tooltip above other elements
		.style("z-index", 2)

	sankeysvg.call(firstSankeyTip);
	sankeysvg.call(secondSankeyTip);

	// set data-checker to false
	foodgroupDataFound = false;

	// loop through countries
	for (i = 0; i < foodgroupCalories.length; i++) {

		// if country is dataset is the selected country
		if (foodgroupCalories[i]["Entity"].replace(/\s+/g, "") == country) {
			
			// and year in dataset is selected year 
			if (foodgroupCalories[i]["Year"] == year) {
				
				// data for this country & year is found - set data checker to true
				foodgroupDataFound = true;
				
				// store this data in variable
				countryCaloriesData = foodgroupCalories[i]

				// save this date per svg (for tooltips)
				if (svgname == "sankeysvg") {
					firstCountryCaloriesData = foodgroupCalories[i];
				}
				else {
					secondCountryCaloriesData = foodgroupCalories[i];
				}


				// select the total-calorie node to adjust its height and location
				sankeysvg.select(".calRect")
					.transition()
					
					// height of node is based on total amount of calories eaten on average
					.attr("height", function(d) {
						calHeight = heightScale(foodgroupCalories[i]["Total"]);
						return calHeight;
					})

					// y-location is based on height (to place node in middle of svg)
					.attr("y", function() {
						calY = sankeyHeight/2 - calHeight/2;
						return calY;
					});

				// update calorie-node title
				sankeysvg.select(".caloriestitle")
					
					// display how many calories are eaten on average a day
					.text(function() {
						return "Calories: " + foodgroupCalories[i]["Total"]
					})

				// loop through foodgroups in country-data
				for (j = 0; j < foodgroups.length; j++) {

					// recreate the class of the node to select node
					rectClass = foodgroupsShortcuts[j] + "Rect";

					// select the node that corresponds to current foodgroup
					sankeysvg.select("." + rectClass)

						// show tooltip on mouse-over and hide on mouse-out
						.on("mouseover", function(d) {
							if (svgname == "sankeysvg") {
								firstSankeyTip.show(d)
							}
							else {
								secondSankeyTip.show(d)
							}
							
						})
						.on("mouseout", firstSankeyTip.hide)
						.transition()

						// set y-location of foodgroup-node underneath last node
						.attr("y", function() {

							// calculate total height of all foodgroup-nodes
							secondNodesHeight = calHeight + ((foodgroups.length - 1) * 10)

							// determine startpoint of foodgroup-node
							secondNodesY = sankeyHeight/2 - secondNodesHeight/2;

							// return location of foodgroup-node
							return secondNodesY + cumulativeHeight + (10 * j)
						})

						// set height of foodgroup-node based on calories in foodgroup
						.attr("height", function() {

							// calculate height of node
							height = heightScale(foodgroupCalories[i][foodgroups[j]])
							
							// add height to the cumulative height variable
							cumulativeHeight = cumulativeHeight + height

							// add current cumulativeHeight to height-list (location of all nodes)
							heightList.push(cumulativeHeight)

							return height
						})
						
					// select links to foodgroup-nodes from first node
					sankeysvg.selectAll("." + foodgroupsShortcuts[j])
						.transition()
					    .attr("points", function(d, i) {

					    	// begin-x is right-side of calorie-node
					    	x1 = sankeyMargin.left + nodeWidth

					    	// end-x is left-side of foodgroup-nodes
					    	x2 = (sankeyWidth - sankeyMargin.right - nodeWidth) / 2
					    	
					    	// left side of links (based on height of calorie-node)
					    	y1 = calY + heightList[j]
					    	y2 = calY + heightList[j + 1]

					    	// right side of links (based on height of foodgroup-nodes)
					    	y3 = secondNodesY + heightList[j + 1] + (10 * j)
					    	y4 = secondNodesY + heightList[j] + (10 * j)

					    	// return points of links
					    	return (x1 + "," + y1 + " " + x1 + "," + y2 + " " + x2 + "," + y3 + " " + x2 + "," + y4)
					    });

				// end of foodgroup for-loop
				}

			// end of year if-statement
			}
		
		// end of country if-statement
		}
	
	// end of country for-loop
	}

	// if no data is found for country & year
	if (foodgroupDataFound == false) {

		// display no-data message
		noDataMessage();

		// set height of all nodes to 0
		sankeysvg.selectAll(".node")
			.attr("height", 0)

		// set opacity of all links to 0
		sankeysvg.selectAll(".link")
			.attr("opacity", 0)

		// remove text of all labels
		sankeysvg.selectAll(".sankeylabels")
			.text("")
	}

	// if data has been found for country & year 
	else {

		// set grain-nodes
		createThirdNodeSankey(country, year, svgname, "grain")

		// set meat-nodes
		calories = countryCaloriesData["Meat"]
		createThirdNodeSankey(country, year, svgname, "meat")

		// add labels to nodes
		addSecondNodeLabels();
	}
}

function createThirdNodeSankey(country, year, svgname, foodgroup) {
/* This function sets the third nodes of the sankey diagram, which gives 
additional information about either the grain- or meat-foodgroup. */

	// select right svg
	sankeysvg = d3.select("." + svgname)

	// keep track of the height of the nodes
	cumulativeNodeHeight = 0;
	heightNodeList = [0];

	// if foodgroup is grain, select this data
	if (foodgroup == "grain") {
		thirdNodeData = cerealCalories;
		category = "Cereals & Grains";
		categoriesFoodgroup = grainTypes;
		categoriesShortcuts = grainShortcuts;

		// grain is the seventh foodgroup (for selection)
		index = 7
	}

	// if foodgroup is meat, select this data
	else {
		thirdNodeData = meatPercentage;
		category = "Meat";
		categoriesFoodgroup = meatTypes;
		categoriesShortcuts = meatShortcuts;

		// meat is the second foodgroup (for selection)
		index = 2
	}

	// loop through countries
	for (i = 0; i < thirdNodeData.length; i++) {

		// if the country in the dataset is the requested country
		if (thirdNodeData[i]["Entity"] == country) {

			// and the year is the requested year
			if (thirdNodeData[i]["Year"] == year) {

				// use this data
				countryData = thirdNodeData[i];

				// loop through grain- or meat-types
				for (j = 0; j < categoriesFoodgroup.length; j++) {

					// select node of this foodgroup-type
					sankeysvg.selectAll("." + categoriesShortcuts[j] + "Rect")
						.transition()

						// restore opacity (if it was lowered)
						.style("opacity", 1)

						// determine location of node
						.attr("y", function() {

							// determine height of parent-node
							parentNodeHeight = heightScale(countryCaloriesData[category]);
							
							// determine location of parentnode
							parentNodeY = heightList[index] + (index * 10) + secondNodesY;
							
							// determine total height of all third nodes
							nodeHeight = parentNodeHeight + ((categoriesShortcuts.length - 1) * 10);
							
							// determine starting point of third nodes
							nodesY = parentNodeY - ((nodeHeight - parentNodeHeight)/2)				
							
							// return location of current node
							return nodesY + cumulativeNodeHeight + (10 * j)
						})

						// determine height of node
						.attr("height", function() {

							// meat dataset is in percentages, so calculated differently
							if (foodgroup == "meat") {
								height = heightScale((meatPercentage[i][meatTypes[j]] / 100) * calories)
							}

							// if foodgroup is grain, determine height regularly
							else {
								height = heightScale(thirdNodeData[i][categoriesFoodgroup[j]])
							}

							// if foodgroup-type has no calories, remove title of node
							if (height == 0) {
								sankeysvg.selectAll("." + categoriesShortcuts[j] + "nodeTitle")
									.style("font-size", 0)
							} 
							
							// update cumulative height variable
							cumulativeNodeHeight = cumulativeNodeHeight + height
							
							// add current cumulative height to list
							heightNodeList.push(cumulativeNodeHeight)

							// return height
							return height
						})

					// update node-titles
					sankeysvg.selectAll("." + categoriesShortcuts[j] + "nodeTitle")
						
						// restore opacity if it had been lowered
						.style("opacity", 1)
						.attr("y", nodesY + ((heightNodeList[j] + heightNodeList[j + 1])/2) + (10 * (j)) + 5)
						.text(categoriesFoodgroup[j]);

					// set links to third nodes
					sankeysvg.selectAll("." + grainTypes[j])
						.transition()
					    .attr("points", function(d, i) {

					    	// first x-location is right side of second nodes 
					    	x1 = (sankeyWidth - sankeyMargin.right - nodeWidth) / 2 + nodeWidth
					    	
					    	// second x-location is left side of third nodes
					    	x2 = (sankeyWidth - sankeyMargin.right - nodeWidth)

					    	// y-location are based on height of nodes
					    	y1 = parentNodeY + heightNodeList[j]
					    	y2 = parentNodeY + heightNodeList[j + 1]
					    	y3 = nodesY + heightNodeList[j + 1] + (10 * j)
					    	y4 = nodesY + heightNodeList[j] + (10 * j)
					    	return (x1 + "," + y1 + " " + x1 + "," + y2 + " " + x2 + "," + y3 + " " + x2 + "," + y4)
					    })

					    // restore opacity (if it was lowered)
					    .style("opacity", 1)
				}
			}
		}
	}
}

function addSecondNodeLabels() {
/* This function adds the labels to the second nodes. */

	// loop through foodgroups
	for (j = 0; j < foodgroups.length; j++) {

		// select title of foodgroup
		sankeysvg.selectAll("." + foodgroupsShortcuts[j] + "nodeTitle")
			
			// move title in front of links
			.moveToFront()
			.transition()
			.attr("y", secondNodesY + ((heightList[j] + heightList[j + 1])/2) + (10 * (j)) + 5)
			.text(foodgroups[j]);
	}
}

function noDataMessage() {
/* This function returns a no-data message, when no data is available for the
sankey-diagram. */

	// subtract 1 from click-counter, so next diagram will be placed in same svg
	timesClicked -= 1;

	// append the no-data message
	var noDataMessage = sankeysvg.append("text")
			.attr("class", "noDataMessage")
			.attr("y", sankeyHeight/2)
			.style("font-size", 18)
			.style("fill", "gray")
			.text("No data available")

	// put the message in the middle of the svg
	noDataMessage
		.attr("x", function() {
			var textwidth = d3.select(".xAxisTitle").node()
		    	.getBoundingClientRect()
		    	.width;

				return sankeyWidth / 2 - textwidth / 2
			})
}

// source: https://css-tricks.com/snippets/javascript/lighten-darken-color/
function LightenDarkenColor(col, amt) {
/* This function returns lighter or darker shades of a colour. */
  
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

d3.selection.prototype.moveToFront = function() {
  return this.each(function(){
    this.parentNode.appendChild(this);
  });
};

