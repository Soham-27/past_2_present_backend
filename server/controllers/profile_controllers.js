import {db} from "../models/db.js";
const GetMyProfile=async(req,res)=>{
    const user_id=req.user.user_id;
    try {
        const query="SELECT * FROM users WHERE user_id=$1";
        const params=[user_id];
        const result=await db.query(query,params);
        res.json(result.rows);
    } catch(error){
        console.log(error);
        res.status(500).json({ error: "An error occured during getting information" })
    }
}
export{GetMyProfile}
