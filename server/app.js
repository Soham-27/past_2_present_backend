import express from "express";
import dotenv from 'dotenv';
dotenv.config({path:"../config/.env"});
import { db } from "./models/db.js";
import cors from 'cors';
import { userrouter } from "./routes/user_routes.js";
import bodyParser from "body-parser";
import { isUserAuthenticated } from "./middleware/user_middleware.js";
import { itemrouter } from "./routes/items_routes.js";
import { profilerouter } from "./routes/profile_routes.js";
import cron from "node-cron"; 
import { yourCronJobFunction } from "./cronjob/cron_job_file.js";
cron.schedule('30 */1 * * *', () => {
    // This runs your cron job function every hour starting from 10:30 PM IST
    yourCronJobFunction();
    });
 


 
const app=express();
const port=process.env.PORT; 
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse U  
app.use(cors());

app.use("/profile",profilerouter)
app.use("/user",userrouter);
app.use("/items",itemrouter); 
app.get("/",async(req,res)=>{
    res.json("hello from");
    console.log("yo") 
    console.log(isUserAuthenticated);
})
app.listen(port,()=>{ 
    console.log(`server is running on ${port}`);
});