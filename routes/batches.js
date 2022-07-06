const express = require('express');
const { create, list, update, read,getsubjects, updateSubjects, createSubjects,removesubjects } = require('../controllers/batches');

const { runValidation } = require('../validators');
const router = express.Router();

router.post('/batchcreate', runValidation, create)
router.get('/batches', runValidation, list)
router.put('/updatebatches/:id', runValidation, update)
router.get('/singlebatch/:id', runValidation, read)


router.post('/createsubject/:id', runValidation, createSubjects);
router.get('/subjects', runValidation, getsubjects);
router.put('/subjectupdate/:id', updateSubjects);
router.delete('/deletesubject/:id', runValidation, removesubjects)

module.exports = router