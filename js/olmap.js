var map = new ol.Map({
	target: 'map',
    layers: [new ol.layer.Group({
        'title': 'Maps',
        layers: [
            new ol.layer.Tile({
                title: "Swiss Style OSM",
                type: "base",
                source: new ol.source.XYZ({
                    url: 'http://tile.osm.ch/osm-swiss-style/{z}/{x}/{y}.png'
                })
            }),
            new ol.layer.Tile({
                title: "OSM CH",
                type: "base",
                source: new ol.source.XYZ({
                    url: 'http://tile.osm.ch/21781/{z}/{x}/{y}.png'

                })
            }),
        ]
    })],
    view: new ol.View({
        center: ol.proj.transform([8.8167, 47.2267], 'EPSG:4326', 'EPSG:3857'),
        zoom: 13
    })
});

var layerSwitcher = new ol.control.LayerSwitcher();
map.addControl(layerSwitcher);