import { Router } from "express";
import { SignUp,UserLogin} from "../controllers/user_controllers.js";
const userrouter=Router();
userrouter.post("/signup",SignUp);
// userrouter.post("/register",register);
userrouter.post("/login",UserLogin);
export{userrouter};