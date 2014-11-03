var featureOverlay = new ol.FeatureOverlay({
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
featureOverlay.setMap(map);

var modify = new ol.interaction.Modify({
    features: featureOverlay.getFeatures()
});
map.addInteraction(modify);

var draw;

function addInteraction(type) {
    if (type !== 'None') {
        draw = new ol.interaction.Draw({
            features: featureOverlay.getFeatures(),
            type: (type)
        });
        map.addInteraction(draw);
    }
}

$("#none, #point, #lineString, #polygon").click(function() {
    map.removeInteraction(draw);
    addInteraction($(this).attr("value"));
});
addInteraction("None");