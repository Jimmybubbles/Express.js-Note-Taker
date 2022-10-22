const path = require("path")

module.exports = function(app){

app.path("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/../public/notes.html"))
})

app.path("*", (res,req) => {
    res.sendFile(path.join(__dirname, "/../public/index.html"))
})
};