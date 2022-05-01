var express = require("express"), 
    http = require("http"),
    app = express();

// set up a static file directory to use for default routing
// this is the line that does the trick

// the app that will be sent will be stored in the 
// "Express/client" directory
app.use(express.static(__dirname + "/client"));

// create Express-powered HTTP server
http.createServer(app).listen(3000);