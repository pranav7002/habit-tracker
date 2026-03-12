import express from "express"
import { createHabit, deleteHabit, getAllHabits, markComplete } from "../controllers/habitsController"

const router = express.Router()

router.get("/", getAllHabits)
router.post("/", createHabit)
router.post("/:id/complete", markComplete)
router.delete("/:id", deleteHabit)

export default router