# kml-polygon-parsing-with-node

This is a node server, which will parse a KML file and change it to JSON file.
It will check if a placemark exists for a given latitude and longitude in a KML file.


It is using nodemon to automatically detect the changes done on this server.
Navigate to http://127.0.0.1:8000/api/outlet?lat=12.937340899999999&lng=77.7014441
It will parse the KML file and will check if the passed address has any outelts present.


A sample Front end app for this server can be found at:
https://github.com/riksphp/geolocation-angular


## Development server
Run go.sh

OR 

Run gulp
