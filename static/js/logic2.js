
// Load in geojson data
var geoData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";
  
//var geojson;
console.log(geoData)

  // Grab data with d3
d3.json(geoData, function(data) {

    makeFeatures(data.features);
})

function magColor(depth) {
    return depth > 90 ? "red":
           depth > 70 ? "orange":
           depth > 50 ? "orange":
           depth > 30 ? "blue":
           depth > 10 ? "gray":
                     "green"
}

function makeFeatures(earthquakeData) {

    function onEachFeature(feature, layer){
        layer.bindPopup("<h1>" + feature.properties.title + "</h1> <hr> <h3>Magnitude: " + feature.properties.mag + "</h3><h3>Coordinates: " + feature.geometry.coordinates)
                   
    }

    let earthquakes = L.geoJson(earthquakeData, {
        onEachFeature: onEachFeature,

        pointToLayer: function(feature, latlong){
            var markersFormat = {
                radius: (feature.properties.mag)*15000,
                fillColor: magColor(feature.geometry.coordinates[2]),
                stroke: false,
                fillOpacity: 1
            }

            return L.circle(latlong, markersFormat)
        }
    });


    createMap(earthquakes);

}



function createMap(earthquakes){
// Creating map object

    var mainMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: API_KEY
    });

    var baseMaps = {
        "Street Map": mainMap
    };

    // Create verlay object to hold overlay layer
    var overlay = {
        Earthquakes: earthquakes
    }

    var myMap = L.map('map', {
        center: [37.80, -96.71],
        zoom: 3,
        layers: [mainMap, earthquakes]
    });
    
    // Adding tile layer




    // Create a layer control and pass the overlamaps and add the layr to the maps

    L.control.layers(baseMaps, overlay, {
        collapse: false
    }).addTo(myMap);

    var legend = L.control({position: 'bottomright'});

    legend.onAdd = function() {

        var div = L.DomUtil.create('div','info legend');
            var depths = [-10, 10, 30, 50, 70, 90];
            var colors = ["green", "gray", "blue", "yellow", "orange", "red"];

        
        for (var i = 0; i < depths.length; i++){
            div.innerHTML += "<i style= 'background: " + colors[i] + "'></i> "+depths[i] + (depths[i+1] ? '-' + depths[i+1] + "<br>" : "+");  
        }

        return div;

    };

    legend.addTo(myMap);

    }



    
    
  

  





      // for (var i = 0; i < features.length; i++) {
    //     var lat = features[i]["geometry"]["coordinates"][1];
    //     var long = features[i]["geometry"]["coordinates"][0];
    //     var depth = features[i]["geometry"]["coordinates"][2];
    //     var mag = features[i]["properties"]["mag"];
    //     var title = features[i]["properties"]["title"];
       
    //     };

    //     // create colors
    //     var color = "";
    //     if (features[i].depth > 200) {
    //       color = "yellow";
    //     }
    //     else if (depth[i].depth > 100) {
    //       color = "blue";
    //     }
    //     else if (depth[i].depth > 90) {
    //       color = "green";
    //     }
    //     else {
    //       color = "red";
    //     }

// create popup
        // L.circle(latlng)
        // .bindPopup("<h1>" + title + "</h1> <hr> <h3>Magnitude: " + mag + "</h3><h3>Latitude: " + lat + "</h3><h3>Longitude: " + long + "</h3>")
        // .addTo(myMap);
        //     });



      // Define what  property in the features to use
    //   valueProperty: "MHI2016",
  
    //   // Set color scale
    //   scale: ["#ffffb2", "#b10026"],
  
    //   // Number of breaks in step range
    //   steps: 10,
  
    //   // q for quartile, e for equidistant, k for k-means
    //   mode: "q",
    //   style: {
    //     // Border color
    //     color: "#fff",
    //     weight: 1,
    //     fillOpacity: 0.8
    //   },
  
    //   // Binding a pop-up to each layer
    // //   onEachFeature: function(feature, layer) {
    // //     layer.bindPopup("Zip Code: " + feature.properties.ZIP + "<br>Median Household Income:<br>" +
    // //       "$" + feature.properties.MHI2016);
    // //   }
    // // }).addTo(myMap);
  
    // // Set up the legend
    // var legend = L.control({ position: "bottomright" });
    // legend.onAdd = function() {
    //   var div = L.DomUtil.create("div", "info legend");
    //   var limits = geojson.options.limits;
    //   var colors = geojson.options.colors;
    //   var labels = [];
  
    //   // Add min & max
    //   var legendInfo = "<h1>Median Income</h1>" +
    //     "<div class=\"labels\">" +
    //       "<div class=\"min\">" + limits[0] + "</div>" +
    //       "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
    //     "</div>";
  
    //   div.innerHTML = legendInfo;
  
    //   limits.forEach(function(limit, index) {
    //     labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
    //   });
  
    //   div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    //   return div;
    // };
  
    // // Adding legend to the map
    // legend.addTo(myMap);
