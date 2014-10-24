var swissstyle = L.tileLayer('http://tile.osm.ch/osm-swiss-style/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://www.osm.ch/">osm.ch</a> | ' +
        '<a href="http://www.hsr.ch/geometalab">By GeometaLab</a>',
    	minZoom: 9
    }),
    mapbox = L.tileLayer('http://api.tiles.mapbox.com/v4/sfkeller.k0onh2me/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic2ZrZWxsZXIiLCJhIjoia3h4T3pScyJ9.MDLSUwpRpPqaV7SVfGcZDw', {
        attribution: 'Map data &copy; <a href="http://www.mapbox.com">Mapbox</a> | ' +
        '<a href="http://www.hsr.ch/geometalab">By GeometaLab</a>',
    	minZoom: 9
    });
    
var castleIcon = L.icon({
    iconUrl: 'img/Castle.png',
    iconSize: [28, 28]
})

var restIcon = L.icon({
    iconUrl: 'img/Restaurant.png',
    iconSize: [28, 28]
})

var castles = new L.LayerGroup();

$.getJSON("geojson/castles.geojson", function(data) {
	var jsoncastles = L.geoJson(data, {
		onEachFeature: function (feature, layer) {
            if(feature.properties.name) {
                layer.bindPopup(feature.properties.name);
            }
            else{
                layer.bindPopup("Kein Eintrag");
            }
		},
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {icon: castleIcon });
        }
    });
    jsoncastles.addTo(castles);
});

var restaurants = new L.LayerGroup();

$.getJSON("geojson/restaurants.geojson", function(data) {
    var geojsonrestaurants = L.geoJson(data, {
        onEachFeature: function(feature, layer) {
            layer.bindPopup(feature.properties.name);
        },
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {icon: restIcon });
        }
    });
    geojsonrestaurants.addTo(restaurants);
});


var p1 = new L.LatLng(45.7300, 5.8000),
    p2 = new L.LatLng(47.9000, 10.600),
    bounds = L.latLngBounds(p1, p2);

var map = L.map('map', {
    editable: true,
    center: [47.2267,8.8167],
    zoom: 11,
    maxBounds: bounds,
    layers: [swissstyle, castles]
});

var baseMaps = {
    "Mapbox Satelite": mapbox,
    "SwissStyle": swissstyle
};

var overlay = {
	"Castles": castles,
	"Restaurants": restaurants
};

L.FitBounds = L.Control.extend({

    options: {
        position: 'topleft'
    },

    onAdd: function (map) {
        var container = L.DomUtil.create('div', 'leaflet-control leaflet-bar'),
            link = L.DomUtil.create('a', '', container);

        link.href = '#';
        link.title = 'Zoom to max extent';
        link.innerHTML = 'E';
        L.DomEvent.on(link, 'click', L.DomEvent.stop)
            .on(link, 'click', function () {
                map.fitBounds(bounds);
            });

        return container;
    }
});

var loadingControl = L.Control.loading({
    spinjs: true
});

map.addControl(loadingControl);
map.addControl(new L.FitBounds());
L.control.mousePosition().addTo(map);
L.control.scale({imperial: false}).addTo(map);
L.control.layers(baseMaps, overlay).addTo(map);