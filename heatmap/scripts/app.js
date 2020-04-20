// Function to load JSON-dataset asynchronously.
function loadJSON(callback) {
  // Create new instance of XMLHttpRequest
  let obj = new XMLHttpRequest();
  // Specifies type of data.
  obj.overrideMimeType("application/json");
  // Get the JSON-file.
  obj.open("GET", "./dataset.json", true);
  // EventHandler for readystatechange.
  obj.onreadystatechange = function () {
    // Defining the error.
    if (obj.readyState == 4 && obj.status == "200") {
      // Throw an "InvalidStateError".
      callback(obj.responseText);
    }
  };
  // Initiates request.
  obj.send(null);
}

function render() {
  // Set start-time.
  let t0 = new Date().getTime();

  loadJSON(function (response) {
    // Parse the response in JSON-format.
    let jsonResponse = JSON.parse(response);

    // Store the parsed JSON-data.
    let jsonData = {
      data: jsonResponse,
    };

    // Create LeafletLayer that holds the actual map.
    let leafletLayer = L.tileLayer(
      "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png",
      {
        attribution: "Heatmap.js",
        maxZoom: 12,
      }
    );

    // Variable for config-values
    let config = {
      radius: 0.4,
      maxOpacity: 0.8,
      blur: 0.3,
      scaleRadius: true,
      useLocalExtrema: true,
      // Linking JSON-file-values to Heatmap.js variables.
      latField: "latitude",
      lngField: "longitude",
      valueField: "brightness",
    };

    // Create Layer and place config-variable in that overlay.
    let heatmapLayer = new HeatmapOverlay(config);

    // Create Map with Leaflet.js and set view, zoom and layers.
    let map = new L.Map("map", {
      center: new L.LatLng(20, 20),
      zoom: 3,
      layers: [leafletLayer, heatmapLayer],
    });

    // Set the data to the data from loadJSON().
    heatmapLayer.setData(jsonData);

    let t1 = new Date().getTime();

    // Calculate difference & store in localStorage for TamperMonkey.
    let result = t1 - t0;
    localStorage.setItem("result", result);
    console.log(localStorage);
  });
}

// Run script.
render();
