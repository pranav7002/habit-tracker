import Habit from "../models/Habit.js"

// Fetch all habits from the database.
// Returns habits sorted by newest first.
export const getAllHabits = async (req, res) => {
  try {
    const habits = await Habit.find().sort({ createdAt: -1 })
    res.json(habits)
  } catch (error) {
    res.status(500).json({ message: "Server error!!" })
  }
}

// Create a new habit using data from request body.
export const createHabit = async (req, res) => {
  try {
    const { title, description, frequency } = req.body

    const habit = new Habit({
      title,
      description,
      frequency
    })

    await habit.save()

    res.status(201).json(habit)
  } catch (error) {
    res.status(500).json({ message: "Server error!!" })
  }
}

// Marks a habit as completed for today/week.
export const markComplete = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id)

    if (!habit) {
      return res.status(404).json({ message: "Habit not found" })
    }

    const today = new Date()
    today.setHours(0,0,0,0)
    
    let alreadyCompleted = false

    if (habit.frequency === "daily") {
      alreadyCompleted = habit.completedDates.some(date => {
        const d = new Date(date)
        d.setHours(0,0,0,0)
        return d.getTime() === today.getTime()
      })
    }

    if (habit.frequency === "weekly") {
      alreadyCompleted = habit.completedDates.some(date => {
        const diff = today - new Date(date)
        const days = diff / (1000 * 60 * 60 * 24)
        return days < 7
      })
    }

    if (!alreadyCompleted) {
      habit.completedDates.push(today)
      await habit.save()
    }

    res.json(habit)

  } catch (error) {
    res.status(500).json({ message: "Server error!!" })
  }
}

// Deletes a habit from the database using its ID.
export const deleteHabit = async (req, res) => {
  try {
    const habit = await Habit.findByIdAndDelete(req.params.id)

    if (!habit) {
      return res.status(404).json({ message: "Habit not found" })
    }

    res.json({ message: "Habit deleted" })
  } catch (error) {
    res.status(500).json({ message: "Server error!!" })
  }
}