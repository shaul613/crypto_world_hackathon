const knex = require('knex');

const db = knex({
  client:'pg',
  connection: {
    host:'localhost',
    port:'5432',
    user:'postgres',
    password:'ilovepizza',
    database:'crypto_world',
  }
})

function addLogin(user,username,success){ //checking for login
  db('login')
  .insert({user_id:user, provided_username:username, signin_success:success})
  .returning('*')
  .then(data => {
    console.log(data);
  });
}

function checkUserId(username){
  return db('users')
  .select('user_id')
  .where({user_name:username});
}

function checkPassword(username, password){
  return db('users')
  .select('*')
  .where({user_name:username})
  .then(data => {
    console.log(data);
    return data[0].password == password;
  });
}

function saveUser(firstName, lastName, email, username, password) {
    return db("users")
      .insert({ first_name:firstName, last_name:lastName, email:email, user_name:username, password:password })
      .returning("*");
    }

function getData(user){
  console.log(user);
  return db('users')
  .select('btc_balance', 'eth_balance', 'usd_balance')
  .where({user_id:user})
}

function updateBalance(base, desired, baseAmount, desAmount, user){
  return db("users")
  .where({user_id:user})
  .update({
    base:baseAmount,
    desired:desAmount
  });
}

module.exports = {
  addLogin,
  checkUserId,
  checkPassword,
  saveUser,
  getData,
  updateBalance,
}
