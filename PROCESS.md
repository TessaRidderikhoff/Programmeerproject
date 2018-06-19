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