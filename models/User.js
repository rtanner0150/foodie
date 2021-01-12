const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let savedRecipeSchema = require('./SavedRecipe.js').schema;

const userSchema = new Schema ({
    username : {type: String, required: true}, 
    password : {type: String, required: true}, 
    email : {type: String, required: true}, 
    profile_pic : {type: String, default: null}, 
    saved_recipes : {type: [savedRecipeSchema], default: null}
    /* karma_system : Number */
},
{
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);