require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');

app.use(cors());

app.set("view engine", "ejs");
// app.use(express.static('styles'));
var path = require('path');

app.use(express.static('public'));

//database url
const url = 'mongodb+srv://admin01:' + process.env.MONGO_PASSWORD + '@macroplannercluster.zf2dvgf.mongodb.net/Recipe?retryWrites=true&w=majority';

//connect with database
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(console.log("MongoDB Connected"))
    .catch(err => console.log(err))

//Import Recipe Model
const Recipe = require('./models/Recipe');

// fs.readFile('public/recipes.json', 'utf-8', (err, jsonString) => {
//     if(err){
//         console.log(err);
//     } else {
//         console.log(jsonString);
//     }
// })

function test() {
    Recipe.find().then(data => {
        fs.writeFile('public/recipes.json', JSON.stringify(data), err => {
            if(err){
                console.log(err);
            } else {
                console.log("file was written");
            }
        })
    }).catch(err => console.log(err))
}


app.get("/", (req, res) => {
    res.render("index")
})

app.get("/recipes", (req, res) => {
    test();
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