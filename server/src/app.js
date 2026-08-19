import express from "express"
import cors from "cors"
import authRoutes from "./routes/authRoutes.js"
import memoryRoutes from "./routes/memoryRoutes.js"
import errorMiddleware from "./middleware/errorMiddleware.js"

const app = express()
app.use(express.json())
app.use(cors())

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/memories", memoryRoutes)

app.use(errorMiddleware)

export default app;