const express = require('express')
const bodyParser = require('body-parser');

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const USERS = {};

const QUESTIONS = [{
    title: "Two states",
    description: "Given an array , return the maximum of the array?",
    testCases: [{
        input: "[1,2,3,4,5]",
        output: "5"
    }]
}];


const SUBMISSION = [

]

const admins = [

]

app.post('/signup', function(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  if(email in USERS){
    res.send('User already exists');
  }
  else{
    USERS[email]=password;
    res.send('Succesfully signedup');
  }
});




app.post('/login', function(req, res) {
  // Add logic to decode body
  // body should have email and password

  // Check if the user with the given email exists in the USERS array
  // Also ensure that the password is the same


  // If the password is the same, return back 200 status code to the client
  // Also send back a token (any random string will do for now)
  // If the password is not the same, return back 401 status code to the client
  const email = req.body.email;
  const password = req.body.password;
  if(email in USERS){
    if(password==USERS[email]){
      res.status(200).send('Login Succesful');
    }
    else{
      res.status(401).send('Incorrect password');
    }
  }
  else{
    res.status(401).send('User does not exist. Please signup');
  }
})

app.get('/questions', function(req, res) {
  //return the user all the questions in the QUESTIONS array
  res.send(QUESTIONS)
})

app.get("/submissions", function(req, res) {
   // return the users submissions for this problem
  res.send(SUBMISSION);
});


app.post("/submissions", function(req, res) {
   // let the user submit a problem, randomly accept or reject the solution
   // Store the submission in the SUBMISSION array above
  const randomNumber = getRandomNaturalNumber(100); // generate a random number between 1 and 100
  if(randomNumber%2==0){
    SUBMISSION.push(req.body.SUBMISSION);
  }
  else{
    res.send('Sorry your submission is not accepted');
  }
});

// leaving as hard todos
// Create a route that lets an admin add a new problem
// ensure that only admins can do that.
app.post("/addProblem", function(req, res) {
  if(req.body.email in admins){
    QUESTIONS.push(req.body.json);
  }
  else{
    res.send('Sorry you dont have the access to add a problem')
  }
});

app.listen(port, function() {
  console.log(`Example app listening on port ${port}`)
})