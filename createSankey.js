function createSankey() {

	sankeyMargin = {top: 50, bottom: 50, right: 20, left: 20}
	sankeyWidth = 800;
	sankeyHeight = 400;

	sankeysvg = d3.select(".sankeysvg")

	var sankeyTitle = sankeysvg
		.append("text")
		.attr("class", "sankeytitle")
		.attr("x", 0)
		.attr("y", sankeyMargin.top/2)
		.style("fill", "gray")

	var caloriesTitle = sankeysvg
		.append("text")
		.attr("class", "caloriestitle")
		.attr("transform", "rotate(-90)")
        .attr("y", 0)
        .attr("x", -margin.left - 100)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
		// .attr("x", sankeyMargin.bottom)
		// .attr("y", sankeyMargin.left)

		

	caloriesRect = sankeysvg
		.append("rect")
		.attr("class", "calRect")
		.attr("x", sankeyMargin.right)
		.attr("y", sankeyMargin.top)
		.attr("height", 0)
		.attr("width", 40)
		.attr("fill", c10(0));

	foodgroups = ["Sugar", "Oils & Fats", "Meat", "Dairy & Eggs", "Fruits & Vegetables", "Starchy Roots", "Pulses", "Cereals & Grains", "Alcoholic Beverages", "Other"];
	foodgroupsShortcuts = ["sugar", "oil", "meat", "dairy", "fruit", "roots", "pulses", "grains", "alcohol", "other"];
	
	foodgroupRects = sankeysvg.selectAll(".secondNode")
		.data(foodgroups)
		.enter()
		.append("rect")
		.attr("class", function(d, i) {
			return foodgroupsShortcuts[i] + "Rect" + " secondNode"
		})
		.attr("fill", function(d, i) {
			return c10(i);
		})
		.attr("x", sankeyWidth / 2)
		.attr("y", 0)
		.attr("height", 0)
		.attr("width", 40)

	links = sankeysvg.selectAll(".link")
		.data(foodgroups)
		.enter()
		.append("polygon")
		.attr("class", function(d, i) {
			return foodgroupsShortcuts[i] + " link"
		})
	    .attr("points", "0,0 0,0 0,0 0,0")
	    .style("fill", "rgb(211, 211, 211)");


	heightScale = d3.scale.linear()
		.domain([0, 4000])
		.range([0, sankeyHeight - margin.bottom])
}

function updateSankey(country, year) {

	console.log(country, year)


	if (year > 2013) {
		year = 2013;
	}

	sankeysvg.select(".sankeytitle")
		.text(country + ", " + year)

	country = country.replace(/\s+/g, "")

	sankeysvg.select(".caloriestitle")
		.text("Calories")

	cumulativeHeight = 0;
	heightList = [0];

	var sankeyTip = d3.tip()
		.attr('class', 'd3-tip')
		.offset([-10, 0])
		.html(function(d, calories) {
			return "<strong>Food group: </strong> <span>" + d + 
			"<br> <strong> Calories: </strong> <span>" +
			calories
		})
		.style("z-index", 2)

	// call the tooltip
	sankeysvg.call(sankeyTip);

	for (i = 0; i < foodgroupCalories.length; i++) {

		if (foodgroupCalories[i]["Entity"].replace(/\s+/g, "") == country) {
			if (foodgroupCalories[i]["Year"] == year) {
				countryCaloriesData = foodgroupCalories[i]
				console.log(countryCaloriesData)

				d3.select(".calRect")
					.transition()
					.attr("height", heightScale(foodgroupCalories[i]["Total"]));

				for (j = 0; j < foodgroups.length; j++) {
					rectClass = foodgroupsShortcuts[j] + "Rect";

					d3.select("." + rectClass)
						.on("mouseover", function(d) {
							sankeyTip.show(d, countryCaloriesData[d])
						})
						.on("mouseout", sankeyTip.hide)
						.on("click", function(d) {
							if (d == "Cereals & Grains") {
								createGrainSankey(country, year);
							}
						})
						.transition()
						.attr("y", cumulativeHeight + (10 * j))
						.attr("height", function() {
							height = heightScale(foodgroupCalories[i][foodgroups[j]])
							
							cumulativeHeight = cumulativeHeight + height
							heightList.push(cumulativeHeight)
							return height
						})
						

					sankeysvg.selectAll("." + foodgroupsShortcuts[j])
						.transition()
					    .attr("points", function(d, i) {
					    	x1 = sankeyMargin.right + 40
					    	x2 = sankeyWidth / 2 
					    	y1 = sankeyMargin.top + heightList[j]
					    	y2 = sankeyMargin.top + heightList[j + 1]
					    	y3 = heightList[j + 1] + (10 * j)
					    	y4 = heightList[j] + (10 * j)
					    	return (x1 + "," + y1 + " " + x1 + "," + y2 + " " + x2 + "," + y3 + " " + x2 + "," + y4)
					    })
					    .style("fill", "rgb(211, 211, 211)")
				}
			}
		}
	}
}

function createGrainSankey(country, year) {
	console.log(country, year)

	grainTypes = ["Oats", "Rye", "Barley", "Sorghum", "Maize", "Wheat", "Rice"];

	foodgroupRects = sankeysvg.selectAll(".thirdNode")
		.data(grainTypes)
		.enter()
		.append("rect")
		.attr("class", function(d, i) {
			return grainTypes[i] + "Rect" + " thirdNode"
		})
		.attr("fill", function(d, i) {
			return c10(i);
		})
		.attr("x", sankeyWidth / 2 + 200)
		.attr("y", 0)
		.attr("height", 0)
		.attr("width", 40)

	console.log(cerealCalories[5])

	cumulativeGrainHeight = 0;
	heightGrainList = [0];

	for (i = 0; i < cerealCalories.length; i++) {
		if (cerealCalories[i]["Entity"] == country) {
			if (cerealCalories[i]["Year"] == year) {
				console.log(cerealCalories[i])

				for (j = 0; j < grainTypes.length; j++) {
					d3.selectAll("." + grainTypes[j] + "Rect")
						.transition()
						.attr("y", cumulativeHeight + (10 * j))
						.attr("height", function() {
							height = heightScale(cerealCalories[i][grainTypes[j]])
							
							cumulativeGrainHeight = cumulativeGrainHeight + height
							heightGrainList.push(cumulativeGrainHeight)
							return height
						})
				}
			}
		}
	}
}