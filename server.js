
const express = require('express');
const knex = require('knex');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const {
  addLogin,
  checkUserId,
  checkPassword,
  saveUser,
  getData,
  updateBalance,
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

// app.post('/', (req, res) => {
//   console.log('posted');
// })

app.post('/', (req, res) => {
  saveUser(req.body.fname, req.body.lname, req.body.email, req.body.username,req.body.password)
  .then(() => {
    console.log('signed up');
      res.send('Thank you for signing up. Your application is currently under review which takes 5 to 7 business days. click <a href="/">here</a> to go back to login.');
    res.sendFile(__dirname+'/public/index.html')

  })
  .catch(e => {
    res.send('Sorry, user already exists <a href="/">go back</a>');
    console.log(e);
  });
});

app.post('/home', async (req, res) => {
  const username = req.body.username; //username provided
  const password = req.body.password; //password provided
  // const [
  //   base,
  //
  // ]
  const userId = checkUserId(username);
  let success = await checkPassword(username, password);
  addLogin(userId, username, success);
  if(success){
    console.log('show the page');
    res.redirect('/portfolio');
    app.get('/home/userinfo', (req, res) => {
      getData(userId)
      .then(data => {
        res.json(data);
      })
    })
  }
})

// app.get('/home/:id', (req, res) => {
//   const id = req.params.id;
//   getData(id)
//   .then(data => {
//     res.json(data);
//   })
// })

app.get('/portfolio', (req, res) => {
  res.sendFile(__dirname+'/public/home.html');
})

// app.post('/page', (req, res) => {
//   const basecur = req.body.["the name attribute in the form"];
//   updateBalance()
// })
