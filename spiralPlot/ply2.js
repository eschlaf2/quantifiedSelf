
function makeplot() {
    Plotly.d3.csv("https://raw.githubusercontent.com/eschlaf2/eschlaf2.github.io/master/quantifiedSelf/My%20Health%20Items%20List%2020180219.csv", 
        function(data){ processData(data) } );

};
    
function processData(allRows) {

    // console.log(allRows);
    var x = [], y = [], size = [], color = [], text = [];

    for (var i=0; i<allRows.length; i++) {
        row = allRows[i];
        var dtemp = new Date(row['Date (time stamp)']);
        x.push( dtemp );
        y.push( row['Category'] );
        size.push( Number(row['Size']));
        color.push( row['Color'] );
        text.push( row['Item'] )
    }
    console.log( 'SIZE',size );
    makePlotly( x, y, size, color, text );
}

function makePlotly( x, y, size, color, text ){
    // console.log('X', Date(x))
    var plotDiv = document.getElementById("plot");
    var traces = [{
        x: x, 
        y: y,
        sizemode: "area", 
        marker: {
            cauto: true,
            cmax: 6,
            cmin: 1,
            color: color,
            colorscale: [
                    [
                        '0', 
                        "rgb(46, 4, 149)"
                    ], 
                    [
                        '0.35', 
                        "rgb(142, 12, 163)"
                    ], 
                    [
                        '0.5', 
                        "rgb(205, 73, 117)"
                    ], 
                    [
                        '0.6', 
                        "rgb(243, 134, 71)"
                    ], 
                    [
                        '0.7', 
                        "rgb(250, 186, 32)"
                    ], 
                    [
                        '1', 
                        "rgb(249, 216, 36)"
                    ]
                ], 
            size: size,
            sizemin: 1,
            sizeref: .04,
            sizemode: 'diameter',
        },
        mode: 'markers',
        text: text,
        type: 'scatter'
    }];

    Plotly.newPlot('myDiv', traces, 
        {
            title: 'Plotting CSV data from AJAX call',
            xaxis: {
                autorange: true,
                type: 'date',
            },
            hoverinfo: "x+text",
            hovermode: "closest"

        });
};
  makeplot();