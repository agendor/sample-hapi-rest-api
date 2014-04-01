"use strict";

var server = require('index');
var should = require('should');

var taskModel = require('src/models/task');

describe('Task routes', function () {
	describe('GET /tasks', function() {
		var injectOptions = {
			method: 'GET',
			url: 'http://localhost:8000/tasks',
			credentials: {
				userId: 1
			}
		};
		it('should return statusCode 200', function (done) {
			server.inject(injectOptions, function (res) {
				res.statusCode.should.be.eql(200);
				done();
			});
		});
	});
});
