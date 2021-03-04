# Luci Project

## Server

### Installation

1. Navigate to "./api" and run `npm install`
2. Navigate to "./interface" and run `npm install`

### Setting up database

1. Create database "lucidb":

  `CREATE DATABASE IF NOT EXISTS lucidb`

2. Create schema "luci":

  `CREATE SCHEMA IF NOT EXISTS luci`

3. Run migration:

  `npm run migrate`

4. Seed database:

  `npm run seed`

### Starting server

`npm start`

### Testing

`npm run test`

**Note: Running this command will reset your database with seed**

### Linting

`npm run lint`

## Interface

This is a standard create-react-app; you can run it with:

`npm start`

## Running the application

1. On one tab, navigate to './api' and run:

  `npm start`

2. Open another tab, navigate to './interface' and run:

  `npm start`

## Info

This is a generic user management application that allows us to create, delete, and update users. Each user has three fields: name, group, and state. A user can belong to one of three groups: user, marketing, and engineering; that user can either be in a state of active or inactive. We can update any of the fields.

This application uses React on the front end; it uses Redux for state management. Redux allows us to have a single source of truth, meaning we only have one state object. By dispatching an action from a Component, we can change the state. We use the ES6 Fetch API to make HTTP requests.
We abstract out our API calls to a middleware to remove code duplication. Instead of calling fetch inside the action, we return an object with the key 'CALL_API' and the parameters. The middleware will dispatch a REQUEST action before performing any sort of fetching. If the fetch succeeds, it will dispatch a SUCCESS action along with the payload; if it fails, it will dispatch a FAIL action with the error.

We divide up React Components into two sections: Components and Containers. Components are pure components; they do not care about the Redux store or the state since they receive props from the parent Component. Containers are connected to the Redux store; they handle dispatches and state changes. If there is a Component that heavily relies on a specific Container, we put that Component in the same folder as the Container.

We use an array instead of an object to store our users. While the array is slower than an object, we do not have to worry about speed since we do not have much users. If we were to scale this application, we would use an object with the user's id as the key.

We use Node.js with Express as our backend. To access our database, we use an ORM called Prisma. Unlike SQL query builders like pg, Prisma allows us to quickly build our applicaion by abstracting out the queries. We use CRUD operations to access and manipulate our data. We construct our RESTFUL api by prepending /api followed by the entity name. For example /api/users will fetch a collection of users; /api/user/1 will fetch a single user with an id of 1. If a user does not exist, we return a 404 status code.
Instead of using promises, we use async/await for asynchronous operations. While async/await is syntatic sugar for Promises, we can write asynchronous code like it is synchronous code.

One of the most glaring ommissions while building this application is my dependency on an array for listing a collection of users. Arrays are slow; you would have to iterate over it to find a specific user. If I were to scale this application I use use an object instead of an array. That object would have the user's id as the key, and the user object as the value. With an object, looking up a user by id would be constant time.

After building this application, I learned a lot about testing practices. Instead of testing a React Component, I learned to test how the user interacts with the Component instead. By testing how the user interacts with the application, we can get an idea of the user experience.
