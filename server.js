require('dotenv').config();

const mongoose = require('mongoose');
const connectionString = 'mongodb+srv://foodieDB:OnionsAndGarlic1@foodiecluster.wtnzu.mongodb.net/FoodieDatabase?retryWrites=true&w=majority';
const express = require('express');
const app = express();
const bcrypt = require('./server.js').bcrypt;
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const path = require('path');
const bodyParser = require('body-parser');
const Recipe = require('./models/Recipe.js');
const User = require('./models/User.js');
const Ingredient = require('./models/Ingredient.js');
const SavedRecipe = require('./models/SavedRecipe.js');
const fileupload = require('express-fileupload');
const { allowedNodeEnvironmentFlags } = require('process');
const { createCipher } = require('crypto');

const initializePassport = require('./passport-config')
initializePassport(
  passport
  //email => users.find(user => user.email === email),
  //id => users.find(user => user.id === id)
)

let port = process.env.PORT || 3000;

const dbCheck = mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log(dbCheck);
}).catch(err => console.error(err));

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
//app.use('/auth', requireAuth, express.static(path.join(__dirname, 'auth')));
//app.use(checkAuthenticated, express.static(path.join(__dirname, 'public')));
app.set('viewengine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(fileupload());
app.use(flash());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/auth', [checkAuthenticated, express.static(path.join(__dirname, 'auth'))])

app.listen(port, () => {
    console.log('The Express server is running at port ' + port);
});

//get root
app.get('/', (request, response) => {
    response.render('login.ejs');
})

//RECIPES
//get all recipes
app.get('/recipes', (request, response) => {
    Recipe.find((err, recipes) => {
        if (err) return console.error(err);
        response.send(recipes);
    })
});
//get recipe by id
app.get('/recipes/:id', (request, response) => {
    Recipe.findOne({_id: request.params.id}).exec((err, recipe) => {
        if (err) {
            response.sendStatus(404);
            return console.error(err);
        }
        response.statusCode = 200;
        response.send(recipe);
    })
})
//create new recioe
app.post('/recipes', (request, response) => {
    let r = new Recipe(request.body);
    r.save((err, r) => {
        if (err){
            response.sendStatus(409);
            return console.error(err);
        }
        response.sendStatus(201);
    })
});
//delete recipe by id
app.delete('/recipes/:id', async (request, response) => {
    Recipe.deleteOne({_id: request.params.id})
    .then(() => response.sendStatus(204))
    .catch(() => response.sendStatus(404));
});
//update recipe by id
app.put('/recipes/:id', async(request, response) => {
    let updatedRecipe = new Recipe(request.body);
    Recipe.findOne({_id: request.params.id}).exec((err, recipe) => {
        if (err) return console.error(err);
        recipe.title = updatedRecipe.title;
        recipe.ingredients = updatedRecipe.ingredients;
        recipe.prep_cook_time = updatedRecipe.prep_cook_time;
        recipe.directions = updatedRecipe.directions;
        recipe.picture = updatedRecipe.picture;
        recipe.video = updatedRecipe.video;
        //recipe.quality_rating = updatedRecipe.quality_rating;
        //recipe.difficulty_rating = updatedRecipe.difficulty_rating;
        recipe.summary = updatedRecipe.summary;
        recipe.tags = updatedRecipe.tags;
        //recipe.created_by = updatedRecipe.created_by;
        try{
            recipe.save();
            response.sendStatus(200);
        } catch{
            response.sendStatus(500);
        }
    })
});
//search recipes for given query on given category
app.get('/recipes/search/:on/:query', (request, response) => {
    var regex = new RegExp(request.params.query, 'gi');
    let prop = request.params.on;
    let query = {};
    query[prop] = regex;
    Recipe.find(query, (err, recipes) => {
        if (err) return console.error(err);
        response.send(recipes);
    })
});
//get specific user's recpies for user's profile page
app.get('/recipes/user/:id', (request, response) => {
    Recipe.find({created_by : request.params.id}, function(err, recipes){
        if (err) return console.error(err);
        response.send(recipes);
    })
})
//search recipes by ingredient
// app.get('/recipes/search_ingredient/:query', (request, response) => {
//     var regex = new RegExp(request.params.query, 'gi');
//     Recipe.find({'ingredients.name': regex}, (err, recipes) => {
//         if (err) return console.error(err);
//         response.send(recipes);
//     })
// })

//USERS
//get all users
app.get('/users', (request, response) => {
    User.find((err, users) => {
        if (err) return console.error(err);
        response.send(users);
    })
});
//create new user
app.post('/users', (request, response) => {
    let u = new User(request.body);
    u.save((err, u) => {
        if (err){
            response.sendStatus(409);
            return console.error(err);
        }
        response.sendStatus(201);
    })
});
//update user by id
app.put('/users/:id', (request, response) => {
    let updatedUser = new User(request.body);
    User.findOne({_id: request.params.id}).exec((err, user) => {
        if (err) return console.error(err);
        user.username = updatedUser.username;
        user.password = updatedUser.password;
        user.email = updatedUser.email;
        user.profile_pic = updatedUser.profile_pic;
        user.saved_recipes = updatedUser.saved_recipes;
        try{
            user.save();
            response.sendStatus(200);
        } catch{
            response.sendStatus(500);
        }
    })
});
//get specific user by id
app.get('/users/:id', (request, response) => {
    User.findOne({_id: request.params.id}).exec((err, user) => {
        if (err) return console.error(err);
        response.send(user);
    })
})

//get saved recipes for specific user
app.get('/users/:id/recipes', (request, response) => {
    
    User.findOne({_id: request.params.id}).exec().then(user => {
        findSavedRecipes(user).then(recipes => {
            response.send(recipes);
        });
    })

    async function findSavedRecipes(user){
        let recipes = [];
        for (let i = 0; i < user.saved_recipes.length; i++){
            await Recipe.findOne({_id: user.saved_recipes[i].recipe_id}).exec().then(recipe => {
                recipes.push(recipe)
            });
        }
        return recipes;
    }
})

//handle img upload: https://flaviocopes.com/file-upload-using-ajax/
app.post('/saveImage', (request, response) => {
    const fileName = request.files.image.name;
    const path = __dirname + '/public/img/upload/' + fileName;

    request.files.image.mv(path, (error) => {
        if (error) {
            console.error(error);
            response.writeHead(500, {
                'Content-Type': 'application/json'
            });
            response.end(JSON.stringify({status: 'error', message: error}))
            return;
        }

        response.writeHead(200, {
            'Content-Type': 'application/json'
        });
        response.end(JSON.stringify({status: 'success', path: '/img/upload/' + fileName}))
    })
});

//login functionality
app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs')
})
app.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
    //   users.push({
    //     id: Date.now().toString(),
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: hashedPassword
    //   })
      let user = new User({
          username: req.body.name,
          email: req.body.email,
          password: hashedPassword,
          profile_pic: null
      });
      user.save();
      res.redirect('/login')
    } catch {
      res.redirect('/register')
    }
})
app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs')
})
app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/feed',
    failureRedirect: '/login',
    failureFlash: true
}))
app.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')
  })

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/feed')
    }
    next()
}

app.get('/feed', checkAuthenticated, async (request, response) => {
    console.log(await request.user);
    response.redirect('auth/feed-main.html');
})

app.get('/loggedInUser', async (request, response) => {
    let loggedInUser = await request.user;
    console.log(loggedInUser);
    response.send(loggedInUser);
})