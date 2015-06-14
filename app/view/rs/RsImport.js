Ext.define('casco.view.rs.RsImport', {
    extend: 'Ext.window.Window',

    alias: 'widget.rs.rsimport',
    uses: [
    ],

    modal: true,
    title: 'Document Import',
    width: 400,
    frame: true,
    id: 'import-window',
    initComponent: function(){
    	var me = this;
    	me.items = [{
        	xtype: 'form',
            bodyPadding: 10,
        	items: [{
				fieldLabel: 'Version',
				name: 'version_id',
				xtype: 'hiddenfield',
				value: me.version_id
			},{
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
    	        name: 'type',
    	        value: me.type,
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

    	                    	var t = Ext.ComponentQuery.query("#tab-"+me.document_id)[0];
    	          		      	t.store.reload();
    	                    },
    	                  /*  failure: function(form, action) {
    	                    	alert("文档解析错误");    //文档解析成功也报错？？？？？
    	                    }*/
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