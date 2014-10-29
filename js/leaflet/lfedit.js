L.NewPolygonControl = L.Control.extend({

    options: {
        position: 'topleft'
    },
    onAdd: function(map) {
        var container = L.DomUtil.create('div', 'leaflet-control leaflet-bar'),
            link = L.DomUtil.create('a', '', container);
        link.href = '#';
        link.title = 'Create a new polygon';
        link.innerHTML = 'P';
        L.DomEvent.on(link, 'click', L.DomEvent.stop)
            .on(link, 'click', function() {
                map.editTools.startPolygon();
            });

        return container;
    }
});

L.NewLineControl = L.Control.extend({
    options: {
        position: 'topleft'
    },
    onAdd: function(map) {
        var container = L.DomUtil.create('div', 'leaflet-control leaflet-bar'),
            link = L.DomUtil.create('a', '', container);

        link.href = '#';
        link.title = 'Create a new line';
        link.innerHTML = 'L';
        L.DomEvent.on(link, 'click', L.DomEvent.stop)
            .on(link, 'click', function() {
                map.editTools.startPolyline();
            });

        return container;
    }
});

L.NewMarkerControl = L.Control.extend({
    options: {
        position: 'topleft'
    },
    onAdd: function(map) {
        var container = L.DomUtil.create('div', 'leaflet-control leaflet-bar'),
            link = L.DomUtil.create('a', '', container);

        link.href = '#';
        link.title = 'Add a new marker';
        link.innerHTML = 'M';
        L.DomEvent.on(link, 'click', L.DomEvent.stop)
            .on(link, 'click', function() {
                map.editTools.startMarker();
            });

        return container;
    }
});

var snap = new L.Handler.MarkerSnap(map);
snap.addGuideLayer(snapLine);
snap.watchMarker(map.editTools.newClickHandler);

map.on('editable:vertex:dragstart', function (e) {
    snap.watchMarker(e.vertex);
});
map.on('editable:vertex:dragend', function (e) {
    snap.unwatchMarker(e.vertex);
});

map.addControl(new L.NewMarkerControl());
map.addControl(new L.NewLineControl());
map.addControl(new L.NewPolygonControl());