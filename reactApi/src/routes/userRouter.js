const router = require("express").Router();
const { createOperation } = require("../controllers/userController");

const checkToken = require("../middlewares/checkToken");

router.post("/createOperation", checkToken, createOperation);

module.exports = router;