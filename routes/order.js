const express = require('express');
const { placeOrder, 
    getOrders
} = require('../controllers/order');

const router = express.Router();

router.post('/', placeOrder);
router.get('/orders', getOrders)

module.exports = router