import { Router } from "express";
import { SignUp,UserLogin,logout} from "../controllers/user_controllers.js";
import { AddItem, DeleteItem, MyUploadedItems } from "../controllers/items_controller.js";
import { isUserAuthenticated } from "../middleware/user_middleware.js";
const userrouter=Router();
userrouter.post("/signup",SignUp);
userrouter.post("/login",UserLogin);
userrouter.post("/additem",isUserAuthenticated,AddItem);
userrouter.delete("/deleteitem/:itemId",isUserAuthenticated,DeleteItem);
userrouter.delete("/logout",logout);
userrouter.get("/myitems",isUserAuthenticated,MyUploadedItems);
userrouter.get("/")
export{userrouter};    