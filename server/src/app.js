const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()

const upload = require("./middlewares/multer.middleware")

// CORS middleware - IMPORTANT for frontend-backend communication
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://vali-doc.vercel.app/') 
    res.header('Access-Control-Allow-Credentials', 'true')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.sendStatus(200)
    } else {
        next()
    }
})

app.use(express.json())
app.use(cookieParser())

// Root route
app.get('/', (req, res) => {
    res.json({ 
        message: 'ValiDoc API is running successfully!',
        status: 'OK',
        endpoints: {
            organizations: '/api/v1/organizations',
            documents: '/api/v1/documents'
        }
    });
});

// Import routes
const organizationRoute = require('./routes/organization.router')
const documentsRoute = require("./routes/document.router")

// Use Routes
app.use("/api/v1/organizations", organizationRoute)
app.use("/api/v1/documents", upload.single('document'), documentsRoute)

module.exports = app;