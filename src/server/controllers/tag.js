// TODO

/*
var express = require('express');
var _ = require('underscore');

function jsonifyTag(tag) {
  return _.pick(tag, 'id', 'name');
}

var controller = express.Router();

controller
  .get('/tags', function(req, res) {
    var Tag = req.connector.Tag;
    Tag.find()
    .then(function(tags) { res.status(200).send(_.map(tags, jsonifyTag)); })
    .catch(function() { res.status(404).send('not found'); });
  })

  .get('/tag/:tagId', function(req, res) {
    var Tag = req.connector.Tag;
    var id = req.params.tagId;

    Tag.findById(id)
    .then(function(tag) { res.status(200).send(jsonifyTag(tag)); })
    .catch(function() { res.status(404).send('not found'); });
  })

  .post('/tag', function(req, res) {
    var Tag = req.connector.Tag;
    var name = req.body.name;

    if (!name) {
      res.status(400).send('bad request');
      return;
    }

    Tag.create({ name: name })
    .then(function(tag) { res.status(200).send(jsonifyTag(tag)); })
    .catch(function() { res.status(500).send('internal error'); });
  })

  .put('/tag/:tagId', function(req, res) {
    var Tag = req.connector.Tag;
    var id = req.params.tagId;
    var name = req.body.name;

    if (!name) {
      res.status(400).send('bad request');
      return;
    }

    Tag.findByIdAndUpdate(id, { name: name })
    .then(function(tag) { res.status(200).send(jsonifyTag(tag)); })
    .catch(function() { res.status(404).send('not found'); });
  })
  // TODO
  .delete('/tag/:tagId', function(req, res) {
    var Tag = req.connector.Tag;
    var id = req.params.tagId;

    req.connector.Tag.findByIdAndRemove(id)
    .then(function() { res.status(200).send(); })
    .catch(function() { res.status(404).send('not found'); });
  });

module.exports = controller;
*/
