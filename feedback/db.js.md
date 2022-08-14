**Things that were done well**
Once again, like I said in the feedback on your server file, good you separated these utility/database functions from the main file. Good to keep your code organized.

**Things to improve**

-   In your db connection, (not a big deal here but) in general all database connection configuration should be kept in environment variables, since they contain sensitive data.
-   Should return something from `addLogin` function too, just in case you ever want to check on whether your attempt to record a login was successful.
-   `checkUserId` should be `getUserIdByUsername` or something like that.
-   Don't understand the `.then` in `checkPassword` function. Could just do:
    ```js
    function checkPassword(username, password) {
        return db('users').select('*').where({ user_name: username, password: password });
    }
    ```
    no?
-   Should show the SQL tables you made as well, so I could recreate them. Can't really test what you did without seeing that too. ;)
