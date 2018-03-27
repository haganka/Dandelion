const db = require("../models");

// Defining methods for the userController
module.exports = {
  findAll: function(req, res) {
    console.log("find all route hit")
    db.User
      .find({})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    console.log("find by id route hit!", req.params)
    db.User
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByLogin: function(req, res) {
    console.log("find one route hit!", req.body.email);
    db.User
      .findOne({'email': req.body.email})
      .then(dbModel => res.json(dbModel))
      .catch(err => console.log(err));
  },
  create: function(req, res) {
    console.log("route hit!!!!!", req.body);
    db.User
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => {
        
        console.log(err);
        res.end();
      });
  },
  update: function(req, res) {
    db.User
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.User
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
