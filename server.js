import 'dotenv/config.js'
import express from 'express'
import cors from 'cors'

import './config/database.js';

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`)
})