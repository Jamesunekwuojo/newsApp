import express from express;
import dotenv from  "dotenv";


const app = express()

app.use(cors())
app.use(express.json());



app.listen(process.env.PORT, () => {
    console.log('Server is running on port 5000 ')
})