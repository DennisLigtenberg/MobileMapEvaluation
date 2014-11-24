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

var createAttribution = function(mapsrc, mapdesc){
    return new ol.Attribution({
        html: "&copy; <a href='http://wiki.openstreetmap.org/wiki/Open_Database_License'>OpenStreetMap</a> contributors  | " +
        "&copy; <a href=" + mapsrc + ">" + mapdesc + "</a> | " +
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
            fill: new ol.style.Fill({
                color: "#880000"
            }),
            image: new ol.style.Icon(({
                src: iconSrc
            }))
        })
    })
};