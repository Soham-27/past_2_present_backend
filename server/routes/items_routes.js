import { Router } from "express";
import { GetAllItems, GetItemWithId, GetItemsWithCategory } from "../../server/controllers/items_controller.js";
import { ReportItem } from "../controllers/user_controllers.js";
import { isUserAuthenticated } from "../middleware/user_middleware.js";
const itemrouter=Router();

itemrouter.get("/",GetAllItems);
itemrouter.get("/:name",GetItemsWithCategory);
itemrouter.get("/id/:item_id",GetItemWithId);
itemrouter.post("/report/:item_id",isUserAuthenticated, ReportItem);

export{itemrouter};