const express = require('express')
let notes = require('./db/db.json')
const { join } = require('path')
const { writeFile, readFile } = require('fs')
// const { uid } = require('uid')
const { v4: uuidv4 } = require('uuid')

const app = express()

// boiler plate
app.use(express.static(join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// access to index.html
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'index.html'))
})

// access to notes.html
app.get('/notes', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'notes.html'))
})

// get the notes from the DB
app.get('/api/notes', (req, res) => {
  readFile(join(__dirname, 'db', 'db.json'), 'utf8', (err, data) => {
    if (err) { console.log(err) }
    res.json(JSON.parse(data))
  })
})

// post new notes
app.post('/api/notes', (req, res) => {
  if (req.body.title.length < 1) {
    return res.json({})
  } else {
    if (!req.body.title) {
      req.body.title = ''
    }
    readFile(join(__dirname, 'db', 'db.json'), 'utf8', (err, data) => {
      if (err) { console.log(err) }
      req.body.id = uuidv4()
      const notes = JSON.parse(data)
      notes.push(req.body)
      writeFile(join(__dirname, 'db', 'db.json'), JSON.stringify(notes), err => {
        if (err) { console.log(err) }
        res.json(req.body)
        console.log(notes)
      })
    })
  }
})

// delete a note
app.delete('/api/notes/:id', (req, res) => {
  console.log(notes)
  notes = notes.filter(note => note.id !== req.params.id)
  writeFile(join(__dirname, 'db', 'db.json'), JSON.stringify(notes), err => {
    if (err) { console.log(err) }
  })
  res.json(notes)
  console.log(notes)
})

// listen on port 3000
app.listen(process.env.PORT || 3000)