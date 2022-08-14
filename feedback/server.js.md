**Things that were done well**

1. Your server isn't too cluttered. I'm a big fan of clean code, and it's not too bad. Just clean up some comments.
2. I really like how you used sessions. Big fan of authentication, and I'm a big fan of sessions in general. They're a classic authentication method, but they work well, hence they've been around for a long time.
3. Speaking about the clean code, I'm mostly referring to the fact you had your functions that dealt with the db in an external file. Good to keep things organized.
4. line 88 - Good use of asynchronous call. You don't need to wait for `addLogin` to finish, so you don't `await` it. That's good.

**Things that could be improved**

1.  line 3 - not necessary.
2.  line 33 - not sure why the cookie's maxAge is so short.
3.  line 40 - gotta be careful with this one! The structure of your server only works when there's only 1 user using it. What happens when another user logs in and wants to see their wallet? The global session variable gets overridden, and when the previous user wants to update their balance, they end up updating the balance of the other user... Oy vey!
4.  line 82 - Again, you start getting issues when you have more than 1 user using your site. The way that express works is once you've defined a route in your server, it's stuck that way until you restart the server, so once the first guy logs in successfully, the `/home/userinfo` route is always going to show his data! And it's not even authenticated, since afterwards anyone can go to that route. It's too much to fully explain here, but we can go over it some time.
5.  line 115 - Although line 88 was good, I'd be careful with what you did in this line. Are you sure you wouldn't want to make sure the update was successful before returning a response?
6.  The `/portfolio` route isn't really protected. I can get there without being logged in.
