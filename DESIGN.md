# Design

## Overview files & functions
- HTML
- createGraphs
	- createSlider
	- updateSlider
		- calls updateMap, updateScatter, updateSankey
	- createMap
	- updateMap
	- createScatter
	- updateScatter
	- createSankey
		- calls updateSankey if sankey exists
	- updateSankey

## World map
### Data
For the world map, I will need data on the percentage of obese people per country to colour the countries according to the obese population. For the slider, this data is necessary from years 1975 to 2015. I will need 3 different datasets, one for all adults, one for males only and one for females. 

The data will be transformed as such:

Country | 1975 | 1976 | 1977 | etc.
--- | --- | --- | --- | ---
Afghanistan | ... | ... | ... | ...
Albania | ... | ... | ... | ...
Algeria | ... | ... | ... | ...
etc. | ... | ... | ... | ...

A GeoJSON of the world will be necessary to create the map. I have created a world map before, which can be used in this visualization as well.

### Function
The function to create the world map will start by creating a blank map of the world using the GeoJSON. Then, the obesity data will be loaded (default: adults, 2015), and the countries on the world map will be coloured accordingly. 

After, a legend will be created to explain the colours used. 

There will also be another function, the updateMap function, which will be called whenever the slider is moved to another year, or the user wants to see the obesity percentage of the males or females only. This function only changes the colours of the countries on the map, while the map and legend will remain unchanged.

When hovered over a country, the opacity of the other countries will decrease and a tooltip will be shown, displaying the name of the country and the percentage of obesity. The scatterplot will also show the dot representing the country by decreasing the opacity of the other dots.

When clicked on a country, the sankey diagram will be updated.


## Scatterplot
### Data
- Country-data (dots)
	- Obesity percentage (size of dots)
	- Continent of country (colour of dots)

- Drivers-data (x-axis)
	- Average education
	- Average GDP
	- Average number of calories eaten
	- Percentage of people who exercise suffiently

- Impact data (y-axis)
	- Diabetes percentage
	- Heart- and vascular disease percentage
	- High blood pressure percentage
	- Cancer percentage

Format of datasets (except continent of countries):

Country | 1975 | 1976 | 1977 | etc.
--- | --- | --- | --- | ---
Afghanistan | ... | ... | ... | ...
Albania | ... | ... | ... | ...
Algeria | ... | ... | ... | ...
etc. | ... | ... | ... | ...

### Function
First, a function createScatter is needed, that creates a scatterplot using the default values for the axes (for example, education on x-axis and diabetes on y-axis).

This function will first plot the data, then create a legend displaying the colours of the different continents.

When the slider is moved, or different variables for the x- or y-axis are selected, an updateScatter function is called, that relocates the dots on the scatterplot according to the new data.

When hovered over a dot, the opacity of the other dots will decrease and a tooltip will appear, clarifying the country the dot represents, the percentage of obesity in that country (represented by size of dot) and the x and y values. This country will also be the only country on the world map whose opacity is not temporarely decrease as well, clarifying the location of the country.

When clicked on a dot, the sankey diagram will be updated.

## Sankey-diagram
### Data
The sankey-diagram displays the number of calories eaten a day on average in a country, and what food groups those calories are mostly in (for example grain, meat, vegetables, etc.). For some of those food groups, it will also be displayed what specifically is usually eaten (for example what types of fruit). Therefore, the datasets needed are:

- Number of calories eaten on average for each year 
	- Food groups eaten (in calories)
		- Types of grains eaten (in calories)
		- Types of meat eaten (in calories)
		- Types of fruit eaten (in calories)
		(possibly more)

The format of the calories eaten on average:

Country | 1975 | 1976 | 1977 | etc.
--- | --- | --- | --- | ---
Afghanistan | ... | ... | ... | ...
Albania | ... | ... | ... | ...
Algeria | ... | ... | ... | ...
etc. | ... | ... | ... | ...

The format of the calories eaten per food group:

Country | Food group | 1975 | 1976 | 1977 | etc.
--- | --- | --- | --- | --- | ---
Afghanistan | Food group 1 | ... | ... | ... | ...
Afghanistan | Food group 2 | ... | ... | ... | ...
Afghanistan | Food group 3 | ... | ... | ... | ...
Afghanistan | etc. | ... | ... | ... | ...
Albania | Food group 1 | ... | ... | ... | ...
Albania | Food group 2 | ... | ... | ... | ...
Albania | Food group 3 | ... | ... | ... | ...
Albania | etc. | ... | ... | ... | ...
etc. | ... | ... | ... | ... | ...

The format of the calories eaten in each food group (3 datasets):

Country | Type food | 1975 | 1976 | 1977 | etc.
--- | --- | --- | --- | --- | ---
Afghanistan | Type food 1 | ... | ... | ... | ...
Afghanistan | Type food 2 | ... | ... | ... | ...
Afghanistan | Type food 3 | ... | ... | ... | ...
Afghanistan | etc. | ... | ... | ... | ...
Albania | Type food 1 | ... | ... | ... | ...
Albania | Type food 2 | ... | ... | ... | ...
Albania | Type food 3 | ... | ... | ... | ...
Albania | etc. | ... | ... | ... | ...
etc. | ... | ... | ... | ... | ...

### Functions
The createSankey function will be activated when the user clicks on a country in either the world map or on the scatterplot, and check if a sankey graph already exists, and if it doesn't it will create the sankey. If it does it will only update the graph to the data of the selected country. 

It will first use the first dataset of the calories eaten in a country on average, and this will determine the length of the initial bar. The dataset containing how many calories are eaten in each food group will be used to create the next bars, which in total add up to the total amount of calories. If available, the types of food of that food group will be displayed as bars next to the food group.

The sankey diagram itself can be created by using plotly.js for example. Examples of this can be found on https://plot.ly/javascript/sankey-diagram/.

When another country is chosen, the size of all the elements of the sankey diagram will be updated to the selected data. 

When hovered over a bar in the sankey diagram, the opacity of the rest of the diagram will decrease and a tooltip will appear, displaying the exact value of the data.



