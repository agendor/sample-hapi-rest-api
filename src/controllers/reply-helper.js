"use strict";

var Hapi = require('hapi');
var constants = require('src/config/constants');

var paginationLinks = require('src/util/pagination-links');
var li = require('li');

var _ = require('underscore');

function ReplyHelper(request, reply) {
	this.request = request;
	this.reply = reply;
	this.url = request.headers.host ? 'http://' + request.headers.host : constants.server.defaultHost;
}

ReplyHelper.prototype.replyFindOne = function replyFindOne(err, data) {
	if (err) return this.reply(Hapi.error.badImplementation(err));

	if (data[0]) this.reply(data[0]).type('application/json');
	else this.reply().code(404);
};

ReplyHelper.prototype.replyFind = function replyFind(err, data) {

	if (err) return this.reply(Hapi.error.badImplementation(err));

	var linksHeader = paginationLinks.create({
		url : this.url + this.request.path,
		page : this.request.query.page,
		perPage : this.request.query.perPage,
		totalCount : data.length
	});

	var response = this.reply(data).hold();

	if (!_.isEmpty(linksHeader)) {
		response.header('Link', li.stringify(linksHeader));
	}

	response.type('application/json')
		.header('Total-Count', data.length)
		.send();
};

ReplyHelper.prototype.replyDelete = function replyDelete(err, data) {

	if (err) return this.reply(Hapi.error.badImplementation(err));

	this.reply().code(204);
};

module.exports = ReplyHelper;