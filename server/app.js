import express from "express";
import dotenv from 'dotenv';
dotenv.config({path:"../config/.env"});
import { db } from "./models/db.js";
import { userrouter } from "./routes/user_routes.js";
import bodyParser from "body-parser";

 



const app=express();
const port=3000||process.env.PORT; 
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse U  


 
app.use("/user",userrouter);

app.get("/",async(req,res)=>{
    res.json("hello from");
    console.log("yo")
})
app.listen(port,()=>{
    console.log(`server is running on ${port}`);
});  