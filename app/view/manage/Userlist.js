Ext.define('casco.view.manage.Userlist', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.userlist',
	requires: ['casco.view.manage.Useradd'],
	id: 'userlist',
	itemId: 'userlist',
	initComponent: function() {
		var me = this;
		var store = Ext.create('casco.store.Users');
		store.load();
		me.store = store;
		me.tbar = [{
			text: 'Add User',
			glyph: 0xf067,
			handler: function() {
				var win = Ext.create('widget.useradd', {store: store});
				win.show();
			}
		}, {
			text: 'Delete User',
			glyph: 0xf068,
			handler: function() {

			}
		}];
		me.callParent();
	},
	columns: [{
		text: "account",
		dataIndex: "account",
		width: 130
	}, {
		text: "realname",
		dataIndex: "realname",
		width: 100
	}, {
		text: "jobnumber",
		dataIndex: "jobnumber",
		width: 130
	}],
    listeners : {
        itemdblclick: function(dv, record, item, index, e) {
        	var win = Ext.create('widget.useradd');
            win.down('form').loadRecord(record);
            win.show();
        }
    }
})