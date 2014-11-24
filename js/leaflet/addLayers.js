var loadGeojson = function(filepath, layergoup, icon){
    $.getJSON(filepath, function(data) {
        var jsoncastles = L.geoJson(data, {
            onEachFeature: function (feature, layer) {
                layer.bindPopup(feature.properties.name ? feature.properties.name : "Ohne Namen");
            },
            pointToLayer: function (feature, latlng) {
                return L.marker(latlng, {icon: icon });
            }
        });
        jsoncastles.addTo(layergoup);
    });
    return layergoup;
};

var createAttribution = function(mapsrc, mapdesc){
    return "<a href='http://wiki.openstreetmap.org/wiki/Open_Database_License'>OpenStreetMap</a> contributors | " +
        "Map data &copy; <a href=" + mapsrc + ">" + mapdesc + "</a> | " +
        "<a href='http://giswiki.hsr.ch/Webmapping_Clients'>About</a> | " +
        "<a href='http://www.hsr.ch/geometalab'>By GeometaLab</a>";
}

var addTileLayer = function(src, attribution){
    var layer = L.tileLayer(src, {
        attribution: attribution,
        minZoom: minZoom
    });
    return layer
};