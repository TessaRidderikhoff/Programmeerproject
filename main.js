window.onload = function() {

	// wait for all datasets to load
	d3.queue()
		.defer(d3.json, "sources/custom.geo.json")
		.defer(d3.json, "sources/AdultsObese.json")
		.defer(d3.json, "sources/FemalesObese.json")
		.defer(d3.json, "sources/MalesObese.json")
		.defer(d3.json, "sources/Calories.json")
		.defer(d3.json, "sources/CardiovascularDeaths.json")
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

	createMap();
	createSlider();
	createScatter();
}





