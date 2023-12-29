import { Router } from "express";
import { google, signin, signup } from "./controller/auth.js";
import { validation } from "../../middleware/validation.js";
import * as val from "./auth.validation.js";

const router = Router()

router.post("/sign-up", validation(val.signUpVal), signup)
router.post("/sign-in", validation(val.signInVal), signin)
router.post("/google", google)

export default router