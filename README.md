# Lagalt-frontend
This is the front-end part of our case work at Experis accelerated Learning.

This is an application that lets you find and connect with creative people and join their projects.
It also lets you create your own projects were people can join in to help you were you might be lacking in knowledge.

# Run
Use these commands to start lagalt.

```bash
git clone https://github.com/nielsenchristoffer93/lagalt-frontend.git
```
```bash
cd lagalt-frontend/
```
```bash
npm install
```

```bash
npm start
```
To start the chat go to the chat and run npm start

```bash
cd server
```

```bash
npm start
```

The applications authentication runs on a deployed instance of keycloak wich might take a while to start up.

In the src/services/index.js you need to set the environment variables to match your urls.

The backend of this application can be found here: https://github.com/nielsenchristoffer93/lagalt-backend

# Heroku

The deployed application can be found at: https://lagalt-frontend-gbg.herokuapp.com/
It might take a few minutes to start up, give it time.
