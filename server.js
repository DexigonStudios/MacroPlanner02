require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
// const LocalStrategy = require('passport-local').Strategy;
const bodyParser = require('body-parser');





// async function initialize(passport, getUserByUserName){
//     const authenticateUser = async (username, password, done) => {
//         const user = getUserByUserName(username)
//         if(user == null){
//             return done(null, false, {message: 'No username'})
//         }
//         const check = await LogIn.findOne({username: username})

//         try{
//             if(check.password === user.password){
//                 return done(null, user)
//             } else {
//                 return done(null, false, {message: 'Incorrect password'})
//             }
//         } catch (e) {
//             return done(e)
//         }
//     }

//     passport.use(new LocalStrategy({usernameField: 'username'},
//     authenticateUser))
//     passport.serializeUser((user, done) => {})
//     passport.deserializeUser((id, done) => {})


// }
// //import passport config
// const initializePassport = require("./passport-config")
// initialize(passport, 
//     email => LogIn.find(user => user.username === username)
// )

app.use(cors());
// app.use(flash());
// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false
// }))
// app.use(passport.initialize())
// app.use(passport.session())

app.set("view engine", "ejs");
// app.use(express.static('styles'));
var path = require('path');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }))
// app.use(bodyParser.urlencoded({extended: true}));

//database url
const url = 'mongodb+srv://admin01:' + process.env.MONGO_PASSWORD + '@macroplannercluster.zf2dvgf.mongodb.net/Recipe?retryWrites=true&w=majority';

//connect with database
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(console.log("MongoDB Connected"))
    .catch(err => console.log(err))


//Import Recipe Model
const { Recipe, LogIn } = require('./models/Recipe');





// fs.readFile('public/recipes.json', 'utf-8', (err, jsonString) => {
//     if(err){
//         console.log(err);
//     } else {
//         console.log(jsonString);
//     }
// })


//adds data from mongodb into recipes.json
function test(_callback) {
    Recipe.find().then(data => {
        fs.writeFile('public/recipes.json', JSON.stringify(data), err => {
            if (err) {
                console.log(err);
                _callback();
            } else {
                _callback();
            }
        })
    }).catch(err => {
        console.log(err)
        _callback();
    })
}

//checks if logged in
// function authUser(req, res, next){
//     if(req.user == null){
//         res.status(403)
//         return res.send("You need to sign in")
//     }

//     next()
// }


//intialize passport
// app.use(passport.initialize());
// app.use(passport.session());


//passport local strategy
// passport.use(LogIn.createStrategy());

//serialize and deserialzie user
// passport.serializeUser(function(user, done) {
//     done(null, user.id);
// });
// passport.deserializeUser(function(id, done) {
//     LogIn.findById(id, function (err, user) {
//         done(err, user);
//     })
// })


app.get("/", (req, res) => {
    test(() => res.render("index"))
})

app.get("/recipes", (req, res) => {
    test(() => res.render("recipes"))
})

app.get("/blog", (req, res) => {
    test(() => res.render("blog"))
})

app.get("/about", (req, res) => {
    res.render("about")
})

app.get("/contact", (req, res) => {
    res.render("contact")
})

app.get("/recipesearch", (req, res) => {
    test(() => res.render("recipesearch"))
})

app.get("/recipepage", (req, res) => {
    test(() => res.render("recipepage"))
})

app.get("/blogpage", (req, res) => {
    res.render("blogpage")
})

// app.get("/account", (req, res) =>{
//     if(req.isAuthenticated()){
//         res.render("account")
//     } else {
//         res.send("not signed in")
//     }
// })

app.get("/addrecipe", (req, res) => {
    res.render("addrecipe")
})

app.post("/addrecipe", async (req, res) => {
    const user = new LogIn({
        username: "admin",
        password: req.body.password
    });
    const data = {
        recipe: req.body.recipe,
        serving: req.body.serving,
        time: req.body.time,
        calorie: req.body.calorie,
        protein: req.body.protein,
        carb: req.body.carb,
        fat: req.body.fat,
        image: req.body.image,
        website: req.body.website,
        ingredient: req.body.ingredient,
        step: req.body.step,
        rank: req.body.rank
    }
    try {
        const check = await LogIn.findOne({ username: "admin" })

        if (check.password === req.body.password) {
            await Recipe.insertMany([data]);
            res.redirect('/addrecipe');
        } else {
            res.send("wrong password")
        }

    }
    catch {
        res.send("error")
    }
})

// app.get("/login", (req, res) => {
//     res.render("login")
// })

// app.get("/signup", (req, res) => {
//     res.render("signup")
// })

// app.post("/login", async (req, res) => {
//     const user = new LogIn({
//         username: req.body.username,
//         password: req.body.password
//     });
//     try {
//         const check = await LogIn.findOne({ username: req.body.username })

//         if (check.password === req.body.password) {
//             res.redirect('/');
//         } else {
//             res.send("wrong password")
//         }

//     }
//     catch {
//         res.send("username does not exist")
//     }

// })

// app.post("/signup", async (req, res) => {
//     const data = {
//         username: req.body.username,
//         password: req.body.password,
//     }
//     const check = await LogIn.findOne({ username: req.body.username }).select("username").lean();
//     if (check) {
//         res.send("username already exists")
//     } else {
//         await LogIn.insertMany([data]);
//         res.redirect('/');
//     }

// })


// app.get("/logout", (req, res) => {
//     req.logout();
//     res.redirect("/");
// })




app.listen(8080)