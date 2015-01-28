Ext.define('casco.view.tc.TcAddForm', {
	extend : 'Ext.form.Panel',

	alias : 'widget.tcaddform',
	requires : [ 'casco.view.document.DocTree',
			'casco.view.tc.TcStep',
			'casco.view.document.DocumentController',
			'casco.store.TcSteps'
	],
	controller : 'tc',
	autoScroll : true,

	initComponent : function() {
		var me = this;
		var st = new casco.store.Rss();
		st.load({
			params : {
				document_id : 1
			}
		});
		me.ss = st;
		me.sources = Ext.create('Ext.data.Store', {
			fields:['title', 'id']
		});
		me.items = [ {
			xtype : 'form',
			reference : 'TcAddform',
			autoScroll : true,
			items : [ {
				anchor : '100%',
				fieldLabel : 'Id',
				name : 'title',
				labelAlign : 'top',
				msgTarget : 'under',
				xtype : 'textfield'
			}, {
				anchor : '100%',
				fieldLabel : 'Description',
				name : 'dsc',
				labelAlign : 'top',
				msgTarget : 'under',
				xtype : 'textarea'
			}, {
				xtype : 'combobox',
				name : 'test_method',
				anchor : '100%',
				editable : false,
				fieldLabel : 'Test Methods',
				labelAlign : 'top',
				displayField : 'text',
				valueField : 'value',
				allowBlank : false,
				store : Ext.create('Ext.data.Store', {
					fields : [ 'text', 'value' ],
					data : [ {
						"text" : "EP",
						"value" : "EP"
					}, {
						"text" : "EG",
						"value" : "EG"
					} ]
				})
			}, {
				xtype: 'button',
	            glyph: 0xf067,
				text: 'Add Sources',
				handler: function(){
					var wd = Ext.create("casco.view.tc.source.Add", {
						sources: me.sources
					});
					wd.show();
				}
			},{
				xtype: 'grid',
				region: 'center',
				itemId: 'sources',
			    columns: [
			        { text: 'Sources',  dataIndex: 'title', flex: 1}
			    ],
			    store: me.sources
			},{
				anchor : '100%',
				fieldLabel : 'Pre condition',
				name : 'pre_condition',
				labelAlign : 'top',
				msgTarget : 'under',
				xtype : 'textarea'
			}, {
				xtype : 'tcstep',
				reference : 'mgrid',
				id: 'mgrid'
			} ]

		} ];
		me.callParent(arguments);
	}
});