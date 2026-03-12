import mongoose from "mongoose"

export const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URL}/HabitTracker`)
    console.log("DB CONECTED SUCESSFULLY!!")
  } catch (err) {
    console.log("ERROR CONNECTING DB!!", err)
    process.exit(1)
  }
}