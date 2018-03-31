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
    console.log("userData from login", userData);
    return axios.post("/api/user/login", userData)
  },

  updateUser: function(userData) {
    console.log("userData from login", userData);
    return axios.put("/api/user/", userData)
  },

  // Deletes user with given id
  deleteUser: function(id) {
    return axios.delete("/api/user/" + id);
  },
  // Saves a user on sign up
  saveUser: function(userData) {
    console.log("UserData API file", userData);
    return axios.post("/api/user", userData);
  }
};
