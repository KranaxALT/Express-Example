const express = require('express')
const {readdirSync} = require('fs')

const morgan = require('morgan')
const cors = require('cors')
const bodyParse = require('body-parser')

const app = express()
const port = 3000
const connectDB = require('./config/db')
app.use(morgan('dev'))
app.use(cors())
app.use(bodyParse.json({limit: '10mb'}))

readdirSync('./routes')
    .map((r)=> app.use('/api', require('./routes/'+ r))
)



app.listen(port, async () => {
    try{
        await connectDB()
        console.log(`Server running at http://localhost:${port}/`)
    }catch(err){
        console.log('DB connection error', err)
    }
    
})