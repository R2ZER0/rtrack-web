/* Set up map */
var map = L.map('super-epic-map');
var markers = [];

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="http://mapbox.com">Mapbox</a>'
}).addTo(map);

map.setZoom(16);

function clear_points() {
    for(var i = 0; i < markers.length; i++) {
        markers[i].removeFrom(map);
    }
    markers = [];
}

function plot_points(points) {    
    for(var i = 0; i < points.length; i++) {
        markers.push(
            L.marker(points[i]).addTo(map)
        );   
    }
}

/* Get location */
var locationUrl = "http://gallium.r2zer0.net:5000/";
var historyUrl  = "http://gallium.r2zer0.net:5000/history";

function show_latest() {
    $.getJSON(locationUrl, function(loc) {
        var lat = parseFloat(loc.latitude);
        var lng = parseFloat(loc.longitude);
        
        map.setView([lat, lng]);
        
        plot_points([[lat, lng]]);
    });
}

function show_history() {
    /* clear_points(); */
    
    var from = new Date($('#picker-from-input').val()).getTime();
    var to = new Date($('#picker-to-input').val()).getTime();
    
    var url = historyUrl + "/" + from + "/" + to;
    
    $.getJSON(url, function(data) {
        var hist = data.history;
        points = [];
        for(var i = 0; i < hist.length; i++) {
            var lat = parseFloat(hist[i].latitude);
            var lng = parseFloat(hist[i].longitude);
            points.push([lat, lng]);
        }
        plot_points(points);
    });
    
}

show_latest();