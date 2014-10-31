
var addPolygonControl = function(){
    L.NewPolygonControl = L.Control.extend({

        options: {
            position: 'topleft'
        },
        onAdd: function(map) {
            var container = L.DomUtil.create('div', 'leaflet-control leaflet-bar'),
                link = L.DomUtil.create('a', '', container);
            link.href = '#';
            link.title = 'Create a new polygon';
            link.innerHTML = '▱';
            L.DomEvent.on(link, 'click', L.DomEvent.stop)
                .on(link, 'click', function() {
                    map.editTools.startPolygon();
                });

            return container;
        }
    });
    return L.NewPolygonControl;
};

var addLineControl  = function(){
    L.NewLineControl = L.Control.extend({
        options: {
            position: 'topleft'
        },
        onAdd: function (map) {
            var container = L.DomUtil.create('div', 'leaflet-control leaflet-bar'),
                link = L.DomUtil.create('a', '', container);

            link.href = '#';
            link.title = 'Create a new line';
            link.innerHTML = '/';
            L.DomEvent.on(link, 'click', L.DomEvent.stop)
                .on(link, 'click', function () {
                    map.editTools.startPolyline();
                });

            return container;
        }
    });
    return L.NewLineControl;
};

var addMarkerControl = function() {
    L.NewMarkerControl = L.Control.extend({
        options: {
            position: 'topleft'
        },
        onAdd: function (map) {
            var container = L.DomUtil.create('div', 'leaflet-control leaflet-bar'),
                link = L.DomUtil.create('a', '', container);

            link.href = '#';
            link.title = 'Add a new marker';
            link.innerHTML = '⚫';
            L.DomEvent.on(link, 'click', L.DomEvent.stop)
                .on(link, 'click', function () {
                    map.editTools.startMarker();
                });

            return container;
        }
    });
    return L.NewMarkerControl;
};

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