import { Router } from "express";
import { isUserAuthenticated } from "../../server/middleware/user_middleware.js";
import { GetMyProfile } from "../../server/controllers/profile_controllers.js";
const profilerouter=Router();
profilerouter.get("/myprofile",isUserAuthenticated,GetMyProfile);
export{profilerouter}