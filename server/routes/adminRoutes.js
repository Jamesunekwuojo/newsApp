import express from "express";
import { createAdmin, loginAdmin } from "../controller/adminController.js";


const router = express.Router();


router.post('/signup', createAdmin)

router.post('/login', loginAdmin )