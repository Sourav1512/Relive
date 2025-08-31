import dotenv from "dotenv"
import connectDB from './src/db/db.js'
import { app } from "./src/app.js"
import "./src/cron/matchingCron.js"
dotenv.config({path : "./.env"})

const PORT = process.env.PORT || 8000

connectDB().then(() => {
    app.on("error", (err)=>{
        console.log(err)
    })
    app.listen(PORT,()=>{
        console.log("server running",PORT)
    })
}).catch((err) => {
    console.log("connection failed", err?.message)
})