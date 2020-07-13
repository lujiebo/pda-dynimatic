sap.ui.define([
  "com/shunyu/pdaUi5/controller/BaseController",
  "sap/ui/model/json/JSONModel",
  "sap/m/MessageToast",
], function (BaseController, JSONModel, MessageToast) {
  "use strict";

  return BaseController.extend("com.shun.pdaUi5.controller.Pda", {

    onInit: function () {
      this.noList = new Array(); //存已读单据号
      this.mockList = new Array(); //模拟的扫描单据号
      var oModel = this.getModel("ZPDASCAN_CDS");
      var path = "/Z_SY_D_PDAScan";
      var that = this;
      oModel.setUseBatch(false);
      oModel.read(path, {
        success: function (oData, oResponse) {
          console.log(oData);
          $.each(oData.results, function (i, item) {
            that.mockList.push(item.REF_DOC_NO);
          });
        },
        error: function (oError) {
          console.log(oError);
        }
      });
    },
    //加载单据信息
    loadInfo: function (oInfo) {
      var page = this.getView().byId("page");
      var simpleform = new sap.ui.layout.form.SimpleForm("form" + oInfo.REF_DOC_NO, {
        editable: true,
        layout: "ResponsiveGridLayout",
        content: [
          new sap.m.Label({
            text: "单据编号",
            layoutData: new sap.ui.layout.GridData({
              span: "XL2 L2 M2 S3"
            })
          }),
          new sap.m.Text({
            text: oInfo.REF_DOC_NO,
            layoutData: new sap.ui.layout.GridData({
              span: "XL10 L10 M10 S9"
            })
          }),
          new sap.m.Label({
            text: "物料号",
            layoutData: new sap.ui.layout.GridData({
              span: "XL2 L2 M2 S2"
            })
          }),
          new sap.m.Text({
            text: oInfo.MATERIAL,
            layoutData: new sap.ui.layout.GridData({
              span: "XL4 L4 M2 S2"
            })
          }),
          new sap.m.Text({
            text: oInfo.MAKTX,
            layoutData: new sap.ui.layout.GridData({
              span: "XL6 L6 M8 S8"
            })
          }),
          new sap.m.Label({
            text: "发出仓库",
            layoutData: new sap.ui.layout.GridData({
              span: "XL2 L2 M2 S3"
            })
          }),
          new sap.m.Text({
            text: oInfo.MOVE_STLOC,
            layoutData: new sap.ui.layout.GridData({
              span: "XL4 L4 M4 S3"
            })
          }),
          new sap.m.Label({
            text: "待入仓库",
            layoutData: new sap.ui.layout.GridData({
              span: "XL2 L2 M2 S3"
            })
          }),
          new sap.m.Input({
            value: oInfo.STEG_LOC,
            layoutData: new sap.ui.layout.GridData({
              span: "XL4 L4 M4 S3"
            })
          }),
          new sap.m.Label({
            text: "数量",
            layoutData: new sap.ui.layout.GridData({
              span: "XL2 L2 M2 S3"
            })
          }),
          new sap.m.Text({
            text: oInfo.ENTRY_QNT,
            layoutData: new sap.ui.layout.GridData({
              span: "XL4 L4 M4 S3"
            })
          }),
          new sap.m.Label({
            text: "计量单位",
            layoutData: new sap.ui.layout.GridData({
              span: "XL2 L2 M2 S3"
            })
          }),
          new sap.m.Text({
            text: oInfo.MEINS,
            layoutData: new sap.ui.layout.GridData({
              span: "XL4 L4 M4 S3"
            })
          }),
          new sap.m.Label({
            text: "批次",
            layoutData: new sap.ui.layout.GridData({
              span: "XL2 L2 M2 S3"
            })
          }),
          new sap.m.Text({
            text: oInfo.BATCH,
            layoutData: new sap.ui.layout.GridData({
              span: "XL4 L4 M4 S3"
            })
          }),
          new sap.m.Label({
            text: "供应商/客户",
            layoutData: new sap.ui.layout.GridData({
              span: "XL2 L2 M2 S3"
            })
          }),
          new sap.m.Text({
            text: oInfo.VENDOR + oInfo.CUSTOMER,
            layoutData: new sap.ui.layout.GridData({
              span: "XL4 L4 M4 S3"
            })
          }),
          new sap.m.Label({
            text: "殊库存标记",
            layoutData: new sap.ui.layout.GridData({
              span: "XL2 L2 M3 S4"
            })
          }),
          new sap.m.Text({
            text: oInfo.SPEC_STOCK,
            layoutData: new sap.ui.layout.GridData({
              span: "XL4 L4 M3 S2"
            })
          }),
          new sap.m.Label({
            text: "描述",
            layoutData: new sap.ui.layout.GridData({
              span: "XL2 L2 M3 S3"
            })
          }),
          new sap.m.Text({
            text: oInfo.DESCRIPTION,
            layoutData: new sap.ui.layout.GridData({
              span: "XL4 L4 M3 S3"
            })
          }),
        ]
      });
      this.loadPackItems(simpleform);
      page.insertContent(simpleform,1);
    },
    //加载包装信息
    loadPackItems: function (simpleform) {
      var oModel = this.getModel("ZPDASCAN_CDS");
      var inPrueflos = this.getView().byId("inPrueflos").getValue();
      oModel.setUseBatch(false);
      var path = "/Z_SY_D_PDAScan('" + inPrueflos + "')";
      var that = this;
      var itemPath = path + "/to_item1";
      oModel.read(itemPath, {
        success: function (oData, oResponse) {
          $.each(oData.results, function (i, item) {
            var label1 = new sap.m.Label({
              text: "包装号",
              layoutData: new sap.ui.layout.GridData({
                span: "XL2 L2 M2 S3"
              })
            });
            var oInput1 = new sap.m.Text({
              text: item.exidv,
              layoutData: new sap.ui.layout.GridData({
                span: "XL4 L4 M4 S3"
              })
            });
            var label2 = new sap.m.Label({
              text: "包装容量",
              layoutData: new sap.ui.layout.GridData({
                span: "XL2 L2 M2 S3"
              })
            });
            var oInput2 = new sap.m.Text({
              text: item.vemng,
              layoutData: new sap.ui.layout.GridData({
                span: "XL4 L4 M4 S3"
              })
            });
            simpleform.addContent(label1);
            simpleform.addContent(oInput1);
            simpleform.addContent(label2);
            simpleform.addContent(oInput2);
          });
        },
        error: function (oError) {
          console.log(oError);
        }
      });
    },
    onScan: function (oEvent, sPrueflos) {
      //模拟扫描获取数据
      sPrueflos = this.mockList[Math.floor(Math.random() * this.mockList.length)];
      var inPrueflos = this.getView().byId("inPrueflos");
      inPrueflos.setValue(sPrueflos);

    },
    onNewForm: function (oEvent) {
      var oModel = this.getModel("ZPDASCAN_CDS");
      var inPrueflos = this.getView().byId("inPrueflos").getValue();
      oModel.setUseBatch(false);
      var path = "/Z_SY_D_PDAScan('" + inPrueflos + "')";
      var that = this;
      if (this.noList.indexOf(inPrueflos) >= 0) {
        MessageToast.show("请勿重复录入单据!");
      } else {
        oModel.read(path, {
          success: function (oData, oResponse) {
            that.loadInfo(oData);
            that.noList.push(inPrueflos);
            console.log(that.noList);
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