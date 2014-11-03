var element = document.getElementById('popup');

var popup = new ol.Overlay({
    element: element,
    positioning: 'bottom-center',
    stopEvent: false
});

map.addOverlay(popup);
map.on('click', function(evt) {
    $(element).popover('destroy');
    var feature = map.forEachFeatureAtPixel(evt.pixel,
        function(feature, layer) {
            return feature;
        });

    if (feature) {
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
});