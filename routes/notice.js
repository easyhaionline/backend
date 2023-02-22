const express = require("express");
const { createNotes, getAllNotes, deleteNotice } = require("../controllers/notice");
const router= express.Router();

router.post("/createnotice", createNotes);
router.get("/getallnotice", getAllNotes);
router.delete("/deletenotice/:id", deleteNotice)

module.exports = router;
