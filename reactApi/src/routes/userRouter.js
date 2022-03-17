const router = require("express").Router();
const { createOperation, deleteOperation } = require("../controllers/userController");

const checkToken = require("../middlewares/checkToken");

router.post("/createOperation", checkToken, createOperation);
router.post('/deleteOperation', checkToken, deleteOperation);

module.exports = router;