"use strict";

var UserModel = require('src/models/user');
var userDAO = require('src/dao/user');
var Joi = require('joi');

module.exports = function(username, password, callback) {

	var userModel = new UserModel();
	var cryptedPassword = userModel.encryptPass(password);

	userDAO.find(username, cryptedPassword, function(err, credentials) {
		if (err) return callback(err, false);

		var isValid = validate(credentials[0]);

		callback(null, isValid, credentials[0]);
	});
};

function validate(credentials) {
	credentials = credentials || {};
	var schema = {
		userId: Joi.number().integer().required(),
		email: Joi.string().required()
	};

	var err = Joi.validate(credentials, schema, {allowUnknown:true});
	return err === null;
}