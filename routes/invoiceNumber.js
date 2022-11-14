const router = require('express').Router()
const {getInvoiceNumber, updateInvoiceNumber, createInvoiceNumber} = require('../controllers/invoiceNumber')

router.route('/').post(createInvoiceNumber).get(getInvoiceNumber)
router.route('/:id').get(getInvoiceNumber).put(updateInvoiceNumber)

module.exports = router