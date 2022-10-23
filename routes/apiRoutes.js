const util = require('util')
const fs = require('fs')
// handle asynchrono process dont know what this is but looks good
const readFileAsync = util.promisify(fs.readFile)
const writeFileAsync = util.promisify(fs.writeFile)

module.exports = function(app){

// API route Get request
app.get("/api/notes", function(req,res) {
    // resdfile from db.json
    // UTF-8 is the preferred encoding for e-mail and web pages
    readFile("./develop/db/db.json", "utf8").then(function(data) {
        // dotes variable will take data from empty array and 
        // concatenate it and parse it as JSON
        notes = [].concat(JSON.parse(data))
        //response will json format notes
        res.json(notes);
    })
});


// API route Post request
app.post("/api/notes", function(req,res) {
    const note = req.body;
    readFileAsync("./develop/db/db.json", "utf8").then(function(data) {
        const notes = [].concat(JSON.parse(data));
        note.id = notes.length + 1
        notes.push(note);
        return notes
    }).then(function(notes) {
        writeFileAsync("./develop/db/db.json", JSON.stringify(notes))
        res.json(note);
    })
});

}

