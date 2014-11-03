$(document).ready(function() {
    //get coordinates and zoom from URL
    var params = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(x, key, value) {
        params[key] = Number(value);
    });

    var swissstyle = addTileLayer(osmSrc, osmAttribution, osmZoom);

    var mapbox = addTileLayer(mapboxSrc, mapboxAttribution, mapboxZoom);

    var road = new L.LayerGroup(),
        src = ("geojson/daten.geojson")
        road =  loadGeojson(src ,road, "");

    var castles = new L.LayerGroup(),
        castleIcon = L.icon({
            iconUrl: 'img/Castle.png',
            iconSize: [28, 28]
        }),
        castles =  loadGeojson(geoJsonCastle,castles, castleIcon);

    var p1 = new L.LatLng(45.7300, 5.8000),
        p2 = new L.LatLng(47.9000, 10.600),
        bounds = L.latLngBounds(p1, p2);

    var map = L.map('map', {
        editable: true,
        drawControl: true,
        center: [params.lat || 47.2267, params.lng || 8.8167],
        zoom: params.zoom || 8,
        maxBounds: bounds,
        layers: [swissstyle]
    });

    var baseMaps = {
        "Mapbox Satellite": mapbox,
        "SwissStyle": swissstyle
    };

    var overlay = {
        "Castles": castles,
        "Roads": road
    };


    //enabling snapping for Feature editing/creation
    var snap = new L.Handler.MarkerSnap(map);
    snap.addGuideLayer(road);
    snap.watchMarker(map.editTools.newClickHandler);
    map.on('editable:vertex:dragstart', function (e) {
        snap.watchMarker(e.vertex);
    });
    map.on('editable:vertex:dragend', function (e) {
        snap.unwatchMarker(e.vertex);
    });

    //only show castles from zoom level 9
    map.on('zoomend', function(e){
        if (map.getZoom() < 9 ){map.removeLayer(castles)}
        else if (map.getZoom() >= 9 ){map.addLayer(castles)}
    })

    //loading spinner
    var loadingControl = L.Control.loading({
        spinjs: true
    });

    L.FitBounds = addFitBounds(bounds);
    L.polygonControl = addPolygonControl();
    L.lineControl = addLineControl();
    L.markerControl = addMarkerControl();


    map.addControl(loadingControl);
    map.addControl(new L.FitBounds());
    L.control.mousePosition().addTo(map);
    L.control.scale({imperial: false}).addTo(map);
    L.control.layers(baseMaps, overlay).addTo(map);
    map.addControl(new L.markerControl());
    map.addControl(new L.lineControl());
    map.addControl(new L.polygonControl());
});
