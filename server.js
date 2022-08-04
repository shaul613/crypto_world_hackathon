
const express = require('express');
const knex = require('knex');
const {
  addLogin,
  checkUserId,
  checkPassword,
  saveUser,
  getData1
} = require('./db.js');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/', express.static(__dirname+'/public'));

app.listen(5000, ()=>{
  console.log('server up and renning...');
});

app.get('/signup', (req, res) => {
  res.sendFile(__dirname+'/public/signup.html');
});

app.post('/review', (req, res) => {
  saveUser(req.body.fname, req.body.lname, req.body.email, req.body.username,req.body.password)
  .then(() => {
    res.send('Thank you for signing up. Your application is currently under review which takes 5 to 7 business days.');
  })
  .catch(e => {
    res.send('Sorry, user already exists <a href="/">go back</a>');
    console.log(e);
  });
});

app.post('/home', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const userId = checkUserId(username);
  let success = await checkPassword(username, password);
  addLogin(userId, username, success);
  if(success){
    console.log('show the page');
    res.sendFile(__dirname+'/public/home.html');
  }
})

app.get('/home:id', getData1);

// (req, res) => {
//   const {user_id} = req.params;
//   getData(user_id)
//   .then(data => {
//     res.json(data);
//   })
// })
