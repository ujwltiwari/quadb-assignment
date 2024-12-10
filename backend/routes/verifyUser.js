const express = require('express')
const router = express.Router()
const authenticate = require('../lib/authenticate')

router.post('/', authenticate, async (req, res) => {
  try {
    return res.json({ message: 'success', user: req.user })
  } catch (err) {
    return res.json({ message: 'failed', error: err })
  }
})

module.exports = router
