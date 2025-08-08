require('dotenv').config() 
const mongoose = require('mongoose');
const connectDB = require('./db/connect');
const app = require('./app')

const PORT = process.env.PORT || 4000;

connectDB()
.then(() => {
    console.log("MongoDB Connection Successfull")

    app.listen(PORT , () => {
        console.log(`App is running on PORT: ${PORT}`)
    })   
})
.catch((error) => {
    console.log("Mongo DB Connection Error: " , error)
})

