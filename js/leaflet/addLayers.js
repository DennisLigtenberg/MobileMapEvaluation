var loadGeojson = function(filepath, layergoup, icon){
    $.getJSON(filepath, function(data) {
        var jsoncastles = L.geoJson(data, {
            onEachFeature: function (feature, layer) {
                if(feature.properties.name) {
                    layer.bindPopup(feature.properties.name);
                }
                else{
                    layer.bindPopup("Ohne Namen");
                }
            },
            pointToLayer: function (feature, latlng) {
                return L.marker(latlng, {icon: icon });
            }
        });
        jsoncastles.addTo(layergoup);
    });
    return layergoup;
};

var addTileLayer = function(url, attribution, minZoom){
    var layer = L.tileLayer(url, {
            attribution: attribution,
            minZoom: minZoom
        });
    return layer;
};