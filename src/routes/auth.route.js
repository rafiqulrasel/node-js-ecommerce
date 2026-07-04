import express from "express";
import { register, login, me } from "../modules/auth/auth.controller.js";
import {
    registerValidator,
    loginValidator,
} from "../validators/auth.validator.js";
import { validate } from "../middlewares/validate.middleware.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerValidator, validate, register);
router.post("/login", loginValidator, validate, login);
router.get("/me", authenticate, me);

export default router;