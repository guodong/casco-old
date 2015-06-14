/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('casco.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.main',
    requires: ['casco.store.TreeDocuments'],
    data: {
        name: 'casco'
    },
    
    stores: {
    	st: Ext.create('casco.store.TreeDocuments', {
    		proxy: {
    			extraParams: {
    				project_id: localStorage.project_id
    			}
    		}
    	})
    }

    //TODO - add data, formulas and/or methods to support your view
});