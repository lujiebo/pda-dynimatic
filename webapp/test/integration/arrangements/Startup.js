sap.ui.define([
  "sap/ui/test/Opa5"
], function(Opa5) {
  "use strict";

  return Opa5.extend("com.shunyu.pdaUi5.test.integration.arrangements.Startup", {

    iStartMyApp: function () {
      this.iStartMyUIComponent({
        componentConfig: {
          name: "com.shunyu.pdaUi5",
          async: true,
          manifest: true
        }
      });
    }

  });
});
