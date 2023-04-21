const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {

    // Run your code here, after you have insured that the connection was made

    const details =
    {
      title: 'Chicken',
      level: 'Amateur Chef',
      ingredients: ['salt', 'pepper'],
      cuisine: 'southern',
      dishType: 'main_course',
      image: null,
      duration: 3,
      creator: 'Lee',
      created: null,
    }

    return Recipe.create(details)

  })
  .then((recipe) => {
    console.log('Title: ', recipe.title)
   return Recipe.insertMany(data)

  })
  .then(()=>{
  return Recipe.findOneAndUpdate(
    {title: "Rigatoni alla Genovese"},{ duration: 100 }, { new: true})
  })

  .then((updated) => {
   console.log('updated recipe', updated)
  })

  .then(() => {
    return Recipe.deleteOne({ name: 'Carrot Cake' })
  })

  .then((deleted) => {
    console.log('recipe successfully deleted', deleted)
  })
  // .then(() => {
  //   mongoose.connection.close(function () {
  //     console.log('Mongoose default connection closed');
  //   });
  // })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });