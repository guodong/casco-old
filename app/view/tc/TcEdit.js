Ext.define('casco.view.tc.TcEdit', {
    extend: 'Ext.window.Window',

    alias: 'widget.tcedit',
    uses: [
        'casco.view.document.DocTree',
        'casco.view.tc.TcStepEdit',
        'casco.view.document.DocumentController'
    ],
    controller: 'document',
    resizable: true,
    maximizable: true,
    modal: true,
    title: 'Edit Tc Item',
    width: 800,
    height: 550,
    autoScroll: true,
    
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
                            click: 'createTc'
                        }
                    },{
                        text: 'Cancel',
                        glyph: 0xf112,
                        scope: me,
                        handler : this.destroy
                    }
                ]
            }],
    		items: [{
    	    	xtype: 'form',
    	    	reference: 'TcAddform',
    	    	bodyPadding: '10',
    	    	items: [{
    	            anchor: '100%',
    	            fieldLabel: 'Title',
    	            name: 'title',
    	            labelAlign: 'top',
    	            msgTarget: 'under',
    	            xtype: 'textfield',
    	            value: me.tc.title
    	        },{
    	            anchor: '100%',
    	            fieldLabel: 'Description',
    	            name: 'dsc',
    	            labelAlign: 'top',
    	            msgTarget: 'under',
    	            xtype: 'textarea',
    	            value: me.tc.dsc
    	        },{
    	            anchor: '100%',
    	            fieldLabel: 'Sources',
    	            name: 'sources',
    	            labelAlign: 'top',
    	            msgTarget: 'under',
    	            xtype: 'textarea',
    	            value: me.tc.sources
    	        },{
    	            anchor: '100%',
    	            fieldLabel: 'Test Method',
    	            name: 'test_method',
    	            labelAlign: 'top',
    	            msgTarget: 'under',
    	            xtype: 'textarea',
    	            value: me.tc.test_method
    	        },{
    	            anchor: '100%',
    	            fieldLabel: 'Pre condition',
    	            name: 'pre_condition',
    	            labelAlign: 'top',
    	            msgTarget: 'under',
    	            xtype: 'textarea',
    	            value: me.tc.pre_condition
    	        },{
    	            anchor: '100%',
    	            fieldLabel: 'Result',
    	            name: 'result',
    	            labelAlign: 'top',
    	            msgTarget: 'under',
    	            xtype: 'combobox',
    	            value: me.tc.result,
    	            displayField: 'label',
    	            valueField: 'value',
    	            store: Ext.create('Ext.data.Store', {
    	                fields: ['value', 'label'],
    	                data : [
    	                    {"value":0, "label":"untested"},
    	                    {"value":1, "label":"passed"},
    	                    {"value":2, "label":"failed"}
    	                ]
    	            })

    	        },{
    	        	xtype: 'tcstepedit',
    	        	steps: me.tc.steps,
    	        	reference: 'mgrid',
    	        	id: 'mgrid'
    	        }]
    	    }]
    	});
    	me.callParent(arguments);
    },
    doHide: function(){
        this.hide();
    },
});