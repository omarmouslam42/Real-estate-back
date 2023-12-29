import { Router } from "express";
import auth from "../../middleware/auth.js";
import { deleteUser, updateUser } from "./controller/user.js";
import { validation } from "../../middleware/validation.js";
import * as val from "./user.validation.js";

const router=Router();

router.put("/updateUser/:id",validation(val.updateUserVal), auth(), updateUser)
router.delete("/deleteUser/:id",validation(val.deleteUserVal), auth(), deleteUser)


export default router