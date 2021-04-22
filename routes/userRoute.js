const router = require("express").Router();

const { login, register, verifiedToken } = require("../controllers/userCtrls");
const authorization = require("../middleware/authentication");

// Register User
router.post("/register", register);
router.post("/login", login);

router.get("/verify", verifiedToken);

module.exports = router;
