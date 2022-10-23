// import dependencies 
const express = require('express');
const fs = require('fs');








// Set up the Server
const app = express();
//process.env returns object containing user environment
const PORT = process.env.PORT || 3000;

// data parsing 
app.use(express.urlencoded( {extended: true} ));
app.use(express.json());

// middleware
app.use(express.static("./Develop/public"));

// use the routes for data

require("./routes/htmlRoutes")(app);
require("./routes/apiRoutes")(app);

// display the html on the live server


// listener port
app.listen(PORT, function() {
    console.log('App listening on PORT ' + PORT)
})















module.exports = app