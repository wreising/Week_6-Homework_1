const express = require('express')
const path = require('path')

const app = express()

// get the notes
app.get('/api/notes', (req, res) => {
  res.json(notes)
})

// post a new note
app.post('/api/notes', (req, res) => {
  let newNote = { // from index.js
    title: req.body.title,
    text: req.body.text,
    id: uid()
  }
  notes.push(newNote)
  res.json(200)
})

// delete a note
app.delete('/api/notes/:id', (req, res) => {
  notes = notes.filter(note => note.id !== req.params.id)
  res.json(notes)
})

