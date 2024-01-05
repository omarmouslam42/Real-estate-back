import { Router } from "express"
import auth from "../../middleware/auth.js"
import { create, resiveEmail, deleteUserListing, getListing, getListingById, getUserListing, searchListing, updateListing } from "./controller/listing.js"
import * as val from "./listing.validation.js"
import { validation } from "../../middleware/validation.js"

const router = Router()

router.get("/get", searchListing)
router.get("/userListing", auth(), getUserListing)
router.get("/getListing/:id", auth(), getListing)
router.get("/getById/:id", getListingById)
router.post("/create", validation(val.createListingVal), auth(), create)
router.delete("/deleteListing/:id", auth(), deleteUserListing)
router.put("/updateListing/:id", validation(val.UpdateListingVal), auth(), updateListing)
router.post("/sendEmail", validation(val.messageVal), auth(), resiveEmail)
router.get("/lol", (req, res, next) => { res.json({ message: "lol" }) })
export default router