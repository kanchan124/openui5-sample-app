sap.ui.define([
	"sap/ui/Device",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/json/JSONModel"
], function(Device, Controller, Filter, FilterOperator, JSONModel) {
	"use strict";

	return Controller.extend("sap.ui.demo.todo.controller.App", {

		onInit: function() {
			let oView = this.getView();
			this.oSF = oView.byId("searchField");
			this.searchEngine = CoveoHeadless.buildSearchEngine({
				configuration: {...CoveoHeadless.getSampleSearchEngineConfiguration()}
			})
			console.log(this.searchEngine);
			this.buildSearchBox();
			
		},
		buildSearchBox: function () {
            const searchBoxOptions = {
                enableQuerySyntax: true,
                numberOfSuggestions: 5,
                id: "main-searchBox",
                clearFilters: false
            };
            this.searchBox = CoveoHeadless.buildSearchBox(this.searchEngine, {
                options: searchBoxOptions
            });
			this.searchBox.updateText("")
			this.searchBox.submit()
        },
		onSearch: function(oEvent) {
			this.sSearchQuery = oEvent.getSource().getValue();
			if (this.sSearchQuery && this.sSearchQuery.length > 0) {
				this.searchBox.updateText(this.sSearchQuery)
				this.searchBox.submit()
			}
		},

	});

});
