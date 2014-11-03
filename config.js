//XYZ-TileLayer source url
var osmSrc = "http://tile.osm.ch/osm-swiss-style/{z}/{x}/{y}.png";
var mapboxSrc = "http://api.tiles.mapbox.com/v4/sfkeller.k0onh2me/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic2ZrZWxsZXIiLCJhIjoia3h4T3pScyJ9.MDLSUwpRpPqaV7SVfGcZDw";

//layername
var osmName = "Swiss Style OSM";
var mapboxName = "Mapbox Satellite";

//Map-Copyright url/linktext
var osmAttributionUrl = "http://www.osm.ch/";
var osmAttributionText = "osm.ch";
var mapboxAttributionUrl = "http://www.mapbox.com";
var mapboxAttributionText = "Mapbox";

//minimal layer zoom level
var minZoom = 8;

//castles source and icon url
var geoJsonCastle = "geojson/castles.geojson";
var castleIcon = "img/Castle.png";