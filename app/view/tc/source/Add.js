Ext.define('casco.view.tc.source.Add', {
	extend: 'Ext.window.Window',

	alias: 'widget.tc.source.add',
	requires: ['casco.view.main.ItemTree'],
	controller: 'tc',
	resizable: true,
	maximizable: true,
	modal: true,
	title: 'Add Tc Sources',
	width: 600,
	height: 550,
	autoScroll: true,
	layout: {
		type: 'border'
	},
	initComponent: function() {
		var me = this;
		
		me.items = [{
			xtype: 'itemtree',
			region: 'west',
			width: 200,
	        split: true,
	        collapsible: true,
			autoScroll: true,
			dockedItems: [],
			viewConfig: null
		},{
			xtype: 'panel',
			region: 'center'
		}];
		me.dockedItems = [{
			xtype: 'toolbar',
			dock: 'bottom',
			style: {
				background: '#eee'
			},
			items: ['->', {
				text: 'Save',
				glyph: 0xf0c7,
				listeners: {
					click: 'createTc'
				}
			}, {
				text: 'Cancel',
				glyph: 0xf112,
				scope: me,
				handler: this.destroy
			}]
		}];
		
		me.callParent(arguments);
	},
	doHide: function() {
		this.destroy();
	}
});