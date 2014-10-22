var swissstyle = L.tileLayer('http://tile.osm.ch/osm-swiss-style/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://www.osm.ch/">osm.ch</a> | <a href="http://www.hsr.ch/geometalab">By GeometaLab</a>',
    }),
    mapbox = L.tileLayer('http://api.tiles.mapbox.com/v4/sfkeller.k0onh2me/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic2ZrZWxsZXIiLCJhIjoia3h4T3pScyJ9.MDLSUwpRpPqaV7SVfGcZDw', {
        attribution: 'Map data &copy; <a href="http://www.mapbox.com">Mapbox</a> | <a href="http://www.hsr.ch/geometalab">By GeometaLab</a>',
    });

var castleicon = L.icon({
    iconUrl: 'img/Castle.png',
    iconSize: [28, 28]
});

var castles = new L.LayerGroup();

$.getJSON("geojson/castles.geojson", function(data) {
    var jsoncastles = L.geoJson(data, {
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {icon: castleicon });
        }
    });
    jsoncastles.addTo(castles);
});

var restaurants = new L.LayerGroup();

/*$.getJSON("geojson/restaurants.geojson", function(data) {
    var restaurants = L.geoJson(data, {
        onEachFeature: function(feature, layer) {
            layer.bindPopup(feature.properties.name);
        },
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {icon: castleicon });
        }
    });
    restaurants.addTo(points);
});*/


var map = L.map('map', {
    center: [47.2267, 8.8167],
    zoom: 11,
    maxzoom: 11,
    layers: [swissstyle, castles]
});

var baseMaps = {
    "Mapbox": mapbox,
    "SwissStyle": swissstyle
};

var overlay = {
	"Castles": castles,
	"Restaurants": restaurants
};

var p1 = L.point(5.9700, 45.8300),
    p2 = L.point(10.4900, 47.8100),
    bounds = L.bounds(p1, p2);
    

L.control.scale({imperial: false}).addTo(map);
L.control.layers(baseMaps, overlay).addTo(map);