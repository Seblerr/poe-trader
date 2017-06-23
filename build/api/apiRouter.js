var express = require('express')
var router = express.Router()
var axios = require('axios')
const api = axios.create({timeout: 5000})
// var rp = require('request-promise')

router.post('/fetchStash', async (req, res, next) => {
  api.get('http://api.pathofexile.com/public-stash-tabs')
  .then(function (response) {
    console.log(response.data)
    // console.log('hej')
    res.send(response.data)
  })
  .catch(function (error) {
    console.log(error)
  })
})

router.post('/fetchNextStash/:id', async (req, res, next) => {
  api.get('http://www.pathofexile.com/api/public-stash-tabs' + '?id=' + req.params.id)
  .then(function (response) {
    res.send(response.data)
  })
  .catch(function (error) {
    console.log(error)
  })
})

router.post('/getNextID', async (req, res, next) => {
  api.get('http://api.poe.ninja/api/Data/GetStats')
  .then(function (response) {
    res.send(response.data.nextChangeId)
  })
  .catch(function (error) {
    console.log(error)
  })
})

module.exports = router
