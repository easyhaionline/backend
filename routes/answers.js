const route = require('express').Router();

const { createAnswers, updateAnswers } = require('../controllers/answers');


route.post('/add', createAnswers)

route.put('/update-response', updateAnswers)

module.exports = route