var express = require('express')
var router = express.Router()
const { getAllNearlyGoodMessages } = require('../goodmessage')
const { getAllnews } = require('../news')
const { getData } = require('../about')
const { getBannerData } = require('../banner')

/* GET home page. */
router.get('/', async function (req, res, next) {
  const list = await getAllNearlyGoodMessages()

  const news = await getAllnews()
  const about = await getData()
  const banner = await getBannerData()
  res.render('index', { list, news, about, banner })
})

module.exports = router
