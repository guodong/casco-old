Ext.define('casco.view.rs.vat.Add', {
	extend: 'Ext.window.Window',

	alias: 'widget.rs.vat.add',
	requires: ['casco.view.main.ItemTree'],
	resizable: true,
	maximizable: true,
	modal: true,
	title: 'Add Vat',
	width: 600,
	height: 550,
	autoScroll: true,
	layout: {
		type: 'border'
	},
	initComponent: function() {
		var me = this
		me.addSources = function(record){
			if(record.data.type != 'item'){
				return;
			}
			me.vat.loadData([{tag: record.data.name,id: record.data.item_id}], true);
		};
		me.items = [{
			xtype: 'itemtree',
			region: 'west',
			width: 200,
	        split: true,
	        collapsible: true,
			autoScroll: true,
			listeners: {
				itemdblclick: function(view, record, item, index, e, eOpts){
					me.addSources(record);
				}
			}
		},{
			xtype: 'grid',
			region: 'center',
		    columns: [
		        { text: 'Vat',  dataIndex: 'tag', flex: 1}
		    ],
		    store: me.vat,
		    listeners : {
		        itemdblclick: function(dv, record, item, index, e) {
		        	me.sources.remove(record);
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