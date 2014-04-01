"use strict";

var taskController = require('src/controllers/task');
var taskValidate = require('src/validate/task');

module.exports = function() {
	return [
		{
			method: 'GET',
			path: '/tasks/{task_id}',
			config : {
				handler: taskController.findByID,
				validate: taskValidate.findByID
			}
		},
		{
			method: 'GET',
			path: '/tasks',
			config : {
				handler: taskController.find,
				validate : taskValidate.find
			}
		},
		{
			method: 'POST',
			path: '/tasks',
			config : {
				handler : taskController.insert,
				validate : taskValidate.insert
			}
		},
		{
			method: 'PUT',
			path: '/tasks/{task_id}',
			config : {
				handler: taskController.update,
				validate : taskValidate.update
			}
		},
		{
			method: 'DELETE',
			path: '/tasks/{task_id}',
			config : {
				handler: taskController.delete,
				validate : taskValidate.delete
			}
		}
	];
}();