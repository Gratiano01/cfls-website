var express = require('express')
var router = express.Router()
const { getAllActivities } = require('../active')

/* GET users listing. */
router.get('/', async function (req, res, next) {
  const list = await getAllActivities()
  res.render('activeList', { list: list })
})

module.exports = router
