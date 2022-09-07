const express = require('express')
const router = express.Router()
const fs = require('fs')

// your routes would go here
// GET /prehistoric_creatures -- READ all creatures
// get the creatures from the db
const readCreatureFile = () => {
    // use the filesystem to read the creature json
    const creatures = fs.readFileSync('./prehistoric_creatures.json')
    // parse the file into json data
    const creatureData = JSON.parse(creatures)
    return creatureData
}

// GET /prehistoric_creatures -- show all creatures
router.get('/', (req, res) => {
    const creatureData = readCreatureFile()
    // send the creature info to the client
    res.render('creatures/index.ejs', {
        creatures: creatureData,
    })
})

// GET /prehistoric_creatures/new -- display a form to create a new creature
router.get('/new', (req, res) => {
    res.render('creatures/new.ejs')
})

// POST /prehistoric_creatures -- create a new creature in the DB
router.post('/', (req, res) => {
    // read the creature file
    const creatureData = readCreatureFile()
    // payload of data from the request body (req.body)
    // push the data payload into the array of creatures
    console.log(req.body)
    creatureData.push(req.body)
    // save the creature file
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))
    // on POST routes -- DO NOT RENDER A TEMPLATE (this can broken)
    // redirect to where you can find a template
    // redirects tell browsers to make a GET request on a url
    res.redirect('/prehistoric_creatures')
})

// GET /prehistoric_creatures/:id -- display the details of one specific creature
router.get('/:id', (req, res) => {
    // get the creatures from the file
    const creatureData = readCreatureFile()
    // look up array index from the url route params
    const creature = creatureData[req.params.id]
    // send back a single creature
    res.render('creatures/show.ejs', {mycreature: creature})
})

// DELETE /prehistoric_creatures/:id -- delete a specific creaturesaur from the database
router.delete('/:id', (req,res) => {
    const creatureData = readCreatureFile()

    // remove a creaturesaur from the array
    // .splice is an array method that takes 2 arguments:
    // array.splice(indexToBeginAt, # of things to remove)
    creatureData.splice(req.params.id, 1)

    // save the new prehistoric_creatures to the prehistoric_creatures.json file
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))

    res.redirect('/prehistoric_creatures')
})

// GET our update form
router.get('/edit/:id', (req,res) => {
    const creatureData = readCreatureFile()
    const creature = creatureData[req.params.id]

    res.render('creatures/edit.ejs', {myCreature: creature, creatureId: req.params.id})
})

// PUT our new edited data into our database
router.put('/:id', (req,res) => {
    const creatureData = readCreatureFile()

    creatureData[req.params.id].name = req.body.name
    creatureData[req.params.id].type = req.body.type

    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))
    res.redirect('/prehistoric_creatures')
})

module.exports = router