import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()
app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173/",
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded())
app.use(express.static("public"))
app.use(cookieParser())

import userRouter from "./routes/user.route.js"
import adminRouter from "./routes/admin.route.js"
import donorRouter from "./routes/doner.route.js"
import recipientRouter from "./routes/recipient.route.js"

app.use("/user", userRouter)
app.use("/admin", adminRouter)
app.use("/donor", donorRouter)
app.use("/recipient", recipientRouter)

app.get("/", (req, res) => {
    res.send("working")
})


export { app }