const fs = require("fs")
const express = require("express");
const server = express();
const path = require("path")
const PORT = process.env.PORT || 3010

server.use(express.json())
server.use(express.urlencoded({extended: true}))
server.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "notes.html"))
})

server.get("/api/notes", (req, res) => {
  res.json(JSON.parse(fs.readFileSync("./db.json", "utf8")));
  console.log(req.body)
});

server.post("/api/notes", (req, res) => {
  console.log(req.body)
  let newNote = req.body;
  const savedNotes = JSON.parse(fs.readFileSync("./db.json", "utf8"));
  savedNotes.push(newNote);
  fs.writeFileSync("./db.json", JSON.stringify(savedNotes));
  res.status(200).json({added: true});
  
});

server.delete("/api/notes/:id", (req, res) => {
  let id = req.params.id


  let savedNotes = JSON.parse(fs.readFileSync("./db.json"));

  const notes = savedNotes.filter((note) => note.id !== id);
  fs.writeFileSync("./db.json", JSON.stringify(notes));
  res.status(200).json({deleted: true});
});



server.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"))
})

server.listen(PORT, function(){
  console.log("Api server now listening on port: " + PORT)
})