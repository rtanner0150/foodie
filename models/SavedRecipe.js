const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const savedRecipeSchema = new Schema({
    recipe_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe'
    },
    favorited: Boolean
},
{
    timestamps: true
});

module.exports = mongoose.model('SavedRecipe', savedRecipeSchema);