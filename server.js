import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import connectDb from './database/db.js'
import userRouter from './routes/userRoutes.js'
import authRouter from './routes/authRoutes.js'


const app = express()


dotenv.config()
const port = process.env.PORT


connectDb()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(cors())

app.use('/api', userRouter)
app.use('/api/auth', authRouter)


app.listen(port, ()=>{
    console.log(`Our server is up and running on ${port}`)
})
