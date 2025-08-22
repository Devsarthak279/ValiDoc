require('dotenv').config() 
const mongoose = require('mongoose');
const connectDB = require('./db/connect');
const app = require('./app')


connectDB()
.then(() => {
    console.log("MongoDB Connection Successfull")

    const port = process.env.PORT || 4000;
    app.listen(port , () => {
        console.log(`App is running on PORT: ${port}`)
    })   
})
.catch((error) => {
    console.log("Mongo DB Connection Error: " , error)
})
