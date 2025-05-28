import express from "express"
import { postItem,getAll,getOne,deleteItem,getUserItems } from "./itemController.js"
import upload from "./multer.js"
import { authenticateUserToken } from "./utilities.js"

const itemRouter=express.Router()


itemRouter.post("/post",authenticateUserToken,upload.single("file"),postItem)
itemRouter.get("/getAll",getAll)
itemRouter.get("/getOne/:id",getOne)
itemRouter.delete("/delete/:id",authenticateUserToken,deleteItem)
itemRouter.get("/my-items", authenticateUserToken, getUserItems);

export default itemRouter