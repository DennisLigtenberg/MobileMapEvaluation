var params = {}
window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(x, key, value) {
   params[key] = Number(value);
});

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
                    664577.360036, 5753148.32695,
                    1167741.45842, 6075303.61197
                ]
            }),
            new ol.control.ScaleLine(),
            new ol.control.Rotate({
                autoHide: false
            }),
            new ol.control.MousePosition({
                projection: 'EPSG:4326'
            })
        ]),
        layers: [
            new ol.layer.Group({
                'title': 'Background Layers',
                layers: [
                    new ol.layer.Tile({
                        title: "Swiss Style OSM",
                        type: "base",
                        source: new ol.source.XYZ({
                            url: 'http://tile.osm.ch/osm-swiss-style/{z}/{x}/{y}.png',
                            attributions: [
                                new ol.Attribution({
                                    html: 'Map data &copy; <a href="http://www.osm.ch/">osm.ch</a> | ' +
                                    '<a href="http://giswiki.hsr.ch/Webmapping_Clients">About</a> | ' +
                                    '<a href="http://www.hsr.ch/geometalab">By Geometalab --------</a>'
                                }),
                            ]
                        })
                    }),
                    new ol.layer.Tile({
                        title: "Mapbox Satellite",
                        type: "base",
                        visible: false,
                        source: new ol.source.XYZ({
                            url: 'http://a.tiles.mapbox.com/v3/tmcw.map-j5fsp01s/{z}/{x}/{y}.png',
                            attributions: [
                                new ol.Attribution({
                                    html: 'Map data &copy; <a href="http://www.mapbox.com/">Mapbox</a> | ' +
                                    '<a href="http://giswiki.hsr.ch/Webmapping_Clients">About</a> | ' +
                                    '<a href="http://www.hsr.ch/geometalab">By Geometalab --------</a>'
                                }),
                            ]
                        })
                    }),
                ]
            }),
            new ol.layer.Group({
                'title': 'Thematic Layers',
                maxResolution: 611.49622628141,
                layers: [
                    new ol.layer.Vector({
                        visible: false,
                        title: "Roads",
                        source: new ol.source.GeoJSON({
                        })
                    }),
                    new ol.layer.Vector({
                        title: "Castles",
                        source: new ol.source.GeoJSON({
                            url: 'geojson/castles.geojson',
                            projection: 'EPSG:3857'
                        }),
                        style: new ol.style.Style({
                            image: new ol.style.Icon(({
                                anchorXUnits: 'pixels',
                                anchorYUnits: 'pixels',
                                src: "img/Castle.png",
                                width: "28",
                                height: "28"
                            }))
                        })
                    }),
                ]
            })
        ],
        view: new ol.View({
            center: ol.proj.transform([params.lng || 8.8167, params.lat || 47.2267], 'EPSG:4326', 'EPSG:3857'),
            zoom: params.zoom || 8,
            minZoom: 8,
            extent: [664577.360036, 5753148.32695, 1167741.45842, 6075303.61197]
        })
    });

    var layerSwitcher = new ol.control.LayerSwitcher();
    map.addControl(layerSwitcher);
