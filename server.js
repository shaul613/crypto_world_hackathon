
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

// , (req, res) => {
//   console.log('hello');
//   if(req.session){
//     console.log('no more coccies');
//     req.session.destroy(); //terminating any previous session
//   } else{
//     console.log('no cockies');
//   }
// }

app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: 1 },
    // cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: false
}));

app.use(cookieParser());

let session;

app.listen(5000, ()=>{
  console.log('server up and renning...');
});

// app.get('/', (req, res) => {
//   res.redirect(__dirname+'/public/index.html');
//   console.log('hello');
//   req.session.destroy(); //terminating any previous session
//
//   // if(req.session.username){
//   //   req.session.destroy();
//   //   console.log('hello');
//   // }
//   // res.sendFile(__dirname+'/public/index.html');
// });

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
    // res.send('Thank you for signing up. Your application is currently under review which takes 5 to 7 business days. click <a href="/">here</a> to go back to login.');
    res.sendFile(__dirname+'/public/index.html');
  })
  .catch(e => {
    app.get('/signup_err', (req, res) => {
      res.send('Sorry, user already exists <a href="/">go back</a>');
    })
    res.redirect('/');
    // console.log(e);
  });
});

app.post('/home', async (req, res) => {
  console.log('post');
  const username = req.body.username; //username provided
  const password = req.body.password; //password provided
  const userId = checkUserId(username); //Does user id exist?
  let success = await checkPassword(username, password); //does password match?
  addLogin(userId, username, success); //record login attempt in database

  if(success){
    res.redirect('/portfolio');
    session = req.session;
    session.username = req.body.username;
    // console.log(req.session);

    app.get('/home/userinfo', (req, res) => {
      getData(userId)
      .then(data => {
        res.json(data);
      })
    })
  } else{
    app.get('/login_fail', (req, res) => {
      res.json("Sorry, the username and password don't match");
    })
  }

})

app.get('/portfolio', (req, res) => {
  res.sendFile(__dirname+'/public/home.html');
})

app.post('/transaction', (req, res) => {
  updateBalance(req.body.crypto1, req.body.crypto2, req.body.base_amount, req.body.des_amount, session.username);
  // console.log(session.username);
  res.redirect('portfolio');
})

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

// app.post('/page', (req, res) => {
//   const basecur = req.body.["the name attribute in the form"];
//   updateBalance()
// })
