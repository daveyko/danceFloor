const router = require('express').Router()
const fs = require('fs')
const Promise = require('bluebird')
const readDir = Promise.promisify(fs.readdir)
const path = require('path')
module.exports = router


router.get('/:songName', (req, res, next) => {
  res.send(path.join(__dirname, '..', '..', 'public', 'songs', req.params.songName))
})

router.get('/', (req, res, next) => {
  return readDir(path.join(__dirname, '..', '..', 'public', 'songs'))
    .then(songs => {
      res.json(songs)
    })
    .catch(next)
})
