"use strict";

var Hapi = require('hapi');
var server = new Hapi.Server();

var should = require('should');
var paginationLinks = require('../../src/util/pagination-links.js');

describe('Create pagination links', function () {
	describe('when the options object is not sent', function () {
		it('should not return any link', function () {
			paginationLinks.create().should.be.empty;
		});
	});
	describe('and there is no more data to return', function () {
		it('should not return any link', function () {
			var options = {
				url : "http://api.com/resource/",
				page : 1,
				perPage : 10,
				totalCount : 1
			};
			paginationLinks.create(options).should.be.empty;
		});
	});
	describe('when there is more data to return', function () {

		describe('and the request is for the first page', function () {
			var options = {
				url : "http://api.com/resource/",
				page : 1,
				perPage : 10,
				totalCount : 30
			};
			it('should return a link for the first page', function () {
				var links = paginationLinks.create(options);
				should.not.exist(links.first);
			});
			it('should not return a link for the previous page', function () {
				var links = paginationLinks.create(options);
				should.not.exist(links.prev);
			});
			it('should return a link for the next page', function () {
				var expected = "http://api.com/resource/?page=2&per_page=10";
				var links = paginationLinks.create(options);
				links.next.should.eql(expected);
			});
			it('should return a link for the last page', function () {
				var expected = "http://api.com/resource/?page=3&per_page=10";
				var links = paginationLinks.create(options);
				links.last.should.eql(expected);
			});
		});

		describe('and the request is for the second page page', function () {
			var options = {
				url : "http://api.com/resource/",
				page : 2,
				perPage : 10,
				totalCount : 50
			};
			it('should return a link for the first page', function () {
				var expected = "http://api.com/resource/?page=1&per_page=10";
				var links = paginationLinks.create(options);
				links.first.should.eql(expected);
			});
			it('should return a link for the previous page', function () {
				var expected = "http://api.com/resource/?page=1&per_page=10";
				var links = paginationLinks.create(options);
				links.prev.should.eql(expected);
			});
			it('should return a link for the next page', function () {
				var expected = "http://api.com/resource/?page=3&per_page=10";
				var links = paginationLinks.create(options);
				links.next.should.eql(expected);
			});
			it('should return a link for the last page', function () {
				var expected = "http://api.com/resource/?page=5&per_page=10";
				var links = paginationLinks.create(options);
				links.last.should.eql(expected);
			});
		});

		describe('and the request is for the 7th of 10 page', function () {
			var options = {
				url : "http://api.com/resource/",
				page : 7,
				perPage : 20,
				totalCount : 200
			};
			it('should return a link for the first page', function () {
				var expected = "http://api.com/resource/?page=1&per_page=20";
				var links = paginationLinks.create(options);
				links.first.should.eql(expected);
			});
			it('should return a link for the previous page', function () {
				var expected = "http://api.com/resource/?page=6&per_page=20";
				var links = paginationLinks.create(options);
				links.prev.should.eql(expected);
			});
			it('should return a link for the next page', function () {
				var expected = "http://api.com/resource/?page=8&per_page=20";
				var links = paginationLinks.create(options);
				links.next.should.eql(expected);
			});
			it('should return a link for the last page', function () {
				var expected = "http://api.com/resource/?page=10&per_page=20";
				var links = paginationLinks.create(options);
				links.last.should.eql(expected);
			});
		});

		describe('and the request is for the last page', function () {
			var options = {
				url : "http://api.com/resource/",
				page : 5,
				perPage : 20,
				totalCount : 100
			};
			it('should return a link for the first page', function () {
				var expected = "http://api.com/resource/?page=1&per_page=20";
				var links = paginationLinks.create(options);
				links.first.should.eql(expected);
			});
			it('should return a link for the previous page', function () {
				var expected = "http://api.com/resource/?page=4&per_page=20";
				var links = paginationLinks.create(options);
				links.prev.should.eql(expected);
			});
			it('should not return a link for the next page', function () {
				var links = paginationLinks.create(options);
				should.not.exist(links.next);
			});
			it('should not return a link for the last page', function () {
				var links = paginationLinks.create(options);
				should.not.exist(links.last);
			});
		});
	});
});