$(document).ready(function() {
    //get coordinates and zoom from URL
    var params = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(x, key, value) {
        params[key] = value;
    });

    //Add background layers with custom attributions
    var osmAttribution = createAttribution(osmAttributionUrl, osmAttributionText);
    var swissstyle = addTileLayer(osmSrc, osmAttribution);

    var mapboxAttribution = createAttribution(mapboxAttributionUrl, mapboxAttributionText);
    var mapbox = addTileLayer(mapboxSrc, mapboxAttribution);

    //Add a roads (Lines features) to test snapping from geojson
    var road = new L.LayerGroup(),
        src = (geoJsonRoad)
        road =  loadGeojson(src ,road, "");

    //Add casltes from geojson
    var castles = new L.LayerGroup(),
        layerIcon = L.icon({
            iconUrl: castleIcon,
            iconSize: [28, 28]
        }),
        castles =  loadGeojson(geoJsonCastle,castles, layerIcon);

    //Create Leaflet bounds
    var p1 = new L.LatLng(lfbounds[0], lfbounds[1]),
        p2 = new L.LatLng(lfbounds[2], lfbounds[3]),
        bounds = L.latLngBounds(p1, p2);
    //Create the map
    var map = L.map('map', {
        editable: true,
        center: [params.lat || centerLat, params.lng || centerLng],
        zoom: params.zoom || startZoom,
        maxBounds: bounds,
        layers: [swissstyle, castles]
    });

    //Initial link update
    updateLink(map);

    //Define the base map group for the control
    var baseMaps = {
        "Mapbox Satellite": mapbox,
        "Swiss Style OSM": swissstyle
    };

    //Define the feature overlay group for the control
    var overlay = {
        "Castles": castles,
        "Roads": road
    };

    //updates link on every mapmovement
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
    var zoomStart = 0;
    var haslayer = true;

    //Checks if castles layer is displayed and gets zoom level before zoom start
    map.on('zoomstart', function(){
        zoomStart = map.getZoom();
        if(zoomStart != 8) {
            haslayer = map.hasLayer(castles)
        }
    });

    //only show castles from zoom level 9
    map.on('zoomend', function(){
        if(zoomStart == 8 && haslayer == true){
            map.addLayer(castles)
        }
        else if (map.getZoom() == 8){map.removeLayer(castles)}
    })

    //loading spinner from plugin
    var loadingControl = L.Control.loading({
        spinjs: true
    });

    //add editing/creating controls
    L.FitBounds = addFitBounds(bounds);
    L.polygonControl = addControl("topleft", "Create a new polygon", "□", "map.editTools.startPolygon()");
    L.lineControl = addControl("topleft", "Create a new line", "/", "map.editTools.startPolyline()");
    L.markerControl = addControl("topleft", "Create a new marker", "●", "map.editTools.startMarker()");

    //different control elements
    L.control.mousePosition().addTo(map);
    L.control.scale({imperial: false}).addTo(map);
    L.control.layers(baseMaps, overlay).addTo(map);
    map.addControl(new L.FitBounds());
    map.addControl(new L.markerControl());
    map.addControl(new L.lineControl());
    map.addControl(new L.polygonControl());
});
