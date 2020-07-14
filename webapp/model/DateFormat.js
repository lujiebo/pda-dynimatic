sap.ui.define([
], function () {
	"use strict";

	return {
		init: function () {

		},
		dateToMs:function(sdate){
			var uDate = new Date(sdate).getTime();
			return uDate;
		},
		transformTimestamp:function(timestamp) {
			  var date = new Date(timestamp);
			  var Y = date.getFullYear() + '-';
			  var M =(date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
			  var D = date.getDate() + ' ';
			  var dateString = Y + M + D ;
			  return dateString;
		},
		transformDate:function(sdate){
			var uDate = new Date(sdate).getTime();
			var date = new Date(uDate);
			var Y = date.getFullYear() + '-';
			var M =(date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
		    var D = date.getDate() + ' ';
			var dateString = Y + M + D ;
			return dateString;
		}
	};

});