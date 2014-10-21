var swissstyle = L.tileLayer('http://tile.osm.ch/osm-swiss-style/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://www.osm.ch/">osm.ch</a>',
    }),
    osm = L.tileLayer('http://tile.osm.ch/21781/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://www.osm.ch/">osm.ch</a>',
    });

var castleicon = L.icon({
    iconUrl: 'Castle.png',
    iconSize: [28, 28]
});

var points = new L.LayerGroup();
L.geoJson(castles, {
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {icon: castleicon });
        }
}).addTo(points);

/*var restaurants = new L.LayerGroup();
L.geoJson(restaurants).addTo(restaurants);*/

var map = L.map('map', {
    center: [47.2267, 8.8167],
    zoom: 11,
    maxzoom: 11,
    layers: [swissstyle, points]
});

var baseMaps = {
    "OSM": osm,
    "SwissStyle": swissstyle
};

var overlay = {
	"points": points,
	//"restaurants": restaurants
};
L.control.scale({imperial: false}).addTo(map);
L.control.layers(baseMaps, overlay).addTo(map);