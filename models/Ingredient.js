const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
    name : String,
    amount : String, 
    substitutions : String, 
},
{
    timestamps: true
});

module.exports = mongoose.model('Ingredient', ingredientSchema);