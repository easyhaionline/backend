const router = require('express').Router();
const { placeOrder, getOrders, getOrderDetails, getOrderDetailById, createOrderDetails } = require('../controllers/order');

router.post('/', placeOrder);
router.get('/orders', getOrders)
router.route('/orderDetails/:id').get(getOrderDetails)
router.route('/orderDetails/getOrderDetailsById/:id').get(getOrderDetailById)
router.route('/createOrder/:id').post(createOrderDetails)

module.exports = router