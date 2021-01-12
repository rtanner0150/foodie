const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
    name : {type: String, required: true},
    amount : {type: String, required: true}, 
    substitutions : {type: String, default: null} 
},
{
    timestamps: true
});

module.exports = mongoose.model('Ingredient', ingredientSchema);