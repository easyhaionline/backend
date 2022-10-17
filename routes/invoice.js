const router = require('express').Router()
const {createInvoice, getInvoice} = require('../controllers/invoice')
const { create } = require('../models/invoice')

router.route('/:id').post(createInvoice).post(getInvoice)

module.exports = router;