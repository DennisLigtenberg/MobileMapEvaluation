$(document).ready(function() {
    //get coordinates and zoom from URL
    var params = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (x, key, value) {
        params[key] = Number(value);
    });


    //initialize map
    var map = new ol.Map({
        target: 'map',
        interactions: ol.interaction.defaults().extend([
            new ol.interaction.DragRotateAndZoom()
        ]),
        controls: ol.control.defaults({
            attributionOptions: ({
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
                    loadGeoJson("Castles", geoJsonCastle, "EPSG:3857", castleIcon),
                    loadGeoJson("Roads", geoJsonRoad, "EPSG:3857", ""),
                ]
            })
        ],
        view: new ol.View({
            center: ol.proj.transform([params.lng || centerLng, params.lat || centerLat], 'EPSG:4326', 'EPSG:3857'),
            zoom: params.zoom || minZoom,
            minZoom: startZoom,
            extent: [664577.360036, 5753148.32695, 1167741.45842, 6075303.61197]
        })
    });

    updateLink(map);

    var layerSwitcher = new ol.control.LayerSwitcher();
    map.addControl(layerSwitcher);

    var featureOverlay = addFeatureOverlay();
    featureOverlay.setMap(map);

    var modify = new ol.interaction.Modify({
        features: featureOverlay.getFeatures()
    });
    map.addInteraction(modify);

    var draw;

    function addInteraction(type) {
        if (type !== 'None') {
            draw = new ol.interaction.Draw({
                features: featureOverlay.getFeatures(),
                type: (type)
            });
            map.addInteraction(draw);
        }
    }

    $("#none, #point, #lineString, #polygon").click(function() {
        map.removeInteraction(draw);
        addInteraction($(this).attr("value"));
    });
    addInteraction("None");

    addInteraction("None", draw, featureOverlay);

    map.on('moveend', function(){
        updateLink(map);
    });

    var element = document.getElementById('popup');

    var popup = new ol.Overlay({
        element: element,
        positioning: 'bottom-center',
        stopEvent: false
    });

    map.addOverlay(popup);

    map.on('click', function (evt) {
        $(element).popover('destroy');
        var feature = map.forEachFeatureAtPixel(evt.pixel,
            function (feature, layer) {
                return feature;
            });
        if (feature) {
            if (typeof feature.get('name') != 'undefined') {
                var geometry = feature.getGeometry();
                var coord = geometry.getCoordinates();

                popup.setPosition(coord);
                $(element).popover({
                    'placement': 'top',
                    'html': true,
                    'content': feature.get('name') ? feature.get('name') : "Ohne Namen"
                });
                $(element).popover('show');
            }
        }
    });
});