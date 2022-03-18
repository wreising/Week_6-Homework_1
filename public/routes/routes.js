const router = require('express').Router()
const { writeFile, readFile } = require('fs')
const { join } = require('path')
const { v4: uuidv4 } = require('uuid')


// get the notes from the DB
router.get('/api/notes', (req, res) => {
  readFile(join(__dirname, '..', 'db', 'db.json'), 'utf8', (err, data) => {
    if (err) { console.log(err) }
    res.json(JSON.parse(data))
    console.log('first get', notes)
  })
})

// post new notes
router.post('/api/notes', (req, res) => {
  if (req.body.title.length < 1) {
    return res.json({})
  } else {
    if (!req.body.title) {
      req.body.title = ''
    }
    readFile(join(__dirname, '..', 'db', 'db.json'), 'utf8', (err, data) => {
      if (err) { console.log(err) }
      req.body.id = uuidv4()
      const notes = JSON.parse(data)
      notes.push(req.body)
      console.log('after push', notes)
      writeFile(join(__dirname, '..', 'db', 'db.json'), JSON.stringify(notes), err => {
        if (err) { console.log(err) }
        res.json(req.body)
        console.log('after write', notes)
      })
    })
  }
})

// delete a note
router.delete('/api/notes/:id', (req, res) => {
  readFile(join(__dirname, '..', 'db', 'db.json'), 'utf8', (err, data) => {
    if (err) { console.log(err) }
  })
  console.log('before delete', notes)
  notes = notes.filter(note => note.id !== req.params.id)
  writeFile(join(__dirname, '..', 'db', 'db.json'), JSON.stringify(notes), err => {
    if (err) { console.log(err) }
  })
  res.json(notes)
  console.log('after delete', notes)
})

module.exports = router