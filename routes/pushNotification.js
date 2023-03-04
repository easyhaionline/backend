const {Router} = require("express");
const { pushNotification } = require("../controllers/pushNotification");
const router = Router();

router.post("/notification", pushNotification);

module.exports = router;
