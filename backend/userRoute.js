import express from "express"
import { handleUserLogin,handleUserRegister } from "./userController.js"


const userRouter = express.Router()

userRouter.post("/signup", handleUserRegister)
userRouter.post("/signin", handleUserLogin)

export default userRouter