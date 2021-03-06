# Process report Tessa Ridderikhoff

## Thursday 7-6

### Done
- Divided the html in svgs for each element
- Created map which displays obesity percentage in world
- Created tooltip
- Created legend with interactivity
- Created update function for map for different years

### Problems
- Hard to create slider that works, updating the map works now with a button
- Hard to make the positions of the svgs absolute

### To do
- Make update function for male and female statistics only

## Friday 8-6

### Done
- Created slider over the years, works, but I transform the values of the slider instead of changing the values in the first place
- Created checkboxes for gender information, but they work as buttons as the moment instead of checkboxes
- I gave all svg's standard locations

### To do
- Use the checkboxes as checkboxes: show only the data of the boxes that are checked
- I would prefer not to use a "both" checkbox, but when male and female are both selected that the all-adults dataset is used

## Monday 11-6

### Done
- Made checkboxes that work: there are now a female and male checkbox, and if both checked the world map shows the average for all adults.
- Made scatterplot, only for calories eaten on x-axis, and cardiovascular diseases on y-axis. 

### To do
- Choose what variables are shown on the x-axis and y-axis.
- There are problems with the loading of the data, sometimes the map suddenly becomes black. It also seems that the map sometimes does not show the correct values, possibly of the wrong year.

## Tuesday 12-6

### Done
- The slider can now also update the scatterplot
- The x-axis is a dropdown, but does not do anything yet
- Fixed the data loading problem of the world map (it was because the years were not selected correctly)

### To do
- Crosshair for the scatterplot, so the tooltip doesn't have to hold so much information
- Dropdown for the y-axis
- Update the scatterplot for different datasets

## Wednesday 13-6

### Done
- Made functional dropdowns for x- and y-axis that can change the axis-variables
- Created crosshair to make the values clearer

### To do
- When a dot is hovered over in the scatterplot, show the country that is corresponds to by lowering the opacity of the other country
- And vice versa
- Make the axes fixed
- Not all datasets have all years available, and there is a problem since diabetes data is only of 2015 but suffiently active data is only of 2010.

## Thursday 14-6

### Done 
- Interactivity between map and scatterplot by lowering opacity of non-selected countries.
- Fixed axes so they don't change for every year.

### To do
- On click of country: create sankey diagram.

## Friday 15-6

### Done
- Preparing data for sankey diagram

### To do
- Scatterplot: legend for size dots
- Scatterplot & map: labels for axes
- Scatterplot & map: title
- Sankey diagram

## Monday 18-6

### Done
- Created sankey-diagram (calories --> different subgroups)
- Started with sankey-diagram element from grains --> types of grains
- Created title for diagram

### To do
- The "Calories" label on the sankey diagram should be in the middle
- The initial bar of the diagram should be in the middle as well
- Users should be able to click on certain food groups and then receive more information about the different foods in that food group (for example grain)

## Tuesday 19-6

### Done
- Created sankey-diagram with additional information about grain and meat.
- Created titles for each element of the diagram.
- Improved visuals of the diagram (it was hard to make clear which bars can be pressed).

### To do
- Titles of element should be at the front (hard)
- Different years are not updated, not sure why
- Title is sometimes not entirely visible
- It should be shown if no data is available, instead of doing nothing
- Create another sankey diagram for comparison
- Sometimes the tooltips are visible when the element itself is not --> fix that.

## Wednesday 20-6

### Done
- Created another sankey diagram for comparison, was difficult
- Improved visibility of the title
- "No data available" added if needed

### To do
- Tooltips are not correct for second diagram
- The map does not correctly update the years, the scatterplot does 
- The scatterplot can not make two different sankey diagrams
- The links do not match on the second diagram on click

## Thursday 21-6

### Done
- Improved scatterplot axes
- Added circle legend
- Added label for legend world map
- Fixed some bugs of the no-data-message
- The sankey-diagram can no longer be clicked on, but is complete when clicked on the country
- Added pages for design choices, etc.

### To do
- The labels of the sankey diagram foodgroups are behind the links of the diagram
- No data notification is not always correct
- The tooltips don't have the correct information for both sankey diagrams
- The nodes with meat-information double when clicked on the same country twice

## Friday 22-6

### Done
- I moved the labels of the sankey-diagram to the front
- I added that when no data is available for a country, the next sankey diagram is on that svg, instead of the other one
- I fixed some bugs of the no-data message (again). It works now
- There was a problem that the map did not update the year for the sankey diagram, it does now

### To do
- Some countries get errors (Zambia, Uganda, Sudan, Togo, Spain (that I know of))
- Tooltips are still not working for both sankey diagrams (hard)
- Tooltip of the map can fall of the map for Russia, USA and Canada (and Greenland but Greenland doesn't have data anyway)
- Maybe the tooltip shouldn't say "null" when no data is available
- Improve code quality

## Monday 25-6

### Done
- Fixed the error of certain countries, turns out that the height calculation was incorrect and selected the wrong countries.
- The tooltip can't fall off the world map anymore, it now appears below the country if the country is at a certain height.
- The createMap script is commented and an extra function is created to avoid double code.

### To do
- Comment rest of scripts
- Tooltips sankey diagram
- Put labels on axes of measurements

## Tuesday 26-6

### Done
- Commented createScatter and removed unnecessary code in this script. Also improved efficiency of this script.
- Commented most of createSankey
- Added name and studentnumber to navigation bar

### To do
- Rest of comments
- Pages of "About the data" and "Sources"
- Tooltips of sankey diagram

## Wednesday 27-6

### Done
- Commented rest of files
- Improved createSankey (combined two functions)
- Worked on report

### To do
- Labels axes
- Tooltips Sankey
- Report
- Readme
- Sources
- Github pages

## Thursday 28-6

### Done
- Finished report
- Finished README
- Fixed tooltips of Sankey diagram (easier than expected)
- Labeled axes
- Created sources page
- Created link to website

### To do
- Product video
