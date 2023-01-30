const express = require("express");
const { createSubjectName, getNotes, getAllNotes } = require("../controllers/quicknotes");
const router= express.Router();

router.post('/create-quicknotes', createSubjectName);
router.get('/get-quicknotes/:date', getNotes);

module.exports= router