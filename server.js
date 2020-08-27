const fs = require("fs")
const express = require("express");
const server = express();
const path = require("path")
const PORT = 3010
const index = require("index.html")

server.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"))
})

server.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "notes.html"))
})

server.get("/api/notes", function(req, res) {
    fs.writeFile("db.json", index[0], function() {
        
    })
})

server.post("/api/notes", function(req, res) {
    res.sendFile(path.join(_dirname, "index.html"))
})

server.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "notes.html"))
})

server.listen(PORT, function () {
    console.log("App is listening on port " + PORT)
})