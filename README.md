# Programmeerproject Tessa Ridderikhoff (10759697)

# Problem statement
A lot of people all over the world struggle with overweight and obesity, which leads to a lot of different theories about the causes and the impact. By comparing the different circumstances of countries with varying obesity prevelances, hopefully more clarity about healthy lifestyles can be given. Everyone who is interested in obesity or the impact of different lifestyles could benefit from this data visualisation.

# Solution
I would like to visualize the difference between countries in obesity prevalence, and highlight the differences between those countries on the subject of diets, income, education, exercise and so forth, as well as the implications obesity has.

The data visualisation will include:
- A map of the world that colour-codes the percentage of obesity in that country. (MVP)
- This world-map can be shown for males, females or both.
- The world-map can be shown for adults or children.
- The world-map can be shown for various years.
- A scatterplot with variables that can be chosen, showing all countries. (MVP)
- The x-axis variables can be: amount of education, gross domestic product, calories eaten on average, amount of exercise. (MVP)
- The y-axis variables can be: percentage of obesity, diabetes, heart- and vascular disease, high blood pressure, cancer. (MVP)
- When clicked on a country in the world map or the scatterplot, a sankey graph is created (or updated if it already existed). The sankey graph displays the amount of calories eaten in the country, and where those calories come from (for example: grains, vegetables, sugar, meat, etc.) (MVP)

# Prerequisites
Data sources:
https://ourworldindata.org/diet-compositions (diet compositions)
https://www.worldobesity.org/data/ (obesity)
https://data.world/oecd/meat-consumption/workspace/file?filename=meat_consumption.csv (meat consumption)
http://hdr.undp.org/en/data (education)
https://data.worldbank.org/indicator/NY.GDP.MKTP.CD?end=2016&start=1960&view=chart (GDP)

External components:
- D3
- Bootstrap

Similar visualizations:
World Obesity has similar visualizations, where a world map can be updated by selecting different variables. These variables can be obesity statistics, impact, drivers and actions. Only one variable is generally shown at the same time. The visualization is useful and clear, but no correlations can be seen since it is not possible to compare for example a driver with the actual amount of obesity in a country directly. 

Our World In Data shows the amount of calories eaten in a country, and where those calories are in (for example, grains, fruits, etc.). They visualize this in multiple stacked line charts. This is very clear, and differences in a country over the years are quickly seen. I will use this as an example, and use this data, but I will use it in a sankey diagram instead. In this sankey diagram, the amount of calories will be split in food group, and these food groups can also be split into the specific types of food. This way, multiple graphs of Our World In Data are combined. 

Hardest parts:
The hardest part of the visualizations will be the sankey diagram, since this is new to me, and requires the combination of a lot of datasets. Furthermore, it might be possible that not all datasets are available for every year, which has to be checked.


