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
           new ol.interaction.DragRotateAndZoom({
               condition: ol.events.condition.altKeyOnly
           })
        ]),
        controls: ol.control.defaults({
            attributionOptions: ({
                collapsible: false
            })
        }).extend([
            new ol.control.ZoomToExtent({
                extent: olbounds
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
            //Layergrgroup for background layers
            new ol.layer.Group({
                'title': 'Background Layers',
                layers: [
                    //adds a layer to the map (visible, name, source, attribution)
                    createLayer(true, osmName, osmSrc, createAttribution(osmAttributionUrl, osmAttributionText)),
                    createLayer(false, mapboxName, mapboxSrc, createAttribution(mapboxAttributionUrl, mapboxAttributionText))
                ]
            }),
            //Layergroup for features
            new ol.layer.Group({
                'title': 'Thematic Layers',
                maxResolution: olRes,
                layers: [
                    loadGeoJson("Castles", geoJsonCastle, "EPSG:3857", castleIcon)
                ]
            })
        ],
        //Mapview
        view: new ol.View({
            center: ol.proj.transform([params.lng || centerLng, params.lat || centerLat], 'EPSG:4326', 'EPSG:3857'),
            zoom: params.zoom || startZoom,
            minZoom: minZoom,
            extent: olbounds
        })
    });

    //Initial link update
    updateLink(map);

    //Layerswitcher controll element (from the layerswitcher plugin)
    var layerSwitcher = new ol.control.LayerSwitcher();
    map.addControl(layerSwitcher);

    //Feature overlay for creating/editing
    var featureOverlay = addFeatureOverlay();
    featureOverlay.setMap(map);

    var modify = new ol.interaction.Modify({
        features: featureOverlay.getFeatures()
    });
    map.addInteraction(modify);

    //add draw interaction
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

    //gets value from control buttons and activates the corresponding interaction
    $("#none, #point, #lineString, #polygon").click(function() {
        map.removeInteraction(draw);
        addInteraction($(this).attr("value"));
    });
    addInteraction("None");

    addInteraction("None", draw, featureOverlay);

    //updates link on every mapmovement
    map.on('moveend', function(){
        updateLink(map);
    });

    //Get the popup div element
    var element = document.getElementById('popup');

    //Create the popup overlay
    var popup = new ol.Overlay({
        element: element,
        positioning: 'bottom-center',
        stopEvent: false
    });
    map.addOverlay(popup);

    //Popup on click on feature
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