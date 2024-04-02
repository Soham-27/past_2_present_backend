import { Router } from "express";
import { GetAllItems, GetItemWithId, GetItemsWithCategory } from "../../server/controllers/items_controller.js";

const itemrouter=Router();

itemrouter.get("/",GetAllItems);
itemrouter.get("/:name",GetItemsWithCategory);
itemrouter.get("/:id",GetItemWithId);

export{itemrouter};