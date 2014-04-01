"use strict";

module.exports.create = function(options) {
	if (!options) return {};

	options.lastPage = Math.ceil(options.totalCount / options.perPage);

	var pagination = new Pagination(options);
	var pagesLinkBuilder = new PagesLinkBuilder(options);

	if (pagination.hasMoreData()) {
		if (pagination.isAfterFirst()) {
			pagesLinkBuilder.setFirstPage();
			pagesLinkBuilder.setPrevPage();
		}
		if (pagination.isBeforeLast()) {
			pagesLinkBuilder.setNextPage();
			pagesLinkBuilder.setLastPage();
		}
	}

	return pagesLinkBuilder.links;
};


function Pagination(options) {
	this.options = options;
};

Pagination.prototype = (function() {
	return {
		hasMoreData : function() {
			return this.options.totalCount > this.options.perPage;
		},
		isBeforeLast : function() {
			return this.options.page < this.options.lastPage;
		},
		isAfterFirst : function() {
			return this.options.page > 1;
		},
		getOptions : function() {
			return this.options;
		},
		getLastPage : function() {
			return this.options.lastPage;
		}
	};
})();


function PagesLinkBuilder(options) {
	this.options = options;
	this.links = {};
};

PagesLinkBuilder.prototype = (function() {

	var buildLink = function(url, page, perPage) {
		return url + "?page=" + page + "&per_page=" + perPage;
	};

	return {
		setFirstPage : function() {
			this.links.first = buildLink(this.options.url, 1, this.options.perPage);
		},
		setNextPage : function() {
			this.links.next = buildLink(this.options.url, (this.options.page + 1), this.options.perPage);
		},
		setPrevPage : function() {
			this.links.prev = buildLink(this.options.url, (this.options.page - 1), this.options.perPage);
		},
		setLastPage : function() {
			this.links.last = buildLink(this.options.url, this.options.lastPage, this.options.perPage);
		},
		getLinks : function() {
			return this.links;
		}
	};
})();
