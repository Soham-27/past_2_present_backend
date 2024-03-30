import express from "express";
import dotenv from 'dotenv';
dotenv.config({path:"../config/.env"});
import { db } from "./models/db.js";
import { userrouter } from "./routes/user_routes.js";
import bodyParser from "body-parser";





const app=express();
const port=process.env.PORT_2; 
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse U  


 
app.use("/user",userrouter);

app.get("/",async(req,res)=>{
    const result=await db.query("select * from items");
    console.log(result.rows);
    res.json(result.rows);
    console.log("yo")
})
app.listen(port,()=>{
    console.log(`server is running on ${port}`);
}); 