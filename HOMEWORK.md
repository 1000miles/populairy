# Homeworks

This project is based on the [Women Tech Makers Berlin - JavaScript Crash Course 2019](https://github.com/WTMBerlin/jscc2019)

## Homework for week 1

- [x] 1) Create a GitHub account
- [x] 2) Come up with your very own project idea that you will build throughout the course (you can change this afterwards)
- [x] 3) Create at least 2 different classes and several instances for these classes for your projects
- [x] 4) create at least 3 different interactions between said classes
- [x] 5) Publish your code as an `index.js` file to your GitHub account

**Video: [Women Techmakers Berlin JS Crash Course Vol 3 Lecture 1 — JavaScript & ES6 Fundamentals](https://www.youtube.com/watch?v=xCr2v8I4x-I)**

## Homework for week 2

- [x] 1) Create a node.js project by running `npm init`
- [x] 2) Split your classes from last week's homework into different files. *Export* them as *modules* and *require* them in your `index.js`
- [x] 3) Search npmjs.com for a library that could fit to your project.
- [x] 4) Install that library to your project using `npm install` and `require` that library in your code.
- [x] 5) Using the `database.js` module introduced this week, save one or more of your classes into JSON files.
- [x] 6) DO NOT SUBMIT `node_modules` folder. `package.json` is sufficient.

**Video: [Women Techmakers Berlin JavaScript Crash Course Vol 3 Lecture 2 — Node.js Ecosystem & Basics](https://www.youtube.com/watch?v=k7F_ZkGh1RI)**

## Homework for week 3

- [x] 1. Add base-service.js to your application
- [x] 2. Ensure your database operations are asynchronous
- [x] 3. Add at least one service for one of your models to abstract away add / find / findAll / delete operations
- [x] 4. Make use of these service(s) in your index.js

**Video: [Women Techmakers Berlin JS Crash Course Vol 3 Lecture 3 — Promises and Async Programming](https://www.youtube.com/watch?v=pMXeY7Vz1no)**

## Homework for week 4

- [x] 1. Extend your NodeJS application by implemeting a web server using Express.js framework
- [x] 2. Expose the capabilities of your application through URLs
- [x] 3. Make sure to add as many URLs as possible for creating / fetching / deleting resources
- [x] 4. Add at least one URL which does a complex operation. Examples: Make a user attend a meetup, make a user comment on a movie
- [x] 5. Add layout.pug file in your application under views folder
- [x] 6. Display the data in the browser using pug files. Extend your pug templates from layout.pug.

**Video: [Women Techmakers Berlin JS Crash Course Vol 3 Lecture 4 — HTTP APIs with Express.js](https://www.youtube.com/watch?v=ISjAVIy2VEA)**

## Homework for week 5

- [x] Convert all of your models into mongoose models
- [x] Implement all of your business logic in services
- [x] Expose all of your business logic through routes
- [x] Add a readme on which axios.get and axios.post calls to make, in order to run your application

**Video: [Women Techmakers Berlin JS Crash Course Vol 3 Lecture 5 — Adding a MongoDB Datastore](https://www.youtube.com/watch?v=mRQ-I5E-QHc)**

## Homework for week 6

- [x] Install [ava](https://www.npmjs.com/package/ava), [nyc](https://www.npmjs.com/package/nyc), [supertest](https://www.npmjs.com/package/supertest) for testing
- [x] Config `package.json` with:

	```js
  "scripts": {
   	"test": "ava --verbose --watch",
    "test-coverage": "nyc ava --verbose"
  },
	```
- [ ] Create tests for all routes and ensure all tests are covered by 100%

**Video: [Women Techmakers Berlin JS Crash Course Vol 3 Lecture 6 — Testing](https://www.youtube.com/watch?v=sQVhP5q5CVY)**

## Homework for week 7

- [ ] Watch the videos from lesson 7
- [ ] Create a simple front-end for all your pages with Vue

**Video Part 1: [Women Techmakers Berlin JS Crash Course Vol 3 Lecture 7 — The Frontend](https://www.youtube.com/watch?v=PcK1ASlm1OU)**

**Video Part 2: [Women Techmakers Berlin JS Crash Course Vol 3 Lecture 7 part 2 — Vue Router](https://www.youtube.com/watch?v=Rzjmh4vvrQo)**

## Homework for week 8

- [ ] Install [Docker](https://docs.docker.com/install/)
- [ ] Setup Docker for heroku deployment
- [ ] Sign up for a [Heroku](http://herokuapp.com/) account and instll [heroku-cli](https://devcenter.heroku.com/articles/heroku-cli)
- [ ] Deploy your app using Heroku

### Useful links:

- [WTMB Welcome Guide - Docker](https://github.com/WTMBerlin/jscc-welcomeguide#docker)
- [WTMB Welcome Guide - Heroku](https://github.com/WTMBerlin/jscc-welcomeguide#heroku)
- [WTMB Week 8 Instructions](https://github.com/WTMBerlin/jscc2019/blob/master/week-8/README.md)
- [Heroku Container Registry & Runtime (Docker Deploys)](https://devcenter.heroku.com/articles/container-registry-and-runtime)
