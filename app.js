var express = require("express"),
    tj = require('@mapbox/togeojson'),
    fs = require('fs'),
    cors = require('cors'),
    inside = require('point-in-polygon'),
    // node doesn't have xml parsing or a dom. use xmldom
    DOMParser = require('xmldom').DOMParser;

var app = express();
var port = process.env.PORT || 3000;

app.use(cors()); 

var outletRouter = express.Router();
outletRouter.route('/outlet')
    .get(function(req, res){
        var lat = req.param('lat');
        var lng = req.param('lng');
        res.send([findOutlet(lat, lng)]);
    });
app.use('/api', outletRouter);

app.get('/', function(req, res){
    res.send("Welcome to outlet finder API.");
});

app.listen(port, function(){
    console.log("Listening to port: " + port);
});

function findOutlet(lat, lng) {
    var requestLocation = [lng, lat, 0];
    var kml = new DOMParser().parseFromString(fs.readFileSync('outlet.kml', 'utf8'));
    var converted = tj.kml(kml);
    var convertedWithStyles = tj.kml(kml, { styles: true });
    var result = converted.features.find(checkPlacemark, requestLocation);
    return result ? result.properties.name : "";
}

function checkPlacemark(element) {
    var requestLocation = this;
    if (element.geometry.coordinates.length === 3
        && inside(requestLocation, element.geometry.coordinates)) {
        return true;
    }else if(element.geometry.coordinates.length === 1
        && inside(requestLocation, element.geometry.coordinates[0])) {
        return true;
    }
    return false;
}