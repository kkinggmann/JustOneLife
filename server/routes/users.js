const express = require("express");
const route = express.Router();

const usersController = require("../app/controllers/UserController");
const {secondStepCheck} = require("../middleware/auth");

route.put("/update", usersController.update);
route.get("/:publicAddress", secondStepCheck, usersController.show);

module.exports = route;