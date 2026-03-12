import express from "express"
import authRoutes from "./routes/authRoutes.js"
import habitsRoutes from "./routes/habitsRoutes.js"
import { connectDB } from "./config/connectDB.js"
import dotenv from "dotenv"

dotenv.config();

const app = express() 
const PORT = process.env.PORT || 5001

connectDB();

app.use("/api/auth", authRoutes)
app.use("/api/habits", habitsRoutes)

app.listen(PORT, () => {
  console.log("App listening on 3001", PORT)
})

export default app