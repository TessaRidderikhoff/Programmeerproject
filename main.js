window.onload = function() {

	// wait for all datasets to load
	d3.queue()
		.defer(d3.json, "sources/custom.geo.json")
		.defer(d3.json, "sources/AdultsObese.json")
		.defer(d3.json, "sources/FemalesObese.json")
		.defer(d3.json, "sources/MalesObese.json")
		.defer(d3.json, "sources/Calories.json")
		.defer(d3.json, "sources/CardiovascularDeaths.json")
		.defer(d3.json, "sources/GDP.json")
		.defer(d3.json, "sources/InsuffientlyActive.json")
		.defer(d3.json, "sources/MeanYearsOfSchooling.json")
		.defer(d3.json, "sources/Diabetes2015.json")
		.defer(d3.json, "sources/HighBloodPressure.json")
		.defer(d3.json, "sources/CancerPrevalence.json")
		.defer(d3.json, "sources/FoodgroupCalories.json")
		.defer(d3.json, "sources/CerealCalories.json")
		.defer(d3.json, "sources/meatPercentage.json")
		.awaitAll(main);
}

function main (error, loadedJSONs) {
	if (error) throw error;

	geojson = loadedJSONs[0]
	adultsObese = loadedJSONs[1]
	femalesObese = loadedJSONs[2]
	malesObese = loadedJSONs[3]
	caloriesData = loadedJSONs[4]
	cardiovascData = loadedJSONs[5]
	GDP = loadedJSONs[6]
	insuffientlyActive = loadedJSONs[7]
	meanYearsOfSchooling = loadedJSONs[8]
	diabetes = loadedJSONs[9]
	highBloodPressure = loadedJSONs[10]
	cancer = loadedJSONs[11]
	foodgroupCalories = loadedJSONs[12]
	cerealCalories = loadedJSONs[13]
	meatPercentage = loadedJSONs[14]

	createMap();
	createSlider();
	createScatter();
	createSankey("sankeysvg");
	// createSankey("secondsankeysvg");
}





