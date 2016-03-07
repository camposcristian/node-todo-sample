##Todo App (MIT License)

Simple redis backed todo app.

##Install Node and Redis

Go to http://nodejs.org and install NodeJS

Go to http://redis.io/download and install Redis

##Run Locally

Make sure your redis server is running, you can run the following command to start it up:

    redis-server

Install all the dependencies:

    npm install (you may need to prefix this with sudo if you're on Mac)

Run the app:

    node server.js

Then navigate to `http://localhost:3000`

##Signing up, and deploying to Heroku

###Documentation

From heroku.com, click Documentation, then click the Getting Started button, then click Node.js from the list of options on the left...which will take you here: https://devcenter.heroku.com/articles/nodejs

Install Heroku toolbelt from here: https://toolbelt.heroku.com/

Sign up via the website (no credit card required).

Login using the command line tool:

    heroku login

Create your heroku app:

    heroku create

Add redis to your app

    heroku addons:add redistogo:nano

For heroku, the `redisPort`, `redisMachine`, `redisAuth` values in `secret.js` are not used (the Redis connection in Heroku is provided by an enviornment variable `process.env.REDISTOGO_URL`

Git deploy your app:

    git push heroku master

note: **if you add lib/secret.js to your .gitignore it will not be deployed and the app will not run**. Ideally (once you get the hang of deploying this app), you'll want to move all the information in secret.js to environment variables in your production environment, for information on getting and setting environment variables for heroku use `heroku help config`

Here is what secret.js may look like after migrating everything over to environment variables:

    module.exports = {
        "consumerKey": process.env.consumerKey,
        [...]
    }

Assign a dyno to your app:

    heroku ps:scale web=1

Open the app (same as opening it in the browser):

    heroku open

And your app should be up on Heroku.
