const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let savedRecipeSchema = require('./SavedRecipe.js').schema;

const userSchema = new Schema ({
    username : String, 
    password : String, 
    email : String, 
    profile_pic : String, 
    saved_recipes : [savedRecipeSchema]
    /* karma_system : Number */
});

module.exports = mongoose.model('User', userSchema);