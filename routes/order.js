const router = require('express').Router();
const { placeOrder, getOrders, getOrderDetails, getOrderDetailById } = require('../controllers/order');

router.post('/', placeOrder);
router.get('/orders', getOrders)
router.route('/orderDetails/:id').get(getOrderDetails)
router.route('/orderDetails/getOrderDetailsById/:id').get(getOrderDetailById)

module.exports = router