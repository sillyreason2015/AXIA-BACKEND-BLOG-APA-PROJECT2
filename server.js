import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import connectDb from './database/db.js'
import userRouter from './routes/userRoutes.js'
import authRouter from './routes/authRoutes.js'
import passwordRouter from './routes/passwordRoutes.js'
import otpRouter from './routes/otpRoutes.js'
import commentRouter from './routes/commentRoutes.js'
import postRouter from './routes/postRoutes.js'



const app = express()


dotenv.config()
const port = process.env.PORT

//connect database function
connectDb()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(cors())

// API routes
app.use('/api', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/password', passwordRouter)
app.use('/api/otp', otpRouter)
app.use('/api/comment', commentRouter)
app.use('/api/post', postRouter)

// Start server
app.listen(port, ()=>{
    console.log(`Our server is up and running on ${port}`)
})
