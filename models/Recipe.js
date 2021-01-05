const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
}); 

module.exports = mongoose.model('Recipe', recipeSchema);