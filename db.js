const knex = require("knex");

const db = knex({
  client: "pg",
  connection: {
    host: "localhost",
    port: "5432",
    user: "postgres",
    password: "root",
    database: "crypto_world",
  },
});

function addLogin(user, username, success) {
  //checking for login
  db("login")
    .insert({
      user_id: user,
      provided_username: username,
      signin_success: success,
    })
    .returning("*")
    .then((data) => {
      console.log(data);
    });
}

function checkUserId(username) {
  return db("users").select("user_id").where({ user_name: username });
}

function checkPassword(username, password) {
  return db("users")
    .select("*")
    .where({ user_name: username })
    .then((data) => {
      console.log(data);
      return data[0].password == password;
    });
}
function updatewallet(list1, list2) {
  return db("users")
    .update(`${list1}_balance`, `${list2}_balance`)
    .where()
    .then((data) => {
      console.log(data);
    });
}
function saveUser(firstName, lastName, email, username, password) {
  return db("users")
    .insert({
      first_name: firstName,
      last_name: lastName,
      email: email,
      user_name: username,
      password: password,
    })
    .returning("*");
}

function getData(poi) {
  console.log(poi);
  return db("users").select("*").where({ user_id: poi });
}

module.exports = {
  addLogin,
  checkUserId,
  checkPassword,
  saveUser,
  getData,
};
