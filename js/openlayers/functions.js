var addFeatureOverlay = function () {
    return new ol.FeatureOverlay({
        style: new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(255, 255, 255, 0.2)'
            }),
            stroke: new ol.style.Stroke({
                color: '#ffcc33',
                width: 2
            }),
            image: new ol.style.Circle({
                radius: 7,
                fill: new ol.style.Fill({
                    color: '#ffcc33'
                })
            })
        })
    });
};

var updateLink = function (map) {
    var coords = map.getView().getCenter();
    var zoom = map.getView().getZoom();
    coords = ol.proj.transform(coords, 'EPSG:3857', 'EPSG:4326');
    $(".olSwitch").prop("href", "index.html?lat=" + coords[1] + "&lng=" + coords[0] + "&zoom=" + zoom + "");
    $(".olTitle").prop("href", "openlayers.html?lat=" + coords[1] + "&lng=" + coords[0] + "&zoom=" + zoom + "");
};