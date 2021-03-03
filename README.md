# Luci Project

## Server

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

## Starting interface

This is a standard create-react-app; you can run it with:

`npm start`

## Running the application

1. On one tab, navigate to './api' and run:

  `npm start`

2. Open another tab, navigate to './interface' and run:

  `npm start`
