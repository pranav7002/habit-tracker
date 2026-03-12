import mongoose from "mongoose"

const habitSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String
    },

    frequency: {
      type: String,
      enum: ["daily", "weekly"],
      default: "daily"
    },

    completedDates: [
      {
        type: Date
      }
    ]
  },
  { timestamps: true }
)

export default mongoose.model("Habit", habitSchema)