const fs = require("fs")
const express = require("express");
const server = express();
const path = require("path")
const PORT = 3010

server.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"))
})

server.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "notes.html"))
})

server.get("/api/notes", (req, res) => {
  res.json(JSON.parse(fs.readFileSync("./db/db.json", "utf8")));
});

server.post("/api/notes", (req, res) => {
  req.body.id = Math.floor(Math.random() * 100000000);
  let newNote = req.body;

  const savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8").toString());
  savedNotes.push(newNote);
  fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
  res.status(200).json({added: true});

});

server.delete("/api/notes/:id", (req, res) => {
  let id = parseInt(req.params.id);
  console.log(id);


  let savedNotes = JSON.parse(fs.readFileSync("./db/db.json").toString());

  const notes = savedNotes.filter((note) => note.id !== id);
  console.log(notes);
  fs.writeFileSync("./db/db.json", JSON.stringify(notes));
  res.json();
});