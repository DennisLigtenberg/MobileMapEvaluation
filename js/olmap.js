proj4.defs("EPSG:21781","+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 +x_0=600000 +y_0=200000 +ellps=bessel +towgs84=674.4,15.1,405.3,0,0,0,0 +units=m +no_defs");

var map = new ol.Map({
	target: 'map',
	interactions: ol.interaction.defaults().extend([
    new ol.interaction.DragRotateAndZoom()
  ]),
	controls: ol.control.defaults({
	    attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
	        collapsible: false
	    })
	}).extend([
	    new ol.control.ZoomToExtent({
	        extent: [
	            599266.301756, 5718903.20002,
	            1159384.634427, 6050241.789859
	        ]
	    }),
	    new ol.control.ScaleLine(),
	    new ol.control.Rotate({
	    	autoHide: false
	    })
	]),
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
	                    url: 'http://tile.osm.ch/21781/{z}/{x}/{y}.png',
	                })
	            }),
	        ]
	    }),
	   new ol.layer.Group({
	   		'title': 'Points',
	        layers: [
	        	new ol.layer.Vector({
	        		title: "Castles",
	        		source: new ol.source.GeoJSON({
    					url:'olcastles.geojson',
 						projection: 'EPSG:3857'
 					}),
					style: new ol.style.Style({
						image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
								anchorXUnits: 'pixels',
								anchorYUnits: 'pixels',
								src: "Castle.png",
								width: "38",
								height: "38",
							}))
					})
	        	}),
	        	/*new ol.layer.Vector({
	        		title: "Restaurants",
	        		visible: false,
	        		source: new ol.source.GeoJSON({
    					url:'restaurants.geojson',
 						projection: 'EPSG:3857'
 					}),
	        	})*/
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


