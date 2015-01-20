/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('casco.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    requires: [
        'Ext.window.MessageBox',
        'casco.view.tc.Tc',
        'casco.view.rs.Rs'
    ],

    alias: 'controller.main',

    onLogout: function () {
        Ext.Msg.confirm('Confirm', 'Are you sure to logout?', function (choice) {
            if (choice === 'yes') {
                localStorage.removeItem('uid');

                this.getView().destroy();

                Ext.widget('login');
            }
        }, this);
    },
    swProject: function() {
		this.getView().destroy();
		Ext.widget('project');
	},
	seldoc: function(view, record, item, index, e, eOpts){
		var json = record.data;
    	if(!json.leaf) return;
		var tabs = this.lookupReference('main');
		var tab = tabs.child('#tab-' + json.id);
		localStorage.setItem("doc_id", json.id);
		if(!tab){
			var type = json.type;
			tab = tabs.add({
				itemId: 'tab-' + json.id,
				id: 'tab-'+json.id,
				xtype: type,
				title: json.name,
				doc_id: json.id,
				closable: true
			});
		}

		tabs.setActiveTab(tab);
	},
	testing: function(){
		var tabs = this.lookupReference('main');
		var tab = tabs.child('#tab-testing');
		if(!tab){
			tab = tabs.add({
				itemId: 'tab-testing',
				id: 'tab-testing',
				xtype: 'test',
				title: 'testing',
				closable: true
			});
		}

		tabs.setActiveTab(tab);
	}
});
