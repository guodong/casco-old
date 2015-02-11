Ext.define('casco.view.manage.Participants', {
	extend: 'Ext.window.Window',

	alias: 'widget.participants',
	requires: [],
	resizable: true,
	maximizable: true,
	modal: true,
	title: 'Edit Participants',
	width: 600,
	height: 550,
	autoScroll: true,
	layout: {
		type: 'border'
	},
	initComponent: function() {
		var me = this;
		var users = Ext.create('casco.store.Users');
		users.load();
		me.addSources = function(record){
			me.participants.loadData([{realname: record.data.realname,id: record.data.id}], true);
		};
		me.items = [{
			xtype: 'grid',
			region: 'west',
			store: users,
			width: 400,
	        split: true,
	        collapsible: true,
			autoScroll: true,
			title: 'Avaliable Users',
		    columns: [
				        { text: 'account',  dataIndex: 'account'},
				        { text: 'realname',  dataIndex: 'realname', flex: 1},
				        { text: 'jobnumber',  dataIndex: 'jobnumber'}
		    ],
		    listeners : {
		        itemdblclick: function(view, record, item, index, e, eOpts){
					me.addSources(record);
				}
		    }
		}, {
			xtype: 'grid',
			region: 'center',
			itemId: 'sources',
			title: 'Selected Users',
		    columns: [
				        { text: 'realname',  dataIndex: 'realname', flex: 1},
		    ],
		    store: me.participants,
		    listeners : {
		        itemdblclick: function(dv, record, item, index, e) {
		        	me.participants.remove(record);
		        }
		    }
		}];
		me.dockedItems = [{
			xtype: 'toolbar',
			dock: 'bottom',
			style: {
				background: '#eee'
			},
			items: ['->', {
				text: 'Ok',
				glyph: 0xf112,
				scope: me,
				handler: this.destroy
			}]
		}];
		
		me.callParent(arguments);
	}
});