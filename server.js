const mongoose = require('mongoose');
const connectionString = 'mongodb+srv://foodieDB:OnionsAndGarlic1@foodiecluster.wtnzu.mongodb.net/FoodieDatabase?retryWrites=true&w=majority';
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const Recipe = require('./models/Recipe.js');
const User = require('./models/User.js');
const Ingredient = require('./models/Ingredient.js');
const SavedRecipe = require('./models/SavedRecipe.js');

let port = process.env.PORT || 3000;

const dbCheck = mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log(dbCheck);
}).catch(err => console.error(err));

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.listen(port, () => {
    console.log('The Express server is running at port ' + port);
});

app.get('/recipes', (request, response) => {
    Recipe.find((err, recipes) => {
        if (err) return console.error(err);
        response.send(recipes);
    })
});

app.get('/users', (request, response) => {
    User.find((err, users) => {
        if (err) return console.error(err);
        response.send(users);
    })
});

app.get('/ingredients', (request, response) => {
    Ingredient.find((err, ingredients) => {
        if (err) return console.error(err);
        response.send(ingredients);
    })
});

app.get('/savedRecipes', (request, response) => {
    SavedRecipe.find((err, sr) => {
        if (err) return console.error(err);
        response.send(sr);
    })
});