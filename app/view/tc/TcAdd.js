var tm = Ext.create('Ext.data.Store', {
    fields: ['text', 'value'],
    data : [
        {"text":"EP", "value":"EP"},
        {"text":"EG", "value":"EG"}
    ]
});
Ext.define('casco.view.tc.TcAdd', {
    extend: 'Ext.window.Window',

    alias: 'widget.tcadd',
    requires: [
        'casco.view.document.DocTree',
        'casco.view.tc.TcStep',
        'casco.view.document.DocumentController',
        'casco.view.tc.TcAddForm',
        'casco.view.tc.TcController',
        'casco.store.Rss',
    ],
    controller: 'tc',
    resizable: true,
    maximizable: true,
    modal: true,
    title: 'Add Tc Item',
    width: 800,
    height: 550,
    autoScroll: true,
    layout: {
        type: 'border',
        padding: 0
    },

    initComponent: function(){
    	var me = this;
    	var st = new casco.store.Rss();
		st.load({
			params : {
				document_id : 1
			}
		});
		me.ss = st;
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
            
    		items: [
            {
    	    	xtype: 'panel',
    	    	region: 'center',
    	    	id: 'TcAddform',

    	        autoScroll: true,
    	    	bodyPadding: '10',
    	    	items: [{
        	    	xtype: 'tcaddform',
        	    	reference: 'TcAddform',
        	        
        	    }]
    	    }]
    	});
    	me.callParent(arguments);
    },
    doHide: function(){
        this.destroy();
    }
});