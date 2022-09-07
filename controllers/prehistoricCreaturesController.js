const express = require('express')
const router = express.Router()
const fs = require('fs')

// your routes would go here
// GET /prehistoric_creatures -- READ all creatures
router.get('/', (req, res) => {
    res.send('show a list of prehistoric creatures')
})

module.exports = router