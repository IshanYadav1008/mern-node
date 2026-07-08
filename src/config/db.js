const mongoose = require('mongoose'); 

const mongoURL = process.env.MONGODB_URL_LOCAL

mongoose.connect(mongoURL);

const db = mongoose.connection;  

db.on('connected', () => {                      
    console.log('Connected to MongoDB Server')
})

db.on('error', (err) => {                           
    console.log('MongoDB Connection Error', err)
})

db.on('disconnected', () => {                   
    console.log('MongoDB Dis-Connected')
})

module.exports = db;