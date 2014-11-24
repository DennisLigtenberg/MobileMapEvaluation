$(document).ready(function() {
    //get coordinates and zoom from URL
    var params = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(x, key, value) {
        params[key] = value;
    });

    var zoomStart = 0

    var osmAttribution = createAttribution(osmAttributionUrl, osmAttributionText);
    var swissstyle = addTileLayer(osmSrc, osmAttribution);

    var mapboxAttribution = createAttribution(mapboxAttributionUrl, mapboxAttributionText);
    var mapbox = addTileLayer(mapboxSrc, mapboxAttribution);

    var road = new L.LayerGroup(),
        src = (geoJsonRoad)
        road =  loadGeojson(src ,road, "");

    var castles = new L.LayerGroup(),
        layerIcon = L.icon({
            iconUrl: castleIcon,
            iconSize: [28, 28]
        }),
        castles =  loadGeojson(geoJsonCastle,castles, layerIcon);

    var p1 = new L.LatLng(45.7300, 5.8000),s
        p2 = new L.LatLng(47.9000, 10.600),
        bounds = L.latLngBounds(p1, p2);

    var map = L.map('map', {
        editable: true,
        center: [params.lat || centerLat, params.lng || centerLng],
        zoom: params.zoom || startZoom,
        maxBounds: bounds,
        layers: [swissstyle, castles]
    });

    updateLink(map);

    var baseMaps = {
        "Mapbox Satellite": mapbox,
        "Swiss Style OSM": swissstyle
    };

    var overlay = {
        "Castles": castles,
        "Roads": road
    };

    map.on('move', function(){
        updateLink(map);
    });

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

    map.on('zoomstart', function(){
        zoomStart = map.getZoom();
        console.log(zoomStart);
    });

    //only show castles from zoom level 9
    map.on('zoomend', function(){
        if(zoomStart == 8){
            map.addLayer(castles)
        }
        else if (map.getZoom() == 8){map.removeLayer(castles)}
    })

    //loading spinner
    var loadingControl = L.Control.loading({
        spinjs: true
    });

    L.FitBounds = addFitBounds(bounds);
    L.polygonControl = addControl("topleft", "Create a new polygon", "□", "map.editTools.startPolygon()");
    L.lineControl = addControl("topleft", "Create a new line", "/", "map.editTools.startPolyline()");
    L.markerControl = addControl("topleft", "Create a new marker", "●", "map.editTools.startMarker()");

    L.control.mousePosition().addTo(map);
    L.control.scale({imperial: false}).addTo(map);
    L.control.layers(baseMaps, overlay).addTo(map);
    map.addControl(new L.FitBounds());
    map.addControl(new L.markerControl());
    map.addControl(new L.lineControl());
    map.addControl(new L.polygonControl());
});
