//import { Request,Response } from "express";
import {db} from "../models/db.js"; 
import bcrypt from "bcrypt";
const saltrounds=10;

//import bodyParser from "body-parser";
const SignUp=async(req,res)=>{
        const name=req.body.name;
        const reg_no=req.body.reg_no;
        const department=req.body.dept;
        const current_year=req.body.current_year;
        const email=req.body.email;
        const phone_no=req.body.phone_no;
        const user_password=req.body.user_password;
        console.log(name,reg_no,department,current_year,email,phone_no,user_password);
        try {
            if(name && reg_no && department &&current_year &&email && phone_no && user_password){
                bcrypt.hash(user_password,saltrounds,async(err,hash)=>{
                    if(err){
                        res.json("error in hashing")
                    }
                    else{
                        console.log(hash);
                        const query="INSERT INTO users(user_name,reg_no,department,current_year,email,phone_no,user_password,created_at) VALUES($1,$2,$3,$4,$5,$6,$7,$8);";
                        const params=[name,reg_no,department,current_year,email,phone_no,hash,new Date()];
                        await db.query(query,params);
                        res.status(400).json({ message: "registerd successfully" });
                    }
                })
                
            }
            else{
                console.log("fill all the fields")
                res.status(400).json({ error: "fill all the fields" });
            }
        } catch (error) {
            console.log("error!!   !in sign up")
            res.status(500).json({ error: "An error occurred." });
        }
}
const UserLogin=async(req,res)=>{
    const email=req.body.email;
    const password=req.body.user_password;
    try {
        const query="SELECT * FROM users WHERE email=$1;"
        const params=[email];
        const result=await db.query(query,params);
        if(result.rows.length>0){
            const user=result.rows[0];
            console.log(user);
            const user_password=user.user_password;
            console.log(user_password);
            bcrypt.compare(password,user_password,(err,result)=>{
                if(err){
                    res.json("error in bcrypt");
                }
                else{
                    if(result){
                        res.status(400).json({ message: "login successfully !" });
                    }
                    else{
                        res.status(400).json({ message: "login failed !" });
                    }
                }
            })
        }
        else{
            res.json("user not found ");
        }
    } catch (error) {
        res.json("error in")
    }
}
// const register = async (req, res) => {
//     // const name = req.body.name;
//     // const reg_no = req.body.reg_no;
//     // const email = req.body.email;
//     // const phone_no = req.body.phone_no;
//     // const user_password = req.body.user_password;
//     // console.log(name,reg_no,email,phone_no,user_password);
//     // try {
//     //     const query="INSERT INTO users_tables (user_name,email,phone_no,user_password,created_at) VALUES($1,$2,$3,$4,$5);"
//     //     const params=[name,reg_no,email,phone_no,user_password,Date.now()];
//     //     await db.query(query,params);
//     //     res.json("added successfully")
//     // } catch (error) {
//     //     res.json(error);
//     // }
//     const name=req.body.name;
//     const query="INSERT INTO items (name) VALUES($1);"
//     const params=[name]
//     await db.query(query,params);
//     res.json("done");
    
// }
export{SignUp,UserLogin};