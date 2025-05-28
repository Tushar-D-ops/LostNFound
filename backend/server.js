import express from "express";

import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from 'dotenv'
dotenv.config()
import mongoose from "mongoose";
import Item from "./models/item.js";
// const { UserModel } = require("./models/userModel.js");
import userRouter from "./userRoute.js";
import itemRouter from "./itemRoute.js";
import connectCloudinary from "./cloudnary.js";


const uri = process.env.MONGO_CONN;

mongoose.connect(uri)
  .then(() => console.log("Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));

const app = express();
app.use(cors());
app.use(express.json()); 

connectCloudinary()

// app.use("/files", express.static("files"));


app.use("/api/user", userRouter)
app.use('/api/item',itemRouter)

// app.get("/item", async (req, res) => {
//     try {
//       const items = await Item.find({});
//       return res.status(200).json({
//         count: items.length,
//         data: items,
//       });
//     } catch (error) {
//       res.status(500).send({ message: error.message });
//     }
// });

// app.get("/item/:id", async (req, res) => {
//     try {
//       const item = await Item.findById(req.params.id);
//       if (!item) {
//         return res.status(404).send({ message: "Item not found" });
//       }
//       return res.status(200).json(item);
//     } catch (error) {
//       res.status(500).send({ message: error.message });
//     }
// });

// app.post("/item", upload.single("file"), async (req, res) => {
//     try {
//       const { name, email, phoneno, title, description, image } = req.body;
  
//       if (!name || !email || !phoneno || !title || !description) {
//         return res.status(400).send({ message: "All fields are required" });
//       }
  
//       const newItem = {
//         userId: req.body.userId,
//         name: req.body.name,
//         email: req.body.email,
//         phoneno: req.body.phoneno,
//         title: req.body.title,
//         description: req.body.description,
//         image: req.file.filename,
//       };
//      const item=await Item.create(newItem);
  
//       return res.status(201).json(newItem);
//     } catch (error) {
//       console.log(error);
//       res.status(500).send({ message: "Error creating item" });
//     }
// });

// app.delete("/item/:id", async (req, res) => {
//     try {
//       const deletedItem = await Item.findByIdAndDelete(req.params.id);
//       if (!deletedItem) {
//         return res.status(404).send({ message: "Item not found" });
//       }
//       return res.status(200).send({ message: "Item deleted successfully" });
//     } catch (error) {
//       console.log(error);
//       res.status(500).send({ message: error.message });
//     }
// });



app.post("/api/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", // or "Outlook", "Yahoo"
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL, // your email to receive messages
      subject: `Contact Form: ${subject}`,
      html: `
        <h3>New Contact Request</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/> ${message}</p>
      `
    });

    res.status(200).json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Email sending error:", error);
    res.status(500).json({ success: false, message: "Failed to send email." });
  }
});

app.use((err, req, res, next) => {
  return res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Server Error",
  });
});



const PORT = process.env.PORT || 8080;
app.listen(8080, () => {
    console.log(`Server is running on http://localhost:8080`);
});
