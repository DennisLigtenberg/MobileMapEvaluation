var createLayer = function(visible, name, url, attribution) {
    return new ol.layer.Tile({
        title: name,
        type: "base",
        visible: visible,
        source: new ol.source.XYZ({
            url: url,
            attributions: [attribution]
        })
    })
};

var createAttribution = function(mapdesc, mapsrc){
    return new ol.Attribution({
        html: "Map data &copy; <a href=" + mapsrc + ">" + mapdesc + "</a> | " +
        "<a href='http://giswiki.hsr.ch/Webmapping_Clients'>About</a> | " +
        "<a href='http://www.hsr.ch/geometalab'>By GeometaLab -------</a>"
    });
};

var loadGeoJson = function(title, source, projection, iconSrc){
    return new ol.layer.Vector({
        title: title,
        source: new ol.source.GeoJSON({
            url: source,
            projection: projection
        }),
        style: new ol.style.Style({
            image: new ol.style.Icon(({
                src: iconSrc
            }))
        })
    })
};