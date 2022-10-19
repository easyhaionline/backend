const router = require('express').Router()
const {createInvoice, getInvoice, getOrderDetails } = require('../controllers/invoice')

router.route('/:id').post(createInvoice).get(getOrderDetails)

module.exports = router;