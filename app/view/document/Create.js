Ext.define('Type', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'number'},
        {name: 'type',  type: 'string'},
    ]
});
Ext.define('casco.view.document.Create', {
    extend: 'Ext.window.Window',

    alias: 'widget.document.create',
    uses: [
           'casco.view.document.DocumentController'
    ],
    controller: 'document',
    
    modal: true,
    title: 'Create Document',
    width: 300,
    
    initComponent: function(){
    	var me = this;
    	Ext.apply(me, {
    		dockedItems: [{
                xtype: 'toolbar',
                dock: 'bottom',
                style: {background: '#eee'},
                items: ['->',
                    {
                        text: 'Save',
                        glyph: 0xf0c7,
                        listeners: {
                            click: 'createDocument'
                        }
                    },{
                        text: 'Cancel',
                        glyph: 0xf112,
                        scope: me,
                        handler : this.doHide
                    }
                ]
            }],
    		items: [{
    	    	xtype: 'form',
    	    	reference: 'document_create_form',
    	    	bodyPadding: '10',
    	    	items: [{
    	            fieldLabel: 'Name',
    	            msgTarget: 'under',
    	            name: 'name',
    	            xtype: 'textfield'
    	        },{
    	            xtype: 'combobox',
    	            name: 'type',
    	            editable: false,
    	            fieldLabel: 'Type',
    	            queryMode: 'local',
    	            displayField: 'text',
    	            valueField: 'type',
    	            allowBlank: false,
    	            store: Ext.create('Ext.data.Store', {
    	            	model: 'Type',
    	                data: [
    	                       {id: 1, type: 'rs', text: '需求类'},
    	                       {id: 2, type: 'tc', text: '测试类'},
    	                       {id: 3, type: 'tr', text: '报告类'},
    	                ]
    	            })
    	        }]
    	    }]
    	});
    	me.callParent(arguments);
    },
    doHide: function(){
        this.hide();
    }
});