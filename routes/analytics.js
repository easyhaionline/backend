const route = require('express').Router();


const { getAnalyticalData, getResults } = require('../controllers/scoreCard')

route.post('/get-analytics', getAnalyticalData)
route.post('/get-results-data' , getResults)

module.exports = route