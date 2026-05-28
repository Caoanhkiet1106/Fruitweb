const express = require('express');
const router = express.Router();

const Usercontroller = require("../controllers/User.controller")
const middlewareController = require("../middlewares/middleware")


router.get("/",middlewareController.verifyToken,Usercontroller.getAllUsers)
router.delete("/:id",middlewareController.verifyUserOrAdmin,Usercontroller.DeleteUser)

module.exports = router;