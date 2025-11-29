import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./Config/db.js";
import userRoutes from "./routes/userRoutes.js";
import ownerRouter from "./routes/ownerRoutes.js";


// Initialize Express App
const app = express()
const PORT = process.env.PORT || 3000;

//Connect Database
await connectDB()

//Middleware
app.use(cors());
app.use(express.json())

app.get('/', (req, res)=> res.send("Server is running"))
app.use('/api/user', userRoutes)
app.use('/api/owner', ownerRouter)

const start = async () => {
  try {
    await connectDB()
    console.log('Database connected')
    app.listen(PORT, () => console.log(`Server up and running on port ${PORT}`))
  } catch (err) {
    console.error('DB connection failed:', err.message)
    process.exit(1)
  }
}

app.listen(PORT, ()=> console.log(`Server runing on port ${PORT}`))