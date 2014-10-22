proj4.defs("EPSG:21781", "+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 +x_0=600000 +y_0=200000 +ellps=bessel +towgs84=674.4,15.1,405.3,0,0,0,0 +units=m +no_defs");

var map = new ol.Map({
    target: 'map',
    interactions: ol.interaction.defaults().extend([
        new ol.interaction.DragRotateAndZoom()
    ]),
    controls: ol.control.defaults().extend([
        new ol.control.ZoomToExtent({
            extent: [
                664577.360036, 5753148.32695,
                1167741.45842, 6075303.61197
            ]
        }),
        new ol.control.ScaleLine(),
        new ol.control.Rotate({
            autoHide: false
        }),
        new ol.control.MousePosition({
        	projection: 'EPSG:4326',
        	
        })
    ]),
    layers: [
        new ol.layer.Group({
            'title': 'Maps',
            layers: [
                new ol.layer.Tile({
                    title: "Swiss Style OSM",
                    type: "base",
                    minScale: 9,
                    source: new ol.source.XYZ({
                        url: 'http://tile.osm.ch/osm-swiss-style/{z}/{x}/{y}.png',
						attributions: [
	                        new ol.Attribution({
	                            html: 'Map data &copy; <a href="http://www.osm.ch/">osm.ch</a></br><a href="http://www.hsr.ch/geometalab">By GeometaLab</a>'
	                        }),
	                    ],
                    })
                }),
                new ol.layer.Tile({
                    title: "Mapbox Satelite",
                    type: "base",
                    visible: false,
                    source: new ol.source.XYZ({
                        url: 'http://a.tiles.mapbox.com/v3/tmcw.map-j5fsp01s/{z}/{x}/{y}.png',
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
                        url: 'geojson/castles.geojson',
                        projection: 'EPSG:3857'
                    }),
                    style: new ol.style.Style({
                        image: new ol.style.Icon( /** @type {olx.style.IconOptions} */ ({
                            anchorXUnits: 'pixels',
                            anchorYUnits: 'pixels',
                            src: "img/Castle.png",
                            width: "38",
                            height: "38",
                        }))
                    })
                }),
                /*new ol.layer.Vector({
	        		title: "Restaurants",
	        		visible: false,
	        		source: new ol.source.GeoJSON({
    					url:'geojson/restaurants.geojson',
 						projection: 'EPSG:3857'
 					}),
	        	})*/
            ]
        })
    ],
    view: new ol.View({
        center: ol.proj.transform([8.8167, 47.2267], 'EPSG:4326', 'EPSG:3857'),
        zoom: 13,
		//extent: [5332203.609, 5090640.31398,1186775.975, 46758.583284]
    })
});

var layerSwitcher = new ol.control.LayerSwitcher();
map.addControl(layerSwitcher);