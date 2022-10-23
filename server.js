// import dependencies 
const express = require('express');
const util = require('util');
const fs = require('fs');
const path = require('path');


// handle asynchrono process dont know what this is but looks good
const readFileAsync = util.promisify(fs.readFile)
const writeFileAsync = util.promisify(fs.writeFile)


// Set up the Server
const app = express();
//process.env returns object containing user environment
const PORT = process.env.PORT || 3000;

// data parsing 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// middleware
app.use(express.static("./Develop/public"));


/// API route Get request

    app.get("/api/notes", function (req, res) {
        // resdfile from db.json
        // UTF-8 is the preferred encoding for e-mail and web pages
        readFileAsync("./Develop/db/db.json", "utf8").then(function (data) {
            // dotes variable will take data from empty array and 
            // concatenate it and parse it as JSON
            notes = [].concat(JSON.parse(data))
            //response will json format notes
            res.json(notes);
        })
    });


    // API route Post request
    app.post("/api/notes", function (req, res) {
        // create a variable for the request body of the note.
        const note = req.body;
        // use the promisefy inbuilt nodejs function to handle the promises 
        readFileAsync("./Develop/db/db.json", "utf8").then(function (data) {
            // pass the data into a notes variable array 
            const notes = [].concat(JSON.parse(data));
            // create id as the length of array
            note.id = notes.length + 1
            // notes
            notes.push(note);

            return notes
        }).then(function (notes) {
            // with the notes variable write the promise to notes in a stringify format
            writeFileAsync("./Develop/db/db.json", JSON.stringify(notes))
            //result not in json
            res.json(note);
        })
    });

//these are the HTML routes for the server

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "./Develop/public/notes.html"))
});


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "./Develop/public/index.html"))
});


app.get('*', (res, req) => {
    res.sendFile(path.join(__dirname, "./Develop/public/index.html"))
});


// listener port
app.listen(PORT, function () {
    console.log('App listening on PORT ' + PORT)
})















module.exports = app