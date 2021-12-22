function HEXtoRGB(hex) {
    hex = hex.replace(/#/g, '');
    if (hex.length === 3) {
        hex = hex.split('').map(function (hex) {
            return hex + hex;
        }).join('');
    }
    // validate hex format
    var result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})[\da-z]{0,0}$/i.exec(hex);
    if (result) {
        var red = parseInt(result[1], 16);
        var green = parseInt(result[2], 16);
        var blue = parseInt(result[3], 16);

        return [red, green, blue];
    } else {
        // invalid color
        return null;
    }
}

// cie_colours = golden_colours.fluid.map(function(x){
//     xyz = x.cie_lab_values.replace(/[Lab]\*/g,"").split(" ")
//     rgb = HEXtoRGB(x.color_id.data.hex_code)
//     return {
//         x: xyz[1],
//         y: xyz[2],
//         z: xyz[0],
//         text: [x.color_id.data.color_name],
//         mode: 'markers',
//         marker: {
//             color: "rgb(" + rgb[0] + ", " + rgb[1] + ", " + rgb[2] + ")",
//             size: 12,
//             symbol: 'circle',
//             line: {
//                 color: "rgb(" + rgb[0] + ", " + rgb[1] + ", " + rgb[2] + ")",
//                 width: 1
//             },
//             opacity: 0.8
//         },
//         type: 'scatter3d'
//     }
// })
// console.log(cie_colours)

owned = [
    // "PY154", "PY74", "PY83(HR70)", "PV19", "PR122", "PB15:3", "PB29", "PG7", "PG36"
    "2275", "2270", "2400", '2255', '2305', '2310', '2147', '2008', '2191',
    '2350', '2035', '2020', '2360', '2407', '2340', '2040', '2380' 
]

cie_colours = golden_colours.fluid.map(function(x){
    return [x.color_id.data.color_name, x.cie_lab_values.replace(/[Lab]\*/g,"").split(" "), x.color_id.data.hex_code]
})

cie_colours = golden_colours.fluid.filter(x=>!x.color_index_name.includes(' / ')).map(function(x){
    return [x.color_id.data.color_name + "(" + x.tint_strength +")", x.cie_lab_values.replace(/[Lab]\*/g,"").split(" "), x.color_id.data.hex_code]
    // return [x.color_id.data.color_name, x.cie_lab_values.replace(/[Lab]\*/g,"").split(" "), HEXtoRGB(x.color_id.data.hex_code)]
})
// cie_colours = golden_colours.fluid.filter(x=>owned.some(substring => x.product_number.includes(substring))).map(function(x){
//     return [x.color_id.data.color_name, x.cie_lab_values.replace(/[Lab]\*/g,"").split(" "), x.color_id.data.hex_code]
//     // return [x.color_id.data.color_name, x.cie_lab_values.replace(/[Lab]\*/g,"").split(" "), HEXtoRGB(x.color_id.data.hex_code)]
// })
// {{}}

console.log(cie_colours)

labels = cie_colours.map(d => d[0])
xyz = {
    x: cie_colours.map(d => d[1][1]),
    y: cie_colours.map(d => d[1][2]),
    z: cie_colours.map(d => d[1][0])
}
// colours = cie_colours.map(d => "rgb(" + d[2][0] + ", " + d[2][1] + ", " + d[2][2] + ")" )
colours = cie_colours.map(d => "#" + d[2])
console.log(colours)
// console.log(cie_colours)
// labels = []
// for(const [colour_name, cie_code] of Object.entries(cie_colours)){
//     split = cie_code.replace(/[Lab]\*/g,"").split(" ")
//     xyz.x.push(split[0])
//     xyz.y.push(split[1])
//     xyz.z.push(split[2])
//     labels.push(colour_name)
// }
// console.log(xyz);

var data = [{
    x: xyz.x,
    y: xyz.y,
    z: xyz.z,
    text: labels,
    mode: 'markers',
    marker: {
        color: colours,
        size: 12,
        symbol: 'circle',
        line: {
            color: 'rgb(204, 204, 204)',
            width: 1
        },
        opacity: 0.8
    },
    type: 'scatter3d'
}];

var layout = {
    margin: {
        l: 0,
        r: 0,
        b: 0,
        t: 0
    }
};

Plotly.newPlot('tester', data, layout);

// // d3.csv('https://raw.githubusercontent.com/plotly/datasets/master/3d-scatter.csv', function(err, rows){

// //     function unpack(rows, key) {
// //         return rows.map(function(row){
// //             return row[key];
// //         });
// //     }

// //     var trace1 = {
// //         x:unpack(rows, 'x1'), y: unpack(rows, 'y1'), z: unpack(rows, 'z1'),
// //         mode: 'markers',
// //         marker: {
// //             size: 12,
// //             line: {
// //             color: 'rgba(217, 217, 217, 0.14)',
// //             width: 0.5},
// //             opacity: 0.8},
// //         type: 'scatter3d'
    
// //     };

// //     var trace2 = {
// //         x: unpack(rows, 'x2'),
// //         y: unpack(rows, 'y2'),
// //         z: unpack(rows, 'z2'),
// //         mode: 'markers',
// //         marker: {
// //             color: 'rgb(127, 127, 127)',
// //             size: 12,
// //             symbol: 'circle',
// //             line: {
// //                 color: 'rgb(204, 204, 204)',
// //                 width: 1
// //             },
// //             opacity: 0.8
// //         },
// //         type: 'scatter3d'
// //     };
    
// //     var data = [trace1, trace2];
    
// //     var layout = {
// //         margin: {
// //             l: 0,
// //             r: 0,
// //             b: 0,
// //             t: 0
// //       }
// //     };
    
// //     Plotly.newPlot('tester', data, layout);
    
// //     });