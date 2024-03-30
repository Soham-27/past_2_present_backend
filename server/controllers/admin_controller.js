// import { Request,Response, } from "express"; 
// import { client } from "../models/db.js";

// export const SignUp=async(req,res)=>{
//     const name=req.body.name;
//     const reg_no=req.body.reg_no;
//     const department=req.body.dept;
//     const current_year=req.body.current_year;
//     const email=req.body.email;
//     const phone_no=req.body.phone_no;
//     const user_password=req.body.user_password
//     try {
//         if(name && reg_no && department &&current_year &&email && phone_no && user_password){
//             const query="insert into users (user_name,reg_no,department,current_year,email,phone_no,user_password,created_at) values($1,$2,$3,$4,$5,$6,$7,$8);";
//             const params=[name,reg_no,department,current_year,email,phone_no,user_password,Date.now()];
//             await client.query(query,params);
//             res.status(400).json({ message: "registerd successfully" });
//         }
//         else{
//             res.status(400).json({ error: "fill all the fields" });
//         }
//     } catch (error) {
//         res.status(500).json({ error: "An error occurred." });
//     }
// }