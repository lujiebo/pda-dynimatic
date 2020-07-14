sap.ui.define([], function () {
	"use strict";
	return {
		isnotnull:function (ele) {
			if(typeof ele==='undefined'){//先判断类型
				return false;
			  }else if(ele==null){
				return false;
			  }else if(ele==''){
				return false;
			  }
			  return true;
		}
	};
});
