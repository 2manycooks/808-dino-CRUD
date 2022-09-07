const express = require('express')
const router = express.Router()
const fs = require('fs')

// get the dinos from the db
const readDinoFile = () => {
    // use the filesystem to read the dino json
    const dinosaurs = fs.readFileSync('./dinosaurs.json')
    // parse the file into json data
    const dinoData = JSON.parse(dinosaurs)
    return dinoData
}

// GET /dinosaurs -- show all dinos
router.get('/', (req, res) => {
    const dinoData = readDinoFile()
    // send the dino info to the client
    // TODO: add ejs view
    res.render('dinos/index.ejs', {
        dinos: dinoData,
        // myDataName: 'hello template, how are you?'
    })
})

// GET /dinosaurs/new -- display a form to create a new dino
router.get('/new', (req, res) => {
    res.render('dinos/new.ejs')
})

// POST /dinosaurs -- create a new dino in the DB
router.post('/', (req, res) => {
    // read the dino file
    const dinoData = readDinoFile()
    // payload of data from the request body (req.body)
    // push the data payload into the array of dinos
    // console.log(req)
    console.log(req.body)
    dinoData.push(req.body)
    // save the dino file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
    // on POST routes -- DO NOT RENDER A TEMPLATE (this can broken)
    // redirect to where you can find a template
    // redirects tell browsers to make a GET request on a url
    res.redirect('/dinosaurs')
})

// GET /dinosaurs/:id -- display the details of one specific dino
router.get('/:id', (req, res) => {
    // get the dinos from the file
    const dinoData = readDinoFile()
    // look up array index from the url route params
    const dino = dinoData[req.params.id]
    // send back a single dino
    res.render('dinos/show.ejs', {myDino: dino})
})

// DELETE /dinosaurs/:id -- delete a specific dinosaur from the database
router.delete('/:id', (req,res) => {
    const dinoData = readDinoFile()

    // remove a dinosaur from the array
    // .splice is an array method that takes 2 arguments:
    // array.splice(indexToBeginAt, # of things to remove)
    dinoData.splice(req.params.id, 1)

    // save the new dinosaurs to the dinosaurs.json file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))

    res.redirect('/dinosaurs')
})

// GET our update form
router.get('/edit/:id', (req,res) => {
    const dinoData = readDinoFile()
    const dino = dinoData[req.params.id]

    res.render('dinos/edit.ejs', {myDino: dino, dinoId: req.params.id})
})

// PUT our new edited data into our database
router.put('/:id', (req,res) => {
    const dinoData = readDinoFile()

    // reassign the name and type of the dinosaur we are editing
    dinoData[req.params.id].name = req.body.name
    dinoData[req.params.id].type = req.body.type

    // save the edited dinosaurs to the dinosaur.json file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
    res.redirect('/dinosaurs')

})

module.exports = router