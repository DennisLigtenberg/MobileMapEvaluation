var swissstyle = L.tileLayer('http://tile.osm.ch/osm-swiss-style/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://www.osm.ch/">osm.ch</a>',
    }),
    osm = L.tileLayer('http://tile.osm.ch/21781/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://www.osm.ch/">osm.ch</a>',
    });

var map = L.map('map', {
    center: [47.2267, 8.8167],
    zoom: 11,
    maxzoom: 11,
    layers: [osm, swissstyle]
});

var baseMaps = {
    "OSM": osm,
    "SwissStyle": swissstyle
};

var overlayMaps = {};

L.control.layers(baseMaps).addTo(map);