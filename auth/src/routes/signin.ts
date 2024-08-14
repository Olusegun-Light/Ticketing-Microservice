import express from "express"

const router = express.Router()

router.post("/api/users/signin", (req, res) => {
    res.send("print")
})
// {} " [] h H
export { router as signinRouter }