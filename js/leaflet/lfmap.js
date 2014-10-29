$(document).ready(function() {

    var snapLine = L.polyline([
        [
            47.34301034806174,
            8.887939453125
        ],
        [
            47.11593438245697,
            8.633193969726562
        ]
    ], {color: 'red'});

    var swissstyle = addTileLayer("http://tile.osm.ch/osm-swiss-style/{z}/{x}/{y}.png",
        'Map data &copy; <a href="http://www.osm.ch/">osm.ch</a> | ' +
        '<a href="http://www.hsr.ch/geometalab">By GeometaLab</a>', 9);

    var mapbox = addTileLayer('http://api.tiles.mapbox.com/v4/sfkeller.k0onh2me/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic2ZrZWxsZXIiLCJhIjoia3h4T3pScyJ9.MDLSUwpRpPqaV7SVfGcZDw',
        'Map data &copy; <a href="http://www.mapbox.com">Mapbox</a> | ' +
        '<a href="http://www.hsr.ch/geometalab">By GeometaLab</a>', 9)

    var p1 = new L.LatLng(45.7300, 5.8000),
        p2 = new L.LatLng(47.9000, 10.600),
        bounds = L.latLngBounds(p1, p2);

    var castles = new L.LayerGroup();
    var castleIcon = L.icon({
        iconUrl: 'img/Castle.png',
        iconSize: [28, 28]
    });
    var castles =  loadGeojson("geojson/castles.geojson",castles, castleIcon);

    var restaurants = new L.LayerGroup();


    var map = L.map('map', {
        editable: true,
        drawControl: true,
        center: [47.2267,8.8167],
        zoom: 11,
        maxBounds: bounds,
        layers: [swissstyle, castles, snapLine]
    });

    var baseMaps = {
        "Mapbox Satellite": mapbox,
        "SwissStyle": swissstyle
    };

    var overlay = {
        "Castles": castles,
        "Restaurants": restaurants
    };


    var snap = new L.Handler.MarkerSnap(map);
    snap.addGuideLayer(snapLine);
    snap.watchMarker(map.editTools.newClickHandler);
    map.on('editable:vertex:dragstart', function (e) {
        snap.watchMarker(e.vertex);
    });
    map.on('editable:vertex:dragend', function (e) {
        snap.unwatchMarker(e.vertex);
    });


    L.FitBounds = addFitBounds(bounds);
    L.polygonControl = addPolygonControl();
    L.lineControl = addLineControl();
    L.markerControl = addMarkerControl();

    var loadingControl = L.Control.loading({
        spinjs: true
    });

    map.addControl(loadingControl);
    map.addControl(new L.FitBounds());
    L.control.mousePosition().addTo(map);
    L.control.scale({imperial: false}).addTo(map);
    L.control.layers(baseMaps, overlay).addTo(map);
    map.addControl(new L.markerControl());
    map.addControl(new L.lineControl());
    map.addControl(new L.polygonControl());
});
