import { isUserAuthenticated } from "../middleware/user_middleware.js";
import {db} from "../models/db.js";
    // 
    const AddItem = async (req, res) => {
        try {
            // Call isUserAuthenticated middleware to ensure the user is authenticated
            await isUserAuthenticated(req, res, async () => {
                // If user is authenticated, extract user_id from req.user
                const user_id = req.user.user_id;
                const item_name = req.body.item_name;
                const price = req.body.price;
                const years_used = req.body.years_used;
                const item_message = req.body.discription;
    
                console.log(user_id, item_name, price, years_used, item_message);
    
                if (item_name && years_used && item_message && user_id) {
                    const query = "INSERT INTO items (item_name, price, years_used, item_message, fk_user_id, uploaded_at) VALUES ($1, $2, $3, $4, $5, $6)";
                    const params = [item_name, price, years_used, item_message, user_id, new Date()];
                    await db.query(query, params);
                    res.status(200).json({ message: "Item added successfully" });
                } else {
                    return res.status(400).json({ error: "Fill all the required fields" });
                }
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "An error occurred during adding item" });
        }
    };
     
export{AddItem};










