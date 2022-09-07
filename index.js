// required packages
const express = require('express')
const layout = require('express-ejs-layouts')
const methodOverride = require("method-override");


// express app config
const app = express()
const PORT = 3001
app.set('view engine', 'ejs')

// middlewares section
app.use(layout)
// tell express to listen for request bodies sent from HTML forms
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride("_method"))
app.use((req, res, next) => {
    console.log('hello I am the world\'s smallest middleware 👋')
    // invoke to tell express to continue with the other middlewars
    next()
})

// route definitions
app.get('/', (req, res) => {
    res.render('home.ejs')
})

// controllers
app.use('/dinosaurs', require('./controllers/dinoController'))
app.use('/prehistoric_creatures', require('./controllers/prehistoricCreaturesController'))

// listen on a port
app.listen(PORT, () => console.log(`is that dinos i hear on port ${PORT} 🦕`))