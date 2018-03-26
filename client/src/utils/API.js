import axios from "axios";
const BASEURL = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
const APIKey = '&key=AIzaSyDoZuuTh9HoRZ2BAiEK4-WWzG8sAflqwKw'

export default {
  getLocation: function(query) {
    return axios.get(BASEURL + query + APIKey);
  },

  // Gets all books
  getUser: function() {
    return axios.get("/api/user");
  },
  // Gets the book with the given id
  getUserId: function(id) {
    return axios.get("/api/user/" + id);
  },
  // Deletes the book with the given id
  deleteUser: function(id) {
    return axios.delete("/api/user/" + id);
  },
  // Saves a book to the database
  saveUser: function(userData) {
    return axios.post("/api/user", userData);
  }
};
