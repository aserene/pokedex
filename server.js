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
// index route (DONE & WORKING)
app.get("/pokedex", (req, res) => {
    res.render("index.ejs", {pokemon})
})
// new route pt. 1
app.get("/pokedex/new", (req, res)=> {
    // res.send("what'cha tryna make?")
    res.render("new.ejs", {pokemon})
})
// new route pt. 2
app.post("/pokedex", (req, res)=> {
    pokemon.push(req.body)
    res.redirect("/pokedex")
})
// edit (form) route pt. 1
app.get("/pokedex/:id/edit", (req, res) => {
    // res.send("hello")
    res.render("edit.ejs", {
        poke: pokemon[req.params.id],
        index: [req.params.id]
    })
})
// edit (put) route pt. 2
app.put("/pokedex/:id", (req, res) => {
    pokemon[req.params.id] = req.body
    // redirect user back to index
    res.redirect("/pokedex")
})
// delete route (DONE & WORKING)
app.delete("/pokedex/:id", (req, res) => {
    // splice the item out of the array
    pokemon.splice(req.params.id, 1)
    // redirect user back to index after deleting pokemon
    res.redirect("/pokedex")
})
// show route (DONE & WORKING)
app.get("/pokedex/:id", (req, res)=> {
    // res.send("you're in the right place...")
    res.render("show.ejs", {
        poke: pokemon[req.params.id],
        index: [req.params.id]
    })
})
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`The server is listening on port ${PORT}...`)
})