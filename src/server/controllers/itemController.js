var express = require('express');
var _ = require('underscore');
var when = require('when');

var controller = express.Router();

controller
  // TODO
  .get('/items', function(req, res) {
    req.connector.Item.findAll()
    .then(function(items) {
      var plainItems = _.map(items, function(item) {
        return item.get({ plain: true });
      });
      res.status(200).send(plainItems);
    })
    .catch(function() {
      res.status(404).send('not found');
    });
  })
  // TODO
  .get('/item/:itemId', function(req, res) {
    req.connector.Item.findById(req.params.itemId)
    .then(function(item) {
      var plainItem = item.get({ plain: true });
      res.status(200).send(plainItem);
    })
    .catch(function() {
      res.status(404).send('not found');
    });
  })
  // TODO
  .post('/item', function(req, res) {
    var title = req.body.title;
    if (!title) {
      res.status(400).send('bad request');
      return;
    }

    req.connector.Item.create({ title: title })
    .then(function(item) {
      var plainItem = item.get({ plain: true });
      res.status(200).send(plainItem);
    })
    .catch(function() {
      res.status(404).send('not found');
    });
  })
  // TODO
  .put('/item/:itemId', function(req, res) {
    var title = req.body.title;
    if (!title) {
      res.status(400).send('bad request');
      return;
    }

    var title = req.body.title;
    req.connector.Item.findById(req.params.itemId)
    .then(function(item) {
      return item.update({ title: title });
    })
    .then(function() {
      res.status(200).send();
    })
    .catch(function() {
      res.status(404).send('not found');
    });
  })
  // TODO
  .delete('/item/:itemId', function(req, res) {
    req.connector.Item.findById(req.params.itemId)
    .then(function(item) {
      return item.destroy();
    })
    .then(function() {
      res.status(200).send();
    })
    .catch(function() {
      res.status(404).send('not found');
    });
  })
  // TODO
  .get('/item/:itemId/tags', function(req, res) {
    req.connector.Item.findById(req.params.itemId)
    .then(function(item) {
      return item.getTags();
    })
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
  // TODO
  .post('/item/:itemId/tag/:tagId', function(res, req) {
    return when.all([
      req.connector.Item.findById(req.params.itemId),
      req.connector.Tag.findById(req.params.tagId)
    ])
    .then(function(entities) {
      var item = entities[0];
      var tag = entities[1];
      return item.addTag(tag);
    })
    .then(function() {
      res.status(200).send();
    })
    .catch(function() {
      res.status(404).send('not found');
    });
  })
  // TODO
  .delete('/item/:itemId/tag/:tagId', function(req, res) {
    return when.all([
      req.connector.Item.findById(req.params.itemId),
      req.connector.Tag.findById(req.params.tagId)
    ])
    .then(function(entities) {
      var item = entities[0];
      var tag = entities[1];
      return item.removeTag(tag);
    })
    .then(function() {
      res.status(200).send();
    })
    .catch(function() {
      res.status(404).send('not found');
    });
  });

module.exports = controller;
