"use strict";

var Hapi = require('hapi');
var server = new Hapi.Server();
var mixins = require('src/util/mixins');


describe('Mixins capitalize', function () {
	describe('when is a lower case word', function() {
		it('should return firt letter capitalized', function () {
			var word = 'first';
			var capitalized = mixins.capitalize(word);
			capitalized.should.be.eql('First');
		});
	});
	describe('when is a lower case and dashed word', function() {
		it('should return firt letter of both words capitalized without dash', function () {
			var word = 'first-second';
			var capitalized = mixins.capitalize(word);
			capitalized.should.be.eql('FirstSecond');
		});
	});
	describe('when is a lower case word with 2 dashes', function() {
		it('should return firt letter fo all words capitalized without dash', function () {
			var word = 'first-second-third';
			var capitalized = mixins.capitalize(word);
			capitalized.should.be.eql('FirstSecondThird');
		});
	});
});