Ext.define('casco.view.tc.TcAddForm', {
	extend : 'Ext.form.Panel',

	alias : 'widget.tcaddform',
	requires : [ 'casco.view.document.DocTree',
			'casco.view.tc.TcStep',
			'casco.view.document.DocumentController',
			'casco.store.TcSteps'
	],
	controller : 'tc',
	//autoScroll : true,
	width: 'auto',
	initComponent : function() {
		var me = this;
		me.sources = Ext.create('Ext.data.Store', {
			fields:['title', 'id']
		});
		me.steps = Ext.create('Ext.data.Store', {
			model: 'casco.model.TcStep'
		});
		
		me.items = [ {
			xtype : 'form',
			reference : 'TcAddform',
			autoScroll : true,
			items : [ {
				anchor : '100%',
				fieldLabel : 'Tag',
				name : 'tag',
				labelAlign : 'top',
				msgTarget : 'under',
				xtype : 'textfield',
	            allowBlank: false
			}, {
				anchor : '100%',
				fieldLabel : 'Description',
				name : 'description',
				labelAlign : 'top',
				msgTarget : 'under',
				xtype : 'textarea',
	            allowBlank: false
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
				}),
	            allowBlank: false
			},{
				anchor : '100%',
				fieldLabel : 'Pre condition',
				name : 'pre_condition',
				labelAlign : 'top',
				msgTarget : 'under',
				xtype : 'textarea',
	            allowBlank: false
			}, {
				xtype: 'grid',
				region: 'center',
				itemId: 'sources',
				dockedItems: [{
	    	        xtype: 'toolbar',
	    	        dock: 'bottom',
	    	        items: [{
	    	            glyph: 0xf067,
	    	            text: 'Add Sources',
	    	            handler: function(){
	    					var wd = Ext.create("casco.view.tc.source.Add", {
	    						sources: me.sources
	    					});
	    					wd.show();
	    				}
	    	        }]
	    	    }],
			    columns: [
			        { text: 'Sources',  dataIndex: 'tag', flex: 1}
			    ],
			    store: me.sources
			}, {
				xtype : 'tcstep',
				reference : 'mgrid',
				id: 'mgrid',
				store: me.steps
			}],
			

		}];
		me.callParent(arguments);
	}
});