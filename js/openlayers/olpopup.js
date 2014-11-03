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
                if (!feature.get('name')) {
                    popup.setPosition(coord);
                    $(element).popover({
                        'placement': 'top',
                        'html': true,
                        'content': 'Kein Eintrag'
                    });
                    $(element).popover('show');
                } else {
                    popup.setPosition(coord);
                    $(element).popover({
                        'placement': 'top',
                        'html': true,
                        'content': feature.get('name')
                    });
                    $(element).popover('show');
                }
            }
});