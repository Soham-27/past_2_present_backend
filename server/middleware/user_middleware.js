import jwt from 'jsonwebtoken';
import { db } from "./../models/db.js";  

export const isUserAuthenticated = async (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");
        const token = authHeader ? authHeader.replace("Bearer ", "") : null;
        
        if (!token) {
            return res.status(401).json({ error: "Missing token" });
        }
        
        const query = "SELECT * FROM user_token WHERE token = $1";
        const params = [token];
        const data = await db.query(query, params);
        
        if (data.rows.length === 0) {
            return res.status(401).json({ error: "Unauthorized User!" });
        }
        
        const userId = data.rows[0].fk_user;
        const userQuery = "SELECT user_id, user_name, reg_no, department, current_year, email, phone_no FROM users WHERE user_id = $1";
        const userParams = [userId];
        const userResult = await db.query(userQuery, userParams);
        
        if (userResult.rows.length === 0) {
            return res.status(401).json({ error: "Invalid User!" });
        }
        
        req.user = userResult.rows[0];
        console.log(req.user);
        console.log(req.user.fk_user);
        req.token = token;
        next();
    } catch (error) {
        console.error("Error in authentication middleware:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const generateUserToken = async (user_id) => {
    try {
        const timeStamp = new Date();
        const key = process.env.TOKEN_SECRET || 'default_secret_key';
        const token = jwt.sign({ id: user_id }, key, { expiresIn: '24h' });
        
        const tokenRecordQuery = "INSERT INTO user_token (fk_user, token, created_at, updated_at) VALUES ($1, $2, $3, $4)";
        const tokenParams = [user_id, token, timeStamp, timeStamp];
        await db.query(tokenRecordQuery, tokenParams);
        console.log(token);
        return token;
    } catch (err) {
        console.error("Error in token generation:", err);
        throw err;
    }
};
