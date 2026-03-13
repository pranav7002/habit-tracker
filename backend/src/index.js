import express from "express"
import cors from "cors"
import habitsRoutes from "./routes/habitsRoutes.js"
import { connectDB } from "./config/connectDB.js"
import dotenv from "dotenv"

dotenv.config();

const app = express()
const PORT = process.env.PORT || 5001

app.use(cors())
app.use(express.json())

connectDB();

app.use("/api/habits", habitsRoutes)

app.listen(PORT, () => {
  console.log("App listening on 3001", PORT)
})

export default app