"use strict";

var Hapi = require('hapi');
var Q = require('q');
var taskDAO = require('src/dao/task');
var _ = require('underscore');

var ReplyHelper = require('src/controllers/reply-helper');

function TaskController(){};
TaskController.prototype = (function(){

	return {
		findByID: function findByID(request, reply) {

			var helper = new ReplyHelper(request, reply);
			var params = request.plugins.createControllerParams(request.params);

			taskDAO.findByID(params, function (err, data) {
				helper.replyFindOne(err, data);
			});
		},
		find: function find(request, reply) {

			var helper = new ReplyHelper(request, reply);
			var params = request.plugins.createControllerParams(request.query);

			taskDAO.find(params, function (err, data) {
				helper.replyFind(err, data);
			});
		},
		insert: function insert(request, reply) {

			var helper = new ReplyHelper(request, reply);
			var params = request.plugins.createControllerParams(request.payload);
			
			var insert = Q.denodeify(taskDAO.insert);
			var findByID = Q.denodeify(taskDAO.findByID);

			insert(params).then(function insert(data) {

				var result = data;
				if (result.exception) {
					reply(Hapi.error.badRequest(result.exception));
					done();
				} 
				params.taskId = result.insertId;
				return findByID(params);

			}).then(function (data) {

				var location = helper.url + request.path + '/' + params.taskId;

				reply(data[0])
					.type('application/json')
					.code(201)
					.header('Location', location);

			}).catch(function (err) {
				reply(Hapi.error.badImplementation(err));
			});
		},
		update: function update(request, reply) {

			var helper = new ReplyHelper(request, reply);
			var payload = request.plugins.createControllerParams(request.payload);
			var params = request.plugins.createControllerParams(request.params);

			_.extend(params, payload);
			
			var update = Q.denodeify(taskDAO.update);
			var findByID = Q.denodeify(taskDAO.findByID);

			update(params).then(function update(data) {

				var result = data;
				if (result.exception) {
					reply(Hapi.error.badRequest(result.exception));
					done();
				}
				return findByID(params);

			}).then(function (data) {

				reply(data[0])
					.type('application/json');

			}).catch(function (err) {
				reply(Hapi.error.badImplementation(err));
			});

		},
		delete: function (request, reply){

			var helper = new ReplyHelper(request, reply);
			var params = request.plugins.createControllerParams(request.params);

			taskDAO.delete(params, function (err, data) {
				helper.replyDelete(err, data);
			});
		}
	}
})();

var taskController = new TaskController();
module.exports = taskController;