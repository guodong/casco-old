/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */
Ext.define('casco.Application', {
    extend: 'Ext.app.Application',
    
    name: 'casco',
    requires: ['casco.view.main.Main', 'casco.view.auth.Login', 'casco.store.TreeDocuments', 'casco.view.manage.Manage'],

    stores: [
             'Projects','TreeDocuments'
    ],
    
    launch: function () {

		var supportsLocalStorage = Ext.supports.LocalStorage, uid;

		if (!supportsLocalStorage) {
			Ext.Msg.alert('notice', 'Your Browser Does Not Support Local Storage');
			return;
		}
		uid = localStorage.getItem("uid");
		
		Ext.widget(uid ? ((localStorage.view == 'manage')?'manage':'app-main') :'login');
    }
});
