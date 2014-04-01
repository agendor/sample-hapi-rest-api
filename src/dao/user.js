"use strict";

var db = require('src/middleware/db');

function UserDAO(){};
UserDAO.prototype = (function(){

	return {
		find: function find(email, password, callback) {
			var values = [
				email,
				password
			];

			var sql = 'SELECT userId, email, pass FROM user AS u '+
				'WHERE u.email = ? ' +
				'AND u.pass = ?';

			db.query({
				sql : sql, 
				values: values,
				callback : callback
			});
		}
	};
})();

var userDAO = new UserDAO();
module.exports = userDAO;