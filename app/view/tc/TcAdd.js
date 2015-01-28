Ext.define('casco.view.tc.TcAdd', {
	extend: 'Ext.window.Window',

	alias: 'widget.tcadd',
	requires: ['casco.view.document.DocTree', 'casco.view.tc.TcStep',
			'casco.view.document.DocumentController',
			'casco.view.tc.TcAddForm', 'casco.view.tc.TcController',
			'casco.store.Rss', 'casco.view.tc.source.Add'],
	controller: 'tc',
	resizable: true,
	maximizable: true,
	modal: true,
	title: 'Add Tc Item',
	width: 800,
	height: 550,
	autoScroll: true,
	layout: {
		type: 'border'
	},

	initComponent: function() {
		var me = this;
		var st = new casco.store.Rss();
		st.load({
			params: {
				document_id: 1
			}
		});
		me.ss = st;
		Ext.apply(me, {
			dockedItems: [{
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
			}],

			items: [{
				xtype: 'tcaddform',
				reference: 'TcAddform',
				region: 'center',
				bodyPadding: 10
			}]
		});
		me.callParent(arguments);
	}
});