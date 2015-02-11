Ext.define('casco.view.rs.RsImport', {
    extend: 'Ext.window.Window',

    alias: 'widget.rs.rsimport',
    uses: [
    ],

    modal: true,
    title: 'Rs Import',
    width: 400,
    frame: true,
    id: 'import-window',
    initComponent: function(){
    	var me = this;
    	me.items = [{
        	xtype: 'form',
            bodyPadding: 10,
        	items: [{
    	        xtype: 'filefield',
    	        name: 'file',
    	        fieldLabel: 'File',
    	        labelWidth: 50,
    	        msgTarget: 'side',
    	        allowBlank: false,
    	        anchor: 0,
    	        width: '100%',
    	        buttonText: 'Select File'
    	    },{
    	        xtype: 'hiddenfield',
    	        name: 'document_id',
    	        value: me.doc_id,
    	        allowBlank: false,
    	    }],
    	
    	    buttons: [{
    	        text: 'Import',
    	        handler: function() {
    	        	var self = this;
    	            var form = this.up('form').getForm();
    	            if(form.isValid()){
    	                form.submit({
    	                    url: API+'docfile',
    	                    waitMsg: 'Uploading file...',
    	                    success: function(fp, o) {
    	                    	self.up('window').doHide();
    	                    },
    	                    failure: function(form, action) {
    	                    	self.up('window').destroy();

    	                    	var t = Ext.ComponentQuery.query("#tab-"+me.document_id)[0];
    	          		      	t.store.reload();
    	                    }
    	                });
    	            }
    	        }
    	    }],
        }];
    	me.callParent(arguments);
    },
    
    doHide: function(){
        this.hide();
    }
});