// 4.6 - Express app with Mustache templates and partials
const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const PORT = 3000;


// Set the view engine for express to use Handlebars
app.engine('hbs', exphbs.engine({
  defaultLayout: 'main', // this looks for a template called "main" in the /views/layouts folder
  extname: '.hbs' // We're specifying the file extension as '.hbs' for brevity
}));

app.set('view engine', 'hbs');

// Index page
app.get('/', function (req, res) {
  res.render('index');
});

// User page with dynamic userId parameters from url
app.get('/user/:userId', function (req, res) {
  const userId  = req.params.userId; // This gets the userId from the request url
  res.render('user', {userId: userId});
});

// Hello page with username extracted from query parameters
// These are everything that comes after the "?" in a url
app.get('/hello', function (req, res) {
  const name = req.query.name || "Anonymous User" 
  console.log(`query parameters: `, req.query);
  res.render('hello', {username: name});
});


app.listen(PORT, function () {
  console.log(`Server started at http://localhost:${PORT}`);
});