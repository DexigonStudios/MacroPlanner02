const express = require("express")
const app = express()

app.set("view engine", "ejs");
// app.use(express.static('styles'));
var path = require('path');

app.use(express.static('public'));

app.get("/", (req, res) => {
    res.render("index")
})

app.get("/recipes", (req, res) => {
    res.render("recipes")
})

app.get("/blog", (req, res) => {
    res.render("blog")
})

app.get("/about", (req, res) => {
    res.render("about")
})

app.get("/contact", (req, res) => {
    res.render("contact")
})

app.get("/recipesearch", (req, res) => {
    res.render("recipesearch")
})

app.get("/recipepage", (req, res) => {
    res.render("recipepage")
})

app.get("/blogpage", (req, res) => {
    res.render("blogpage")
})


app.listen(8080)