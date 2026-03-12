import express from "express"
import authRoutes from "./routes/authRoutes"
import habitsRoutes from "./routes/habitsRoutes"

const app = express() 

app.use("/api/auth", authRoutes)
app.use("api/habits", habitsRoutes)

app.listen(3001, () => {
  console.log("App listening on 3001")
})

export default app