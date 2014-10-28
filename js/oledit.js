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

var typeSelect = document.getElementById('type');

var modify = new ol.interaction.Modify({
    features: featureOverlay.getFeatures(),
    deleteCondition: function(event) {
        return ol.events.condition.shiftKeyOnly(event) &&
            ol.events.condition.singleClick(event);
    }
});
map.addInteraction(modify);

var draw; // global so we can remove it later
function addInteraction() {
    var value = typeSelect.value;
    if (value !== 'None') {
        draw = new ol.interaction.Draw({
            features: featureOverlay.getFeatures(),
            type: /** @type {ol.geom.GeometryType} */ (typeSelect.value)
        });
        map.addInteraction(draw);
    }
}


/**
 * Let user change the geometry type.
 * @param {Event} e Change event.
 */
typeSelect.onchange = function(e) {
    map.removeInteraction(draw);
    addInteraction();
};

addInteraction();