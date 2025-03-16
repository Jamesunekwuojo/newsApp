import express from express;
import dotenv from  "dotenv";
import newsRoutes from  "./routes/newsRoutes"


const app = express()

app.use(cors())
app.use(express.json());


// API
app.use("/api", newsRoutes)
app.use("/api", )


app.listen(process.env.PORT, () => {
    console.log('Server is running on port 5000 ')
})