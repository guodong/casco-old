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
        'casco.view.rs.Rs',
        'casco.view.testing.Test'
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
		if(tab){
			tabs.remove(tab);
		}
		var document = casco.model.Document;
		casco.model.Document.load(json.id, {
			success: function(record){
				tab = tabs.add({
					itemId: 'tab-' + json.id,
					id: 'tab-'+json.id,
					xtype: json.type,
					title: json.name,
					document_id: record.get('id'),
					document: record,
					closable: true
				});
				tabs.setActiveTab(tab);
			}
		});

	},
	testing: function(){
//		var win = Ext.create('casco.view.testing.Config');
//		win.show();
//		return;
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
