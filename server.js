const express = require("express");
const knex = require("knex");
const cookieParser = require("cookie-parser");
const sessions = require("express-session");
const {
  addLogin,
  checkUserId,
  checkPassword,
  saveUser,
  getData,
  updateBalance,
} = require("./db.js");
const e = require("express");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", express.static(__dirname + "/public"));

app.listen(5003, () => {
  console.log("server up and renning...");
});

app.get("/signup", (req, res) => {
  res.sendFile(__dirname + "/public/signup.html");
});

// app.post('/', (req, res) => {
//   console.log('posted');
// })

app.post("/signup", (req, res) => {
  saveUser(
    req.body.fname,
    req.body.lname,
    req.body.email,
    req.body.username,
    req.body.password
  )
    .then(() => {
      console.log("signed up");
      res.send(
        'Thank you for signing up. Your application is currently under review which takes 5 to 7 business days. click <a href="/">here</a> to go back to login.'
      );
      res.sendFile(__dirname + "/public/index.html");
    })
    .catch((e) => {
      console.log(e);
      res.json({ msg: "Email or Username exist" });
    });
});

app.post("/portfolio", async (req, res) => {
  console.log(req.body);
  const username = req.body.username; //username provided
  const password = req.body.password; //password provided
  let userId = checkUserId(username)
    .then((data) => {
      console.log("hi" + data);
      if (data.length == 0) {
        res.json({ msg: "username does not exist" });
      }
    })
    .catch((e) => {
      console.log(e);
    });
  let success = await checkPassword(username, password)
    .then(async (data) => {
      if (!data) {
        res.json({ msg: "Wrong Password" });
      } else {
        console.log("show the page");
        res.redirect("/portfolio");
        app.get("/home/userinfo", (req, res) => {
          getData(userId).then((data) => {
            res.json(data).catch((e) => {
              console.log(e);
            });
          });
        });
      }
    })
    .catch((e) => {
      // res.json({ msg: "Wrong Password" });
      console.log(e);
    });
});

// .catch((e) => {
//   // res.json({ msg: "Wrong Password" });
//   console.log(e);
// });

// app.get('/home/:id', (req, res) => {
//   const id = req.params.id;
//   getData(id)
//   .then(data => {
//     res.json(data);
//   })
// })

app.get("/portfolio", (req, res) => {
  res.sendFile(__dirname + "/public/home.html");
});

// app.post('/page', (req, res) => {
//   const basecur = req.body.["the name attribute in the form"];
//   updateBalance()
// })
