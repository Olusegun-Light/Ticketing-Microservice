import express from "express"

const router = express.Router()

router.get("/api/users/current", (req, res) => {
    res.send("print")
})

export { router as currentUserRouter }