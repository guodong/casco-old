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
				text: 'Add Sources',
				handler: "addSources"
			},{
				xtype : 'combobox',
				name : 'sources',
				anchor : '100%',
				editable : false,
				fieldLabel : 'Sources',
				multiSelect : true,
				labelAlign : 'top',
				displayField : 'title',
				valueField : 'id',
				allowBlank : false,
				queryMode : 'local',
				store : me.ss
			}, {
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