function createSlider() {

	timeWidth = 200
	timeHeight = 50
	margin = {right: 20, left: 20}

    var svg = d3.select(".timesvg")

    slider1 = new simpleSlider();

    yearInfo = svg.append("text")
		.attr("x", 180)
		.attr("y", timeHeight/2 + 3)
		.attr("class", "yearInfo")
		.text("Year: 2013")

    var xScale = d3.scale.linear()
		.domain([0, 1])
		.range([1975, 2013])

    slider1.width(150).x(10).y(timeHeight/2).value(1.0).event(function(){
    	selectedyear = Math.round(xScale(slider1.value()));
    	year = selectedyear
        yearInfo
        	.text("Year: " + selectedyear);

        updateYear(year);
    });

    svg.call(slider1);
}

// source: https://bl.ocks.org/Lulkafe/3832d628340038d9484fbd9edb705e01
function simpleSlider () {

    var width = 100,
        value = 0.5, /* Domain assumes to be [0 - 1] */
        event,
        x = 0,
        y = 0;

    function slider (selection) {

        //Line to represent the current value
        var valueLine = selection.append("line")
            .attr("x1", x)
            .attr("x2", x + (width * value))
            .attr("y1", y)
            .attr("y2", y)
            .style({stroke: "red",
                    "stroke-linecap": "round",
                    "stroke-width": 6 });

        //Line to show the remaining value
        var emptyLine = selection.append("line")
            .attr("x1", x + (width * value))
            .attr("x2", x + width)
            .attr("y1", y)
            .attr("y2", y)
            .style({
                "stroke": "#ECECEC",
                "stroke-linecap": "round",
                "stroke-width": 6
            });

        var drag = d3.behavior.drag().on("drag", function() {
            var newX = d3.mouse(this)[0];

            if (newX < x)
                newX = x;
            else if (newX > x + width)
                newX = x + width;

            value = (newX - x) / width;
            valueCircle.attr("cx", newX);
            valueLine.attr("x2", x + (width * value));
            emptyLine.attr("x1", x + (width * value));

            if (event)
                event();

            d3.event.sourceEvent.stopPropagation();
        })

        //Draggable circle to represent the current value
        var valueCircle = selection.append("circle")
            .attr("cx", x + (width * value))
            .attr("cy", y)
            .attr("r", 8)
            .style({
                "stroke": "black",
                "stroke-width": 1.0,
                "fill": "white"
            })
            .call(drag);
    }


    slider.x = function (val) {
        x = val;
        return slider;
    }

    slider.y = function (val) {
        y = val;
        return slider;
    }

    slider.value = function (val) {
        if (val) {
            value = val;
            return slider;
        } else {
            return value;
        }
    }

    slider.width = function (val) {
        width = val;
        return slider;
    }

    slider.event = function (val) {
        event = val;
        return slider;
    }

    return slider;
}

function updateYear(year) {
    updateMap(year);
    updateScatterYear(year);
}