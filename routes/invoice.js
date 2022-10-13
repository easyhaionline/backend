const router = require('express').Router()
const {createInvoice} = require('../controllers/invoice')
const { create } = require('../models/invoice')

router.post('/:id', createInvoice )

module.exports = router;