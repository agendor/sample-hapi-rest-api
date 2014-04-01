"use strict";

var db = require('src/middleware/db');

function TaskDAO(){};
TaskDAO.prototype = (function(){

	return {
		findByID: function findByID(params, callback) {

			var values = [
				params.taskId,
				params.userId
			];

			var sql = "select taskId, description from task"+
					" where taskId = ?"+
					" and userId = ?";

			db.query({
				sql : sql, 
				values: values,
				callback : callback
			});
		},
		find: function find(params, callback) {

			var values = [
				params.userId
			];

			var sql = "select userId, taskId, description from task"+
					" where userId = ?";

			db.query({
				sql : sql, 
				values: values,
				callback : callback
			});
		},
		insert: function insert (params, callback) {

			var values = [
				params.userId,
				params.description
			];

			var sql = "insert into task "+
					" (userId, description)"+
					" values (?,?)";

			db.query({
				sql : sql, 
				values: values,
				callback : callback
			});
		},
		update: function update (params, callback) {

			var values = [
				params.description,
				params.userId,
				params.taskId
			];

			var sql = "update task "+
					" set description = ? "+
					" where userId = ? "+
					" and taskId = ? ";

			db.query({
				sql : sql, 
				values: values,
				callback : callback
			});
		},
		delete: function (params, callback) {

			var values = [
				params.taskId,
				params.userId
			];

			var sql = "delete from task"+
					" where taskId = ?"+
					" and userId = ?";

			db.query({
				sql : sql, 
				values: values,
				callback : callback
			});
		},
	};
})();

var taskDAO = new TaskDAO();
module.exports = taskDAO;
