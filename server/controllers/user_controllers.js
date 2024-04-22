import { db } from "../models/db.js";
import bcrypt from "bcrypt";
import { generateUserToken } from "../middleware/user_middleware.js";

const saltrounds = 10;

// export const SignUp = async (req, res) => {
//     const { name, reg_no, department, current_year, email, phone_no, user_password } = req.body;

//     try {
//         if (!name || !reg_no || !department || !current_year || !email || !phone_no || !user_password) {
//             return res.status(400).json({ error: "Fill all the required fields" });
//         }

//         bcrypt.hash(user_password, saltrounds, async (err, hash) => {
//             if (err) {
//                 return res.status(500).json({ error: "Error in hashing password" });
//             }
//             const query = "INSERT INTO users(user_name, reg_no, department, current_year, email, phone_no, user_password, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING user_id;";
//             const params = [name, reg_no, department, current_year, email, phone_no, hash, new Date()];
//             const result=await db.query(query, params);
//             const userid=result.rows[0].user_id;
//             const token=generateUserToken(userid);
//             return res.status(200).json({ message: "Registered successfully",token:token });
//         });
//     } catch (error) { 
//         console.error("Error in sign up:", error);
//         res.status(500).json({ error: "An error occurred during sign up" });
//     }
// };
// Make sure bcrypt is imported

export const SignUp = async (req, res) => {
    const { name, reg_no, department, current_year, email, phone_no, user_password } = req.body;

    try {
        if (!name || !reg_no || !department || !current_year || !email || !phone_no || !user_password) {
            return res.status(400).json({ error: "Fill all the required fields" });
        }

        bcrypt.hash(user_password, saltrounds, async (err, hash) => {
            if (err) {
                return res.status(500).json({ error: "Error in hashing password" });
            }
            try {
                const query = "INSERT INTO users(user_name, reg_no, department, current_year, email, phone_no, user_password, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING user_id;";
                const params = [name, reg_no, department, current_year, email, phone_no, hash, new Date()];
                const result = await db.query(query, params);
                const userid = result.rows[0].user_id;
                const token = await generateUserToken(userid);
                return res.status(200).json({ message: "Registered successfully", token: token });
            } catch (error) {
                console.error("Error in database operation:", error);
                return res.status(500).json({ error: "An error occurred during sign up" });
            }
        });
    } catch (error) {
        console.error("Error in sign up:", error);
        res.status(500).json({ error: "An error occurred during sign up" });
    }
};


// export const UserLogin = async (req, res) => {
//     const { email, user_password } = req.body;

//     try {
//         const query = "SELECT * FROM users WHERE email = $1";
//         const params = [email];
//         const result = await db.query(query, params);

//         if (result.rows.length === 0) {
//             return res.status(404).json({ error: "User not found" });
//         }

//         const user = result.rows[0];
//         const hashedPassword = user.user_password;

//         bcrypt.compare(user_password, hashedPassword, (err, result) => {
//             if (err) {
//                 return res.status(500).json({ error: "Error in bcrypt" });
//             }

//             if (result) {
//                 const token = generateUserToken(user.user_id);
//                 delete user.user_password;
//                 return res.status(200).json({ token: token, user: user,message:"logined successfully!!" });
//             } else {
//                 return res.status(400).json({ error: "Incorrect password" });
//             }
//         });
//     } catch (error) {
//         console.error("Error in user login:", error);
    
//         res.status(500).json({ error: "An error occurred during user login" });
//     }
// };
export const UserLogin = async (req, res) => {
    const { email, user_password } = req.body;

    try {
        const query = "SELECT * FROM users WHERE email = $1";
        const params = [email];
        const result = await db.query(query, params);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        const user = result.rows[0];
        const hashedPassword = user.user_password;

        bcrypt.compare(user_password, hashedPassword, async (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Error in bcrypt" });
            }

            if (result) {
                try {
                    const token = await generateUserToken(user.user_id); // Ensure to await token generation
                    delete user.user_password;
                    return res.status(200).json({ token: token, user: user, message: "Logged in successfully" }); // Include the token in the response
                } catch (tokenError) {
                    console.error("Error in token generation:", tokenError);
                    return res.status(500).json({ error: "An error occurred during token generation" });
                }
            } else {
                return res.status(400).json({ error: "Incorrect password" });
            }
        });
    } catch (error) {
        console.error("Error in user login:", error);
        res.status(500).json({ error: "An error occurred during user login" });
    }
};


export const logout = async (req, res) => {
    try {
        // Extract the token from the request header
        const token = req.header("Authorization").replace("Bearer ", "");

        // Delete the token from the database
        const deleteQuery = "DELETE FROM user_token WHERE token = $1";
        const params = [token];
        await db.query(deleteQuery, params);

        // Respond with a success message
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Error in logout:", error);
        res.status(500).json({ error: "An error occurred during logout" });
    }
};
export const ReportItem=async(req,res)=>{
    try {
        const item_id=req.params.item_id;
        const reason=req.body;
        if(item_id && reason){
            const query="INSERT INTO reports (reason,fk_item_id,sent_at) values($1,$2,$3)";
            const params=[reason,item_id,new Date()];
            await db.query(query,params);
            return res.status(200).json({message:"reported successfully"});
        }
        else{
            return res.status(400).json({message:"error in reporting"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"internal error"});
    }
}
