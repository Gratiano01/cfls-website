var express = require('express')
var router = express.Router()
const { getAllTearch } = require('../teacher')

/* GET users listing. */
router.get('/', async function (req, res, next) {
  const list = await getAllTearch()

  res.render('teacher', { list: list })
})

module.exports = router
