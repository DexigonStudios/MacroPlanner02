const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    recipe:{
        type: String,
        required: true
    },
    serving:{
        type: String,
        required: true
    },
    time:{
        type: String,
        required: true
    },
    calorie:{
        type: String,
        required: true
    },
    protein:{
        type: String,
        required: true
    },
    carb:{
        type: String,
        required: true
    },
    fat:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    website:{
        type: String,
        required: true
    },
    ingredient:{
        type: String,
        required: true
    },
    step:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Recipe', recipeSchema);