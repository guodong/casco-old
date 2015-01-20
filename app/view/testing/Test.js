Ext.define('casco.view.testing.Test', {
    extend : 'Ext.form.Panel',
    alias : 'widget.test',
    requires: ['casco.view.tc.TcAdd', 'casco.store.Tcs', 'casco.view.tc.TcEdit'],

    allowDeselect: true,

    viewModel : 'main',
    initComponent: function(){
    	var me = this;
    	
    	me.callParent(arguments);
    },
	bodyPadding: '10',
	width: '100%',
	initComponent: function(){
		var me = this;
		me.ss = new casco.store.Tcs();
		me.ss.load({
			params: {
				document_id: 5
			}
		})
		this.items = [{
	        fieldLabel: 'Build Version',
	        xtype: 'textfield',
	    },{
	        fieldLabel: 'Test case',
	        xtype: 'textareafield',
	        xtype : 'combobox',
			name : 'sources',
			editable : false,
			multiSelect : true,
			displayField : 'title',
			valueField : 'id',
			allowBlank : false,
			queryMode : 'local',
			store : me.ss,
			anchor : '100%',
	    },{
			xtype : 'combobox',
			name : 'test_method',
			editable : false,
			fieldLabel : 'Result',
			displayField : 'text',
			valueField : 'value',
			allowBlank : false,
			store : Ext.create('Ext.data.Store', {
				fields : [ 'text', 'value' ],
				data : [ {
					"text" : "Passed",
					"value" : "EP"
				}, {
					"text" : "Failed",
					"value" : "EG"
				} ]
			})
		}];
		this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'bottom',
            style: {background: '#eee'},
            items: ['->',
                {
                    text: 'Save',
                    glyph: 0xf0c7,
                    listeners: {
                        click: 'createTc'
                    }
                },{
                    text: 'Cancel',
                    glyph: 0xf112,
                    scope: me,
                    handler : this.destroy
                }
            ]
        }]
		this.callParent();
	}
})