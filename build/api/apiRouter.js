var express = require('express')
var router = express.Router()
var axios = require('axios')
const api = axios.create()
// const requis = require('requisition')
// var rp = require('request-promise')

// router.post('/fetchStash', async (req, res, next) => {
//   await requis('http://www.pathofexile.com/api/public-stash-tabs')
//   // const body = await response.json()
//   .then(function (response) {
//     console.log(response)
//     // console.log(body)
//     // console.log('hej')
//     res.send(response.data)
//   })
//   .catch(function (error) {
//     console.log(error)
//   })
// })

router.post('/getStashes/:id', async (req, res, next) => {
  api.get('http://www.pathofexile.com/api/public-stash-tabs' + '?id=' + req.params.id)
  .then(function (response) {
    // console.log(response.data)
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
