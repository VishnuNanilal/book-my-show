## Book My Show

### Description

This project is a show booking playform where distributors/show owners can list their shows. Once approved by admins, the same will be publicly available to be booked by users. Users can buy tickets and boo seats of the show.

## Table of Contents

1. [Project Title and Description](#project-title-and-description)
2. [Table of Contents](#table-of-contents)
3. [Installation Instructions](#installation-instructions)
4. [Usage Instructions](#usage-instructions)
5. [Features](#features)
6. [Contributing](#contributing)
7. [License](#license)
8. [Contact Information](#contact-information)
---

## Installation Instructions

### Prerequisites

- React (v10.x or later)
- Node.js (v12.x or later)
- MongoDB (v4.x or later)
- Git

### Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/VishnuNanilal/book-my-show.git
   cd real-estate-project

2. Install server and client dependencies

    ```
    cd server
    npm install
    ```
    ```bash
    cd ../client
    npm install

3. Environment variables

    Create a .env file in server directory and add environment variable in the same strucuture as defined in .env.example

4. Run server and client

    ```bash
    cd server
    nodemon index.js
    ```
    ```bash
    cd client
    npm run start


## API Endpoints

### User
- **/user/register**
  - Method: POST
  - Payload: `{email:"", password:""}`

- **/user/sign-in**
  - Method: POST
  - Payload: `{email:"", password:""}`

- **/user/authorize**
  - Method: POST

- **/user/${userid}**
  - Method: GET

- **/user/${userid}/update/profile/**
  - Method: PATCH

- **/user/${userid}/update/${place}**
  - Method: PATCH

- **/user/${userid}/add-movie/${movieid}**
    - Method: PATCH

- **/user/${userid}/delete-movie/${movieid}**
    - Method: PATCH

- **/user/${userid}/add-theater/${theaterid}**
    - Method: PATCH

- **/user/${userid}/delete-theater/${theaterid}**
    - Method: PATCH

- **/user/${userid}/add-show-req**
    - Method: PATCH

- **/user/${userid}/remove-show-req**
    - Method: PATCH

### Theater
- **/theater/add-theater**
    - Method: POST
    - payload: {
        name: "",
        location: "",
        userId: user._id,
        screen_num: 0,
        seat_num: 0,
        timings: [],
        price: 0
    }

- **/theater/all-theaters**
    - Method: GET

- **/theater/${theaterid}**
    - Method: GET

- **/theater/${theaterid}**
    - Method: PATCH
    - payload: payload data

- **/theater/${theaterid}**
    - Method: DELETE

### Show
- **/show/add-show**
    - Method: POST
    - Payload: { userId: user._id, 
    movieId: formData.selectedMovie, 
    theaterIds: [] 
    }

- **/show/${showid}**
    - Method: GET

- **/show/unapproved**
    - Method: GET

- **/show/approved**
    - Method: GET

- **/show/approve/${showid}**
    - Method: PATCH

- **/show/${showid}**
    - Method: DELETE

- **/show/add-theater/${showid}**
    - Method: PATCH

### Movie
- **/movie/add-movie**
    - Method: POST
    - Payload: {
        name: "",
        poster: null,
        release_date: new Date(),
        rating: 0,
        genre: "",
        director: ""
    }

- **/movie/all-movies**
    - Method: GET

- **/movie/${movieid}**
    - Method: GET

- **/movie/${movieid}**
    - Method: PATCH

- **/movie/${movieid}**
    - Method: DELETE

### Booking
- **/bookings/make-payment**
    - Method: POST
    - Payload: {token, amount}

- **/bookings/book-show**
    - Method: POST
    - Payload: {
                //userid, showid, seatnum, transactionid
                userid: user._id,
                showid,
                theaterid,
                time, 
                bookedSeats: selectedSeats,
                transactionid: paymentResponse.data //transaction id
            }

- **/bookings/book-show**
    - Method: POST
    - Payload: {
                //userid, showid, seatnum, transactionid
                userid: user._id,
                showid,
                theaterid,
                time, 
                bookedSeats: selectedSeats,
                transactionid: paymentResponse.data //transaction id
            }

- **/bookings/get-bookings/${userid}**
    - Method: GET

## Usage Instructions

### User Registration and Authentication

1. **Sign Up**
    - Navigate to the Sign Up page.
    - Fill in your details: email and password.
    - Submit the form to create your account.

2. **Sign In**
    - Navigate to the Sign In page.
    - Enter your email and password.
    - Submit the form to log in to your account.

### User Dashboard

- Once signed in, you will be redirected to the user dashboard.
- Here, you can see an overview of your activities, such as Bookings.

### Listing a Property (For Sellers)

1. **Add New Property**
    - Go to the 'Add Property' section in the seller dashboard.
    - Fill in the details of your property, such as name, price, description, location, boundary points, area, minimum increment, closing time, and closing date.
    - Submit the form to list your property for sale.

2. **Property Approval**
    - After listing, your property will be in a 'pending' status.
    - An admin will review and approve the property, changing its status to 'approved'.
    - You can then publish the property for bidding.

### Bidding on Properties (For Buyers)

1. **View Properties**
    - Browse through the listed properties on the home page or in the 'Recent Properties' section.
    - Click on a property to view its details.

2. **Place a Bid**
    - Enter your bid amount, which must be higher than the current highest bid by at least the minimum increment.
    - Submit your bid.

3. **Monitor Bids**
    - Keep track of your bids in the 'My Bids' section.
    - You will receive notifications if you are outbid.

### Admin Functions

1. **Approve Properties**
    - Navigate to the admin dashboard.
    - Review the properties listed in the 'pending' status.
    - Approve or reject properties based on your criteria.

2. **Manage Bids**
    - Approve or reject bid results once the bidding time is over.
    - Change the status of properties from 'bidPending' to 'sold'.

### Notifications

- You will receive notifications about important events such as property approvals, new bids, and bid results.
- Check the 'Notifications' section for updates.

### Account Settings

- Go to the 'Settings' section to update your account information, such as your email, phone number, and password.

### Logging Out

- Click on the 'Logout' button to securely sign out of your account.

## Features
1. Authorization and Authentication.
- Registration and Sign in.
- User and Admin authentication.

2. Map display
- Marking and viewing properties
- Differently colors and shades based on property status.

3. Bidding - platform for bidding

4. Admin privileges - Admin authorizes properties before and after bid.

5. Recent Feed - Recently accepted properties displayed on recent feed.
---

## Future Features
//BACK END
- [x] seller should be able to create property. Default status: "pending"
- [x] All pending property should be visible by admin for approval. status: pending->approved
- [x] All approved property should be publishable by seller as bid. 
- [x] Once bid time is over, status: approved->bidPending.
- [x] All bidPending property should be approvable by admin: status: bidPending->sold
 
- [x] Include bidder's info in the property. (user_id)
- [x] Include ways to update buyer_id and new price in property,
- [x] components to buy a property
- [x] Dislay the time left in front end
- [x] Implement a time after which bid closes
- [x] Implement admin who can authorize the ownership of a newly added property.
- [x] Implement a client side newly marked property sales.(Recent properties)

- [ ] When time is over the payment should be made and marked land owner info should be changed to bought person. Relevant payments should be carried out.

//FRONT END
- [x] Sign In and Register Modal
- [x] Home page should have :
        left half tabs
        Right hald map
- [x] Left half tabs should have: Recent properties, Add new property, 
- [x] User Dashboard: Displays user-specific information such as active bids, listed properties, etc.
- [x] Seller Dashboard: Specialized dashboard for sellers to manage their properties and see bidding statuses.
- [x] Admin Dashboard: Specialized dashboard for admins to approve new properties, bids, and perform other admin tasks. 
- [x] Notifications: Displays user notifications about bids, property approvals, etc.
- [ ] Settings: Allows users to change account settings.


### Buyer Menu Options
- [x] Dashboard: Overview of user activities, including active bids and won properties.
- [x] My Bids: List of properties the user has placed bids on.

### Status of each bid.
- [ ] Notifications: Alerts and updates about bid statuses and other activities.
- [ ] Profile: View and edit personal information.
- [ ] Settings:Account settings and preferences.
- [x] Logout:Sign out of the account.

### Seller Menu Options
- [x] Dashboard:Overview of seller activities, including listed properties and ongoing bids.
- [x] My Properties:List of properties the seller has listed.
- [x] Add Property:Form to create and submit a new property listing.
- [ ] Notifications:Alerts about bids and property approvals.
- [ ] Profile:View and edit personal information.
- [ ] Settings:Account settings and preferences.
- [ ] Logout:Sign out of the account.

### Admin Menu Options
- [x] Admin Dashboard:Overview of platform activities, pending approvals, and user statistics.
- [x] Options to approve or reject new property listings.
- [x] Approve Bids:List of bid results awaiting approval.Options to approve or reject bid results.
- [x] Manage Users:View and manage user accounts.Options to deactivate or delete users.
- [ ] Reports/Analytics:Access to various reports and analytics about platform usage.
- [ ] Settings:Admin-specific settings and preferences.
- [x] Logout:Sign out of the admin account.

### Additional Menu Options
- [x] Support/Help:FAQs and contact options for customer support.
- [x] About Us:Information about the platform and the team.
- [x] Terms of Service:Legal information and terms of use.
- [x] Privacy Policy:Information about data privacy and user rights.

## Contributing

Thank you for your interest in contributing to the Real Estate Bidding Platform! We welcome contributions from the community to help improve this project.

### How to Contribute

1. **Fork the Repository**

    - Go to the project's GitHub page.
    - Click on the 'Fork' button at the top right of the page to create a copy of the repository under your own GitHub account.

2. **Clone the Forked Repository**

    ```bash
    git clone https://github.com/VishnuNanilal/real-estate-project.git
    cd real-estate-project
    ```

3. **Create a New Branch**

    - Create a new branch for your feature or bugfix.

    ```bash
    git checkout -b feature/your-feature-name
    ```

4. **Make Changes**

    - Implement your feature or bugfix.
    - Ensure your code follows the project's coding standards and conventions.
    - Write or update tests as necessary.

5. **Commit Your Changes**

    - Commit your changes with a clear and descriptive commit message.

    ```bash
    git add .
    git commit -m "Add detailed description of your changes"
    ```

6. **Push to Your Fork**

    - Push your changes to your forked repository.

    ```bash
    git push origin feature/your-feature-name
    ```

7. **Submit a Pull Request**

    - Go to the original repository on GitHub.
    - Click on 'Pull Requests' and then 'New Pull Request'.
    - Select your branch from the dropdown menu and create the pull request.
    - Provide a detailed description of your changes in the pull request.

### Guidelines

- **Code Style**: Please ensure your code adheres to the project's coding style.
- **Testing**: Write tests for new features and ensure existing tests pass.
- **Commits**: Write clear and concise commit messages.
- **Pull Requests**: Provide a detailed description of your changes and the problem they solve.

We appreciate your contributions and thank you for helping improve the Real Estate Bidding Platform!

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Contact Information

This project is maintained by *VISHNU NANILAL PANICKER*

- phone number: +91 7306365503
- email: vishnunlal@gmail.com


=====================================


# MERN BOOK MY SHOW 

A show booking site built using MERN stack including Axios for client-server communication and Stripe for payment functionality.

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
- Restful Requests handled in the Back End using *Express*
- Database implemented on *MongoDB*

# QuickStart Guide

- Clone the entire repository using `git clone https://github.com/VishnuNanilal/book-my-show.git `
- Install modules in both server and client folders using `npm install`
- Set up your Database link, JWT key, Stripe key as DB_link, jwt_secret_key, stripe_key respectively in .env file.
- Run server side using `cd .\server\` `nodemon index.js`
- Run client side using `npm run start`
- While deploying make sure to include .env variable NODE_ENV='production'

### Development environment
> Start client using `npm run client`. (Moves to client folder and runs `npm run start`)

> Start server using `npm run server`. (Moves to server and runs `nodemon index.js`)

### Production environment
> For deploying use `npm run build` and `npm run start` from root folder

- The project is live on render.com [link](https://book-my-show-b6j8.onrender.com/home)

# Languages and tools

- [React](https://react.dev/)
- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [Axios](https://axios-http.com/docs/intro)    
- [MongoDB](https://www.mongodb.com/docs/atlas/)
- [Stripe](https://docs.stripe.com/)
