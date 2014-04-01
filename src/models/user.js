"use strict";

var _ = require('underscore');
var Joi = require('joi');
var crypto = require('crypto');

function UserModel(){
	this.schema = {
		email: Joi.string().max(255),
		pass: Joi.string().max(255)
	};
};

UserModel.prototype = (function() {
	return {
		encryptPass: function(password) {
			var salt = '1d098an18da7cn';
			var sha1 = crypto.createHash('sha1').update(password).digest('hex') + salt;
			return crypto.createHash('sha256').update(sha1).digest('hex');
		}
	};
})();

module.exports = UserModel;