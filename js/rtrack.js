/* Set up map */
var map = L.map('super-epic-map');
var marker = null;

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="http://mapbox.com">Mapbox</a>'
}).addTo(map);

map.setZoom(16);

/* Get location */
var locationUrl = "http://gallium.r2zer0.net:5000/whereisrikki";

function updateLocation() {
$.getJSON(locationUrl, function(loc) {

    console.log("Success!");
    console.log(loc);
    
    var lat = parseFloat(loc.latitude);
    var lng = parseFloat(loc.longitude);

    /* Set up map */
    map.setView([lat, lng]);
    
    if(marker !== null) {
    //marker.removeFrom(map);
    marker = null;
    }
    
    marker = L.marker([lat, lng]).addTo(map);
    

}).fail(function () {
    console.log("Error :(");
});
}

updateLocation();
window.setInterval(updateLocation, 60000);