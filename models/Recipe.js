const mongoose = require('mongoose');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

const recipeSchema = new mongoose.Schema({
    recipe: {
        type: String,
        required: true
    },
    serving: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    calorie: {
        type: String,
        required: true
    },
    protein: {
        type: String,
        required: true
    },
    carb: {
        type: String,
        required: true
    },
    fat: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    },
    ingredient: {
        type: String,
        required: true
    },
    step: {
        type: String,
        required: true
    },
    rank: {
        type: String,
        required: false
    },
})

const logInSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
})

// logInSchema.plugin(passportLocalMongoose);

const Recipe = mongoose.model('Recipe', recipeSchema);
const LogIn = mongoose.model('LogIn', logInSchema);

module.exports = {
    Recipe, LogIn
};