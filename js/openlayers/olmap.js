var params = {};
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
                createLayer(true, osmName, osmSrc, createAttribution(osmAttributionText, osmAttributionUrl)),
                createLayer(false, mapboxName, mapboxSrc, createAttribution(mapboxAttributionText, mapboxAttributionUrl)),
            ]
        }),
        new ol.layer.Group({
            'title': 'Thematic Layers',
            maxResolution: 611.49622628141,
            layers: [
                new ol.layer.Vector({
                    visible: false,
                    title: "Roads",
                    source: new ol.source.GeoJSON({})
                }),
                loadGeoJson("Castles", geoJsonCastle, "EPSG:3857", castleIcon),
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