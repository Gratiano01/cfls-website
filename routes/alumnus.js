var express = require('express')
var router = express.Router()
const { getAllAlumni } = require('../alumnus')

/* GET users listing. */
router.get('/', async function (req, res, next) {
  const list = await getAllAlumni()
  res.render('alumnus', { list })
})
module.exports = router
