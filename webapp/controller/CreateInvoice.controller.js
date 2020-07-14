sap.ui.define([
	"com/shunyu/pdaUi5/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"com/shunyu/pdaUi5/model/Util"
], function(BaseController,JSONModel,Util) {
	"use strict";

	return BaseController.extend("com.shunyu.pdaUi5.controller.CreateInvoice", {
		onInit: function() {
			this.oInvoice = new JSONModel();
			this.getView().setModel(this.oInvoice, "invoice");
			var oRouter = this.getRouter();
			oRouter.getRoute("createInvoice").attachPatternMatched(this.onRouteMatched, this);

			this.oPageJsonModel = new JSONModel();
			this.getView().setModel(this.oPageJsonModel, "page");


			// Attaches validation handlers
			// sap.ui.getCore().attachValidationError(function (oEvent) {
			// 	oEvent.getParameter("element").setValueState(sap.ui.core.ValueState.Error);
			// });

			// sap.ui.getCore().attachValidationSuccess(function (oEvent) {
			// 	oEvent.getParameter("element").setValueState(sap.ui.core.ValueState.None);
			// });
		},

		onRouteMatched: function(oEvent) {
			console.log(oEvent.getParameter("arguments"))
			this._sTicketFrom = oEvent.getParameter("arguments").invoicefrom;
		},
		onOkPress: function(oEvent) {
			this.getRouter().navTo(this._sTicketFrom, {}, true);
		},
		onNavBack: function(oEvent) {
			//TODO need know end trip
			this.getRouter().navTo(this._sTicketFrom, {}, true);
		},
		onLoadInfo: function (oEvent) {
			var invoiceNo = oEvent.getSource().getValue();
			var oModel = this.getModel("ZPDASCAN_CDS");
			oModel.setUseBatch(false);
			var path = "/Z_SY_D_PDAScan('" + invoiceNo + "')";
			var that = this;
			if (1==0) {
			  MessageToast.show("请勿重复录入单据!");
			} else {
			  oModel.read(path, {
				success: function (oData, oResponse) {
					var sc = "";//供应商和客户的取值
					if(Util.isnotnull(oData.VENDOR))
						sc = oData.VENDOR;
					if(Util.isnotnull(oData.CUSTOMER))
						sc = oData.CUSTOMER;	
					oData.SC = sc;
					that.oInvoice.setData(oData);
					// console.log(that.oInvoice)
				//   that.loadInfo(oData);
				//   that.noList.push(inPrueflos);
				//   console.log(that.noList);
				},
				error: function (oError) {
				  var msg = "请输入有效单据！";
				  MessageToast.show(msg);
				}
			  });
			}
		}
		
	});
});
