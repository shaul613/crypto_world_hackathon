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

function addLogin(user,time,username,success){
  db('login')
  .insert({user_id:user, time_of_signin:time, provided_username:username, signin_success:success});
}

let date = new Date;
db('login')
.insert({user_id:1, provided_username:'hello', signin_success:false})
.returning('*')
.then(data =>{
  console.log(data);
});

// db('users')
// .insert({first_name:'jon', last_name:'hello', email:'hhh@hhh.hhh', user_name:'hell', password:'1234', })
// .returning('*')
// .then(data =>{
//   console.log(data);
// });


module.exports = {
  addLogin,
}
