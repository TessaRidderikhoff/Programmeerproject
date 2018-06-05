# Design

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

