const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")

const app = express()
const routes = require("./routes/routes.js")

mongoose.connect("mongodb+srv://gabriel:winter22@cluster0.qhsvm24.mongodb.net/?retryWrites=true&w=majority")
.then(function() {
    console.log("Connected to the MongoDB database")
})
.catch(function(error) {
    throw new error
})

app.use(cors({
    credentials: true,
    origin: ['http://localhost:8080']
}))
app.use(express.json())
app.use(cookieParser())
app.use("/api", routes)

app.listen(3000, function() {
    console.log("Server is up and running!")
})