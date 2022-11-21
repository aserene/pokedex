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
// app.get("/pokedex/new", (req, res)=> {
//     // res.send("what'cha tryna make?")
//     res.render("new.ejs", {pokemon})
// })
// app.post("/pokedex", (req, res)=> {
//     pokemon.push(req.body)
//     res.redirect("/pokedex")
// })
app.get("/pokedex/:id", (req, res)=> {
    // res.send("you're in the right place...")
    res.render("show.ejs", {
        poke: pokemon[req.params.id],
        pokemons: pokemon
    })
})
// app.get("/pokedex/:id/edit", (req, res) => {
//     res.render("edit.ejs")
// })
// app.put("/pokedex/:id", (req, res) => {
//     console.log("this is working")
// })
// app.delete("/pokedex/:id", (req, res) => {
//     res.send("trying to delete?")
// })
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`The server is listening on port ${PORT}...`)
})