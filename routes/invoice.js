const router = require('express').Router()
const {createInvoice, getInvoice, getOrderDetails } = require('../controllers/invoice')

router.route('/:id').post(createInvoice).get(getOrderDetails)
router.route('/getInvoice/:id').get(getInvoice)

module.exports = router;