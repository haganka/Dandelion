# Dandelion

Dandelion is a full stack web application that allows everyday people to make a delivery wish or grant a delivery wish of another. Users making a wish enter their request, name of the business and delivery location and are soon matched with those who are looking to grant a wish nearby.

## Purpose
The goal of the app is to create a place for everyday people who are not formally associated with a delivery company, to do favors for people nearby who may be in need of cup of coffee or grocery item, without the hassle of using a delivery service and paying outrageous fees.

## Getting Started
To view the live site, visit this link on Heroku:
[Dandelion live site](https://wish-grant.herokuapp.com/)

To run the code, follow these steps:
1. Download the repository zip file
2. At the root, run 'yarn install' in terminal
3. Move into client folder using 'cd client' in terminal
4. In client, run 'yarn install' in terminal
5. Move back to root using 'cd ..' in terminal
6. At the root, run 'yarn start'

## Code Style
JSdoc style commenting

## Built With
This project was built using the MERN stack as well as Firebase for storing real time data
* [React JS](https://reactjs.org/)
* [Node JS](https://nodejs.org/en//)
* [Express JS](https://expressjs.com//)
* [MongoDB](https://www.mongodb.com/)
* [Firebase](https://firebase.google.com/)

## Features
* User login leveraging Firebase authentication
* When a user makes a wish, their entry is stored in Firebase as a new request and Firebase returns grant matches based on their current location and chosen business.
* When a user grants a wish, their entry is stored in Firebase as a new request and Firebase returns wish matches based on their location, chosen business and range they're willing to travel to make the delivery.
* When two users both choose each other, they are alerted of the match.
* Users are able to view all potential matches, incoming requests, outgoing requests and final matches made based on both users choosing each other.
* Once the transaction is complete, both users can mark it as such and rate their experience with the other person.
* On the account page, users can see their rating and all completed wishes and grants.

## Future Ideas (Wishes)
There are quite a few future enhancements I plan to continue working on. These include:
* User making the grant enters an estimated delivery time that is displayed to the person whose wish is being granted.
* Geolocation option. Using geolocation services would improve the user experience so they could choose to avoid entering their exact address location.
* Once geolocation is enabled, incorporating the Google Places API. Using Google Places would help to narrow down the location options for the person who is granting the wish. Based on their current location and business name, they could choose the exact location of the business from a dropdown list of Google-provided addresses.
* Using the Firebase timestamp feature, delete entries in the database after they have been live for five minutes. This would keep old requests that were never picked up from matching with users when they're no longer relevant.

## Collaboration
Please see future ideas and let me know if you'd like to collaborate! I am open to additional ideas as well so would love to hear from you with thoughts.

## Author
* **Kelly Hagan** - [haganka](https://github.com/haganka)

## Acknowledgements
* Background image by Rob Potter from [unsplash.com](https://unsplash.com)

