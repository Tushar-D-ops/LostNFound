import ItemModel from "./models/item.js"
import {v2 as cloudinary} from 'cloudinary';
// import UserModel from "../models/userModel.js"


export const postItem = async (req, res) => {
     try {
           const {name, email, phoneno, title, description } = req.body;
        const userId=req.userId
           if (!userId || !name || !email || !phoneno || !title || !description) {
             return res.status(400).send({ message: "All fields are required" });
           }
       
           let imageUrl = "https://static.thenounproject.com/png/1077596-200.png";
    if(req.file){
        console.log("Uploaded File:", req.file);
        imageUrl=await cloudinary.uploader.upload(req.file.path, {resource_type:"image"}).then(res=>res.secure_url)
    }
           const newItem =new ItemModel( {
             userId,
             name,
             email,
             phoneno,
             title,
             description,
             image:imageUrl,
           });
          await(newItem.save())
       
           return res.status(201).json(newItem);
         } catch (error) {
           console.log(error);
           res.status(500).send({ message: "Error creating item" });
         }
}

export const getAll = async (req, res) => {
    
    try {
      const items = await ItemModel.find({});
      return res.status(200).json({
        count: items.length,
        data: items,
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }

    
}

export const getOne = async (req, res) => {
    try {
      const item = await ItemModel.findById(req.params.id);
      if (!item) {
        return res.status(404).send({ message: "Item not found" });
      }
      return res.status(200).json(item);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
}

export const deleteItem = async (req, res) => {
     try {
        const userId=req.userId
        const item = await ItemModel.findById(req.params.id);
      if (!item) {
        return res.status(404).send({success:false, message: "Item not found" });
      }
      if (item.userId !== userId) {
        return res.status(403).send({success:false, message: "Unauthorized" });
      }
      const deletedItem = await ItemModel.findByIdAndDelete(req.params.id);
      if (!deletedItem) {
        return res.status(404).send({success:false, message: "Item not found" });
      }
      return res.status(200).send({success:true, message: "Item deleted successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error.message });
    }
}

export const getUserItems = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(400).json({ message: "User ID missing" });
    }

    const items = await ItemModel.find({ userId }).sort({ createdAt: -1 });

    return res.status(200).json(items);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching user items" });
  }
};
