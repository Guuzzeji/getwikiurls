require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const compress = require('compression')

//Custom imports
const api_route = require('./src/api_routes')
const keepServerLive = require('./src/keeplive')

if(process.env.PRODUCTION == true){
    keepServerLive()
}

app.use(helmet())
app.use(morgan('common'))
app.use(cors())
app.use(compress())

//Webpage & Routes
app.use(express.static('./public/html'))
app.use('/api', api_route)

app.listen(process.env.PORT, console.log('live on http://localhost:'+process.env.PORT))