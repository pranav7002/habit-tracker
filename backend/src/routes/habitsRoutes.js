import express from "express"
import { createHabit, deleteHabit, getAllHabits, getStats, markComplete, updateHabit } from "../controllers/habitsController.js"

const router = express.Router()

router.get("/", getAllHabits)
router.get("/stats", getStats)
router.post("/", createHabit)
router.post("/:id/complete", markComplete)
router.put("/:id", updateHabit)
router.delete("/:id", deleteHabit)

export default router