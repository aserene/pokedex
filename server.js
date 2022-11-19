require("dotenv").config() 
const express = require("express") 
const morgan = require("morgan") 
const methodOverride = require("method-override")
const pokemon = require("./models/pokemon")
const app = express()

app.use(morgan("tiny")) 
app.use(methodOverride("_method")) 
app.use(express.urlencoded({extended: true})) 
app.use(express.static("public"))

app.get("/", (req, res) => res.redirect("/pokedex"))
app.get("/pokedex", (req, res) => {
    res.render("index.ejs", {pokemon})
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`The server is listening on port ${PORT}...`)
})