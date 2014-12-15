//Returns a leaflet control element that starts the "onClick action"
var addControl = function(position, hoverText, buttonText, onClick){
    L.NewControl = L.Control.extend({
        options: {
            position: position
        },
        onAdd: function(map) {
            var container = L.DomUtil.create('div', 'leaflet-control leaflet-bar'),
                link = L.DomUtil.create('a', '', container);
            link.href = '#';
            link.title = hoverText;
            link.innerHTML = buttonText;
            L.DomEvent.on(link, 'click', L.DomEvent.stop)
                .on(link, 'click', function() {
                    eval(onClick);
                });

            return container;
        }
    });
    return L.NewControl;
};

//Returns a control that fits the view to given bounds
var addFitBounds = function(bounds) {
    L.FitBounds = L.Control.extend({

        options: {
            position: 'topleft'
        },

        onAdd: function (map) {
            var container = L.DomUtil.create('div', 'leaflet-control leaflet-bar'),
                link = L.DomUtil.create('a', '', container);

            link.href = '#';
            link.title = 'Zoom to max extent';
            link.innerHTML = 'E';
            L.DomEvent.on(link, 'click', L.DomEvent.stop)
                .on(link, 'click', function () {
                    map.fitBounds(bounds);
                });

            return container;
        }
    });
    return L.FitBounds;
};

//Updates the link elements in the DOM with the new center and zoom coordinates
var updateLink = function (map) {
    var center = map.getCenter(),
        zoom = map.getZoom();
    $(".lfSwitch").prop("href", "openlayers.html?lat=" + center.lat + "&lng=" + center.lng + "&zoom=" + zoom + "");
    $(".lfTitle").prop("href", "index.html?lat=" + center.lat + "&lng=" + center.lng + "&zoom=" + zoom + "");
};