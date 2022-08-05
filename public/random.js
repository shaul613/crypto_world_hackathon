app.post("/register", (req, res) => {
  saveUser({
    firstName: req.body.fname,
    lastName: req.body.lname,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  })
    .then((data) => {
      res.json(data);
    })
    .catch((e) => {
      console.log(e);
      res.json({ msg: "username exist" });
    });
});
function updateUser(firstName, lastName, email, username, password) {
  return db("user")
    .insert({ firstName, lastName, email, username, password })
    .returning("*");
}
