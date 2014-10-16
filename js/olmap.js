proj4.defs("EPSG:21781","+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 +x_0=600000 +y_0=200000 +ellps=bessel +towgs84=674.4,15.1,405.3,0,0,0,0 +units=m +no_defs");

var map = new ol.Map({
	target: 'map',
    layers: [
    	new ol.layer.Group({
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
	                visible: false,
	                source: new ol.source.XYZ({
	                    url: 'http://tile.osm.ch/21781/{z}/{x}/{y}.png'
	
	                })
	            }),
	        ]
	    }),
	   new ol.layer.Group({
	   		'title': 'Points',
	        layers: [
	        	new ol.layer.Vector({
	        		title: "Point",
	        		  source: new ol.source.GeoJSON({
    					url:'olcastles.geojson'
 					}),
	        	})
	        ]
	    })
    ],
    view: new ol.View({
        center: ol.proj.transform([8.8167, 47.2267], 'EPSG:4326', 'EPSG:3857'),
        zoom: 13
    })
});

var layerSwitcher = new ol.control.LayerSwitcher();
map.addControl(layerSwitcher);