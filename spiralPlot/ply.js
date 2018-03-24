
function makeplot() {
    Plotly.d3.csv("https://www.dropbox.com/s/y9y5baatw6anlzt/MyHealthItemsList20180219.csv?dl=1", 

        // "https://raw.githubusercontent.com/eschlaf2/eschlaf2.github.io/master/quantifiedSelf/My%20Health%20Items%20List%2020180219.csv",
    // 
        function(data){ processData(data) } );

};
    
function processData(allRows) {

    // console.log(allRows);
    var x = [], y = [], size = [], color = [], text = [];

    for (var i=0; i<allRows.length; i++) {
        row = allRows[i];
        if (row['Item'] !== 'Period') { continue }
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
            // cmax: 6,
            // cmin: 1,
            color: color,
            colorscale: 'Viridis',
            size: size,
            sizemin: 1,
            sizeref: .04,
            sizemode: 'diameter',
        },
        mode: 'markers',
        text: text,
        type: 'bar'
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