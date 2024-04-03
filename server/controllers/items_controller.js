import { isUserAuthenticated } from "../middleware/user_middleware.js";
import {db} from "../models/db.js";
    // 
    const AddItem = async (req, res) => {
        try {
            // Call isUserAuthenticated middleware to ensure the user is authenticated
            //await isUserAuthenticated(req, res, async () => {
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
           // });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "An error occurred during adding item" });
        }
    };
    const DeleteItem=async(req,res)=>{
        try {
            
        } catch (error) {
            
        }
    };
    const GetAllItems=async(req,res)=>{
        try {
            const query="SELECT * FROM items";
            const result=await db.query(query);
            res.status(200).json(result.rows);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "An error occured during getting all items" });
        }
    }
    const GetItemsWithCategory = async (req, res) => {
        try {
            const name = req.params.name;
            if (!name) {
                const query = "SELECT * FROM items";
                const result = await db.query(query);
                res.status(200).json(result.rows);
            } else {
                const query = "SELECT * FROM items WHERE item_name LIKE $1;";
                const item_name_pattern = '%' + name + '%';
                const params_1 = [item_name_pattern];
                const result = await db.query(query, params_1);
                console.log(result.rows);
                res.status(200).json(result.rows);
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "An error occured during getting items" })
        }
    }
    const MyUploadedItems=async(req,res)=>{
        try {
            const user_id=req.user.user_id;
            const query="SELECT * from items where fk_user_id=$1";
            const params=[user_id];
            const result=await db.query(query,params);
            res.json(result.rows);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "An error occured during getting  items" })
        }
    }
    const GetItemWithId=async(req,res)=>{
        try {
            const item_id=req.params.item_id;
            console.log(item_id);
            const query_1 =`SELECT 
            i.item_name,
            i.price,
            i.years_used,
            i.item_message,
            u.user_name,
            u.phone_no
        FROM 
            items i
        JOIN 
            users u ON i.fk_user_id = u.user_id
        WHERE 
            i.item_id = $1;
        `;
            const params_1 = [item_id];
            const result_1 = await db.query(query_1,params_1);
            if(result_1.rows.length==0){
                return res.status(404).json({ error: "Item not found" });
            }
            console.log(result_1.rows);
            res.status(200).json(result_1.rows);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "error while getting info about item" });
        }
    }
export{AddItem,DeleteItem,GetAllItems,GetItemsWithCategory,MyUploadedItems,GetItemWithId};










