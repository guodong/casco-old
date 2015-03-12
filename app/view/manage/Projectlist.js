Ext.define('casco.view.manage.Projectlist', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.projectlist',
	requires: ['casco.view.manage.Projectadd'],
	initComponent: function() {
		var me = this;
		var store = Ext.create('casco.store.Projects');
		store.load();
		me.store = store;
		me.tbar = [{
			text: 'Create Project',
			glyph: 0xf067,
			handler: function() {
				var win = Ext.create('casco.view.manage.Projectadd', {store: store});
				win.show();
			}
		}];
		me.callParent();
	},
	columns: [{
		text: "name",
		dataIndex: "name",
		width: 130
	},{
		text: "description",
		dataIndex: "description",
		width: 130
	},{
		text: "participants",
		dataIndex: "participants",
		width: 130,
		renderer: function(ps){
			var users = [];
			for(var i in ps){
				users.push(ps[i].realname)
			}
			return users.join(',');
		}
	}, {
		text: "created time",
		dataIndex: "created_at",
		width: 180
	}],
    listeners : {
        itemdblclick: function(dv, record, item, index, e) {
        	var win = Ext.create('casco.view.manage.Projectadd', {project: record});
            win.down('form').loadRecord(record);
            win.show();
        }
    }
})