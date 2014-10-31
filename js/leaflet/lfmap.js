$(document).ready(function() {
    //Initialise tile Layers
    var swissstyle = L.tileLayer("http://tile.osm.ch/osm-swiss-style/{z}/{x}/{y}.png", {
        attribution:  'Map data &copy; <a href="http://www.osm.ch/">osm.ch</a> | ' +
        '<a href="http://giswiki.hsr.ch/Webmapping_Clients">About</a> | ' +
        '<a href="http://www.hsr.ch/geometalab">By GeometaLab</a>',
        minZoom: 9
    });

    var mapbox = L.tileLayer("http://api.tiles.mapbox.com/v4/sfkeller.k0onh2me/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic2ZrZWxsZXIiLCJhIjoia3h4T3pScyJ9.MDLSUwpRpPqaV7SVfGcZDw", {
        attribution:  'Map data &copy; <a href="http://www.mapbox.com">Mapbox</a> | ' +
        '<a href="http://giswiki.hsr.ch/Webmapping_Clients">About</a> | ' +
        '<a href="http://www.hsr.ch/geometalab">By GeometaLab</a>',
        minZoom: 9
    });

    var road = new L.LayerGroup();

    $.getJSON("geojson/daten.geojson", function(data) {
        var jsoncastles = L.geoJson(data, {
            onEachFeature: function (feature, layer) {
            },
            pointToLayer: function (feature, latlng) {
                return L.polyline(latlng);
            }
        });
        jsoncastles.addTo(road);
    });

    //Loading geojson files
    var castles = new L.LayerGroup();
    var castleIcon = L.icon({
        iconUrl: 'img/Castle.png',
        iconSize: [28, 28]
    });
    var castles =  loadGeojson("geojson/castles.geojson",castles, castleIcon);

    var restaurants = new L.LayerGroup();

    //Mapbounds
    var p1 = new L.LatLng(45.7300, 5.8000),
        p2 = new L.LatLng(47.9000, 10.600),
        bounds = L.latLngBounds(p1, p2);

    //Initialising map
    var map = L.map('map', {
        editable: true,
        drawControl: true,
        center: [47.2267,8.8167],
        zoom: 11,
        maxBounds: bounds,
        layers: [swissstyle, castles]
    });

    //Setting elements of Background Layer group
    var baseMaps = {
        "Mapbox Satellite": mapbox,
        "SwissStyle": swissstyle
    };

    //Setting elements of Thematic Layer group
    var overlay = {
        "Castles": castles,
        "Restaurants": restaurants,
        "Road": road
    };


    //Enabling snapping for Feature editing/creation
    var snap = new L.Handler.MarkerSnap(map);
    snap.addGuideLayer(road);
    snap.watchMarker(map.editTools.newClickHandler);
    map.on('editable:vertex:dragstart', function (e) {
        snap.watchMarker(e.vertex);
    });
    map.on('editable:vertex:dragend', function (e) {
        snap.unwatchMarker(e.vertex);
    });

    //Loaging spinner
    var loadingControl = L.Control.loading({
        spinjs: true
    });

    //Creating control buttons
    L.FitBounds = addFitBounds(bounds);
    L.polygonControl = addPolygonControl();
    L.lineControl = addLineControl();
    L.markerControl = addMarkerControl();


    //Adding controll buttons
    map.addControl(loadingControl);
    map.addControl(new L.FitBounds());
    L.control.mousePosition().addTo(map);
    L.control.scale({imperial: false}).addTo(map);
    L.control.layers(baseMaps, overlay).addTo(map);
    map.addControl(new L.markerControl());
    map.addControl(new L.lineControl());
    map.addControl(new L.polygonControl());
});
