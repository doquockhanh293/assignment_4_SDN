const express = require("express");
const router = express.Router();
const AuthController = require("../controller/Auth.controller");
const userController = require("../controller/userController");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/register", AuthController.register.bind(AuthController));
router.post("/login", AuthController.login.bind(AuthController));
router.get(
  "/me",
  authMiddleware,
  userController.getProfile.bind(userController)
);
router.put(
  "/me",
  authMiddleware,
  userController.updateProfile.bind(userController)
);

module.exports = router;
