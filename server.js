const express = require('express')
let notes = require('./db/db.json')
const path = require('path')
const fs = require('fs') // do I need this?
const { uid } = require('uid') // deconstructed?

const app = express()

// boiler plate
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// access to index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

// access to notes.html
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'))
})

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

// listen on port 3000
app.listen(process.env.PORT || 3000)