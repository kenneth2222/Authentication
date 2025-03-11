const userRouter = require("express").Router();
const {register, verifyUser, resendVerificationLink, getAllUsers, login, makeAdmin, superAdminAuth } = require("../controller/userController");
const { authenticate } = require("../middleware/authentication");
const { registerValidation } = require("../middleware/validator");

userRouter.post("/register", registerValidation, register);
userRouter.get("/verify-user/:token", verifyUser);
userRouter.get("/resend-verification", resendVerificationLink);
// userRouter.get("/users", authenticate, getAllUsers);
userRouter.get("/users", getAllUsers);
userRouter.post("/login", login);
userRouter.patch('/users/:id', authenticate, superAdminAuth, makeAdmin);

module.exports = userRouter;