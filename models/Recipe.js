const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let ingredientSchema = require('./Ingredient.js').schema;

const recipeSchema = new Schema({
    title : String, 
    ingredients : [ingredientSchema], /* a schema inside a schema */
    prep_cook_time : String,
    directions : String, 
    picture : String,
    video : String,
    quality_rating : Number,
    difficulty_rating : Number
    /* comments : [commentSchema] */
},
{
    timestamps: true
}); 

module.exports = mongoose.model('Recipe', recipeSchema);