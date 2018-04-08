import axios from "axios";
const BASEURL = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
const APIKey = '&key=AIzaSyDoZuuTh9HoRZ2BAiEK4-WWzG8sAflqwKw'

export default {
  getLocation: function(query) {
    return axios.get(BASEURL + query + APIKey);
  },

  // Gets all users
  getUser: function() {
    return axios.get("/api/user");
  },
  // Gets a user with the given id
  getUserId: function(id) {
    return axios.get("/api/user/" + id);
  },

  checkUser: function(userData) {
    return axios.post("/api/user/login", userData)
  },

  updateUser: function(id, userData) {
    return axios.put("/api/user/"+ id, userData)
  },


  // Saves a user on sign up
  saveUser: function(userData) {
    return axios.post("/api/user", userData);
  }
};
