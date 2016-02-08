var express = require('express');
var _ = require('underscore');

var controller = express.Router();

controller
  .get('/tags', function(req, res) {
    req.connector.Tag.findAll()
    .then(function(tags) {
      var plainTags = _.map(tags, function(tag) {
        return tag.get({ plain: true });
      });
      res.status(200).send(plainTags);
    })
    .catch(function() {
      res.status(404).send('not found');
    });
  })

  .get('/tag/:tagId', function(req, res) {
    req.connector.Tag.findById(req.params.tagId)
    .then(function(tag) {
      var plainTag = tag.get({ plain: true });
      res.status(200).send(plainTag);
    })
    .catch(function() {
      res.status(404).send('not found');
    });
  })

  .post('/tag', function(req, res) {
    var name = req.body.name;
    if (!name) {
      res.status(400).send('bad request');
      return;
    }

    req.connector.Tag.create({ name: name })
    .then(function(tag) {
      var plainTag = tag.get({ plain: true });
      res.status(200).send(plainTag);
    })
    .catch(function() {
      res.status(404).send('not found');
    });
  })

  .put('/tag/:tagId', function(req, res) {
    console.log('update', req.params.tagId, req.body);
    var name = req.body.name;
    if (!name) {
      res.status(400).send('bad request');
      return;
    }

    req.connector.Tag.findById(req.params.tagId)
    .then(function(tag) {
      return tag.update({ name: name });
    })
    .then(function() {
      res.status(200).send();
    })
    .catch(function() {
      res.status(404).send('not found');
    });
  })

  .delete('/tag/:tagId', function(req, res) {
    console.log('delete tag', req.params.tagId, req.body);
    req.connector.Tag.findById(req.params.tagId)
    .then(function(tag) {
      return tag.destroy();
    })
    .then(function() {
      res.status(200).send();
    })
    .catch(function() {
      res.status(404).send('not found');
    });
  });

module.exports = controller;
