
const express = require('express');
const knex = require('knex');
const {addLogin} = require('./db.js');

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
  res.send('Thank you for signing up. Your application is currently under review which takes 5 to 7 business days.')
})

app.post('/home', (req, res) => {
  let userId = 1;
  let username = req.body.username;
  let time = new Date ();
  let success = false;
  addLogin(userId, username, time, success);

  console.log(req.body.username);
})


// app.post("/login", async (req, res) => {
//   console.log(req.body);
//   getUser(req.body.email)
//     .then(async (data) => {
//       console.log(data);
//       if (data.length == 0) {
//         res.json({ msg: "Email not registered" });
//       } else {
//         console.log(data[0].password);
//         const match = await bcrypt.compare(req.body.password, data[0].password);
//         if (!match) {
//           res.json({ msg: "Wrong Password" });
//         } else {
//           res.json({ msg: `Hi ${req.body.username} welcome back` });
//         }
//       }
//     })
//     .catch((e) => {
//       console.log(e);
//     });
});
