const router = require("express").Router();

const user = require("./users");
const auth = require("./auth")

router.use("/users", user);
router.use("/users/{id}",user);
router.use("/signin",auth);

module.exports = router;
