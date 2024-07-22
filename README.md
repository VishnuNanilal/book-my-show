## Book My Show

### Description

This project is a show booking playform where distributors/show owners can list their shows. Once approved by admins, the same will be publicly available to be booked by users. Users can buy tickets and boo seats of the show.

## Table of Contents

1. [Project Title and Description](#project-title-and-description)
2. [Table of Contents](#table-of-contents)
3. [Installation Instructions](#installation-instructions)
4. [Language and Tools](#languages-and-tools)
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

# Languages and tools

- [React](https://react.dev/)
- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [Axios](https://axios-http.com/docs/intro)    
- [MongoDB](https://www.mongodb.com/docs/atlas/)
- [Stripe](https://docs.stripe.com/)

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

## Structure of website and Usage Instructions

### User Registration and Authentication

1. **Sign Up**
    - Navigate to the Sign Up page.
    - Fill in your details: email and password.
    - Submit the form to create your account.

2. **Sign In**
    - Navigate to the Sign In page.
    - Enter your email and password.
    - Submit the form to log in to your account.

### Home page

- Once signed in, you will be to the home page where you can view all the available shows from which you can book.

### Show page
- This page gives an overview of the show and a list of theaters with he currently selected shows. Each theater in the list shows the available times.

### Theater seat selection
- This page shows all the available seats for the current show and current theater. Non available ones are greyed out.
- The bottom has a make payment option which calculates the total money based on the no. of seats and show.

### Bookings
- Lists all the shows that the user has booked.

### Business
- Lists all the theater and shows owned by the user and current shows' requests to be added to those theaters.
(Future addition: Can be made specific to users that has are registered as business.)

### Show Requests (Specific to admins)
- Lists all the show requests that both show owner and theater has agreed upon for final approval.

### Profile
- Profile page for viewing and updating current user info.

### Using the site

1. **Add New Show**
    - Go to the 'Business' section in the user menu.
    - Fill in the details of your show.
    - Submit the form to list your property for sale.

2. **Adding show to theater**
    - Owned show can be added to selected theaters in "Add show section."
    - Requests will be made to owned of all selected theaters which they can approve.
    - Theater owners can approve the show and will be sent to admin for final approval.

3. **Making show public for user booking**
    - Admin approved shows will be public for user to book.

4. **Booking a show**
    - Users can select a show which enlists all the available theaters, from which the time, seats can be booked.
    - Once payment is complete the selected seats will be made unavailable for others and be booked for current user.

## Features
1. Authorization and Authentication.
- Registration and Sign in.
- User and Admin authentication.

2. Movie Display
- Home page displays available shows

3. Movie, Theater, Show
- Features to add a movie, theater and show.

4. Admin privileges - Admin authorizes shows before publicizing.

5. Location - Shows will be displayed based on show availability in user's chosen location.
---

## Future Features
//BACK END 
- [ ] Add here

//FRONT END
- [ ] Add here 

## Contributing

Thank you for your interest in contributing to the Real Estate Bidding Platform! We welcome contributions from the community to help improve this project.

### How to Contribute

1. **Fork the Repository**

    - Go to the project's GitHub page.
    - Click on the 'Fork' button at the top right of the page to create a copy of the repository under your own GitHub account.

2. **Clone the Forked Repository**

    ```bash
    git clone https://github.com/VishnuNanilal/book-my-show.git
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
