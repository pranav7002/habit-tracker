import Habit from "../models/Habit.js"

// Fetch all habits from the database.
// Returns habits sorted by newest first.
export const getAllHabits = async (req, res) => {
  try {
    const habits = await Habit.find().sort({ createdAt: -1 })
    res.status(200).json(habits)
  } catch (error) {
    res.status(500).json({message: "SERVER ERROR!!"})
  }
}

// Create a new habit using data from request body.
export const createHabit = async (req, res) => {
  try {
    const { title, description, frequency } = req.body
    const newHabit = new Habit({ title, description, frequency })
    await newHabit.save()  

    res.status(201).json(newHabit)
  } catch (error) {
    res.status(500).json({message: "SERVER ERROR!!"})    
  }
}

// Marks a habit as completed for today/week.
export const markComplete = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id)

    if (!habit) {
      return res.status(404).json({ message: "Habit not found" })
    }    
    
    let completion = false
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    if (habit.frequency === "daily") {
      completion = habit.completedDates.some(date => {
        const d = new Date(date)
        d.setHours(0, 0, 0, 0)
        return d.getTime() === today.getTime()
      })
    }
    if (habit.frequency === "weekly") {
      completion = habit.completedDates.some(date => {
        const d = new Date(date)
        d.setHours(0, 0, 0, 0)
        const diff = today.getTime() - d.getTime()
        return diff < 7*24*60*60*1000
      })  
    }

    if (!completion) {
      habit.completedDates.push(today)
      await habit.save()
    }

    res.json(habit)
    
  } catch (error) {
    res.status(500).json({message: "SERVER ERROR!!"})      
  }
}

// Deletes a habit from the database using its ID.
export const deleteHabit = async (req, res) => {
  try {
    const deleted = await Habit.findByIdAndDelete(req.params.id)    

    if (!deleted) {
      return res.status(404).json({ message: "Habit not found" })
    }

    res.json({ message: "Habit deleted successfully" })  
    
  } catch (error) {
    res.status(500).json({message: "SERVER ERROR!!"})    
  }
}

export const updateHabit = async (req, res) => {
  try {
    const { title, description } = req.body

    const updatedHabit = await Habit.findByIdAndUpdate(req.params.id, {
      title,
      description
    }, {
      new: true
    }) 

    if (!updatedHabit) {
      return res.status(404).json({ message: "Habit not found" })
    }

    res.json(updatedHabit)
  } catch (error) {
    res.status(500).json({message: "SERVER ERROR!!"})      
  }
}

export const getStats = async (req, res) => {
  try {
    const habits = await Habit.find()
    const totalHabits = habits.length

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    let completed = 0

    habits.forEach(habit => {
      if (habit.frequency === "daily") {
        habit.completedDates.forEach(date => {
          const d = new Date(date)
          d.setHours(0, 0, 0, 0)
          if (d.getTime() === today.getTime()) completed++
        })
      }
      if (habit.frequency === "weekly") {
        habit.completedDates.forEach(date => {
          const d = new Date(date)
          d.setHours(0, 0, 0, 0)
          const diff = today.getTime() - d.getTime() 
          if (diff < 7*24*60*60*1000) completed++
        })
      }
    });

    res.status(200).json({
      totalHabits,
      completedHabits: completed
    })
  } catch (error) {
    res.status(500).json({ message: "SERVER ERROR!!" })    
  }
}
