# MERN BOOK MY SHOW 

A show booking site built using MERN stack including Axios and Stripe for payment functionality.

Functionalities

1. Theaters owners can add their theaters and accept request for shows from Show owners. 
2. Show distributors/producers can add their movies/tv-shows etc to the theaters.
3. Admins approve the distributor-theater owner collaborated shows.
4. Users can pay and book Admin approved shows.

**features :**
- Front End created using *React*
- Global state management system using *Redux* 
- Client-Server RESTFUL communication implemented using *axios*
- Back End implemented in *NodeJS*.
- Requests from Front End received by Back End with *Express*
- Database implemented on *MongoDB*

# QuickStart Guide

- Clone the entire repository using `git clone https://github.com/VishnuNanilal/book-my-show.git`
- Install modules in both server and client folders using `npm install`
- Set up your Database link, JWT key, Stripe key as DB_link, jwt_secret_key, stripe_key respectively in .env file.
- Run server side using `cd .\server\` `nodemon index.js`
- Run client side using `npm run start`

- *development environment*
> Start client using `npm run client`
> Start server using `npm run server`

# Demo

- The project is live on render.com [link](https://book-my-show-b6j8.onrender.com/home)


# Languages and tools

- [React](https://react.dev/)
- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [Axios](https://axios-http.com/docs/intro)    
- [MongoDB](https://www.mongodb.com/docs/atlas/)