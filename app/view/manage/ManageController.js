Ext.define('casco.view.manage.ManageController', {
    extend: 'Ext.app.ViewController',

    requires: [
               'casco.view.manage.Userlist'
    ],

    alias: 'controller.manage',

    createuser: function () {
    	var view = this.getView();
    	var self = this;
    	var form = this.lookupReference('useraddform');
    	var user = view.user?view.user:Ext.create('casco.model.User');
    	user.set(form.getValues());
    	user.save({
    		callback: function(){
    			Ext.Msg.alert('Message', 'User manage successfully.', function(){
    				var t = Ext.ComponentQuery.query("#tab-userlist")[0];
    				if(!view.user)t.store.add(user);
    				form.up("window").destroy();
		    	});
    		}
    	});
    },
    createProject : function() {
		var view = this.getView();
		var project = view.project?view.project:Ext.create('casco.model.Project');
		var form = view.down('form');
		var data = form.getValues(); //提交的数据
		data.document_id = view.document_id;
		data.vatstrs = [];
		view.vatstrs.each(function(s){
			data.vatstrs.push({ 
				name: s.data.name
			});
		});
		data.participates = [];
		view.participants.each(function(s){
			data.participates.push(s.getData());
		});
		project.set(data);
		project.save({
			callback: function() {
				form.up("window").destroy();
				var t = Ext.ComponentQuery.query("#tab-projectlist")[0];
				t.store.reload();
			}
		});
	},
	seldoc: function(view, record, item, index, e, eOpts){
		var json = record.data;
		if(!record.data.leaf) return;
		var tabs = this.lookupReference('main');
		var tab = tabs.child('#tab-' + json.id);
		if(!tab){
			tab = tabs.add({
				itemId: 'tab-' + json.id,
				id: 'tab-'+json.id,
				xtype: json.id,
				title: json.text,
				closable: true
			});
		}

		tabs.setActiveTab(tab);
	}
});
