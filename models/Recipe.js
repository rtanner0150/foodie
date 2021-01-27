const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let ingredientSchema = require('./Ingredient.js').schema;

const recipeSchema = new Schema({
    title : {type: String, required: true}, 
    ingredients : {type: [ingredientSchema], required: true}, /* a schema inside a schema */
    prep_cook_time : {type: String, required: true},
    directions : {type: String, required: true}, 
    picture : {type: String, default: null},
    video : {type: String, default: null},
    quality_rating : {type: Number, default: null},
    difficulty_rating : {type: Number, default: null},
    summary : {type: String, required: true},
    created_by : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    tags : {type: String, default: null}
    /* comments : [commentSchema] */
},
{
    timestamps: true
}); 

module.exports = mongoose.model('Recipe', recipeSchema);