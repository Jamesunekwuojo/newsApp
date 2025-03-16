import express from "express";
import dotenv from  "dotenv";
import newsRoutes from  "./routes/newsRoutes.js";
import "./db.js";
import cookieParser from "cookie-parser";
import cors from "cors"

dotenv.config()


const app = express()

// middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}))

// API
app.use("/api", newsRoutes)



app.listen(process.env.PORT, () => {
    console.log('Server is running on port 5000 ')
})