Ext.define('casco.view.main.Tree', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.tree',
    requires: ['casco.ux.Registry', 'casco.view.document.Create', 'casco.view.document.FolderCreate'],

    listeners: {
        itemdblclick: 'seldoc',
    },
    displayField: 'name',

    rootVisible : false,
    viewModel: {
        type: 'main'    
    },  
    viewConfig: {
        plugins: {
            ptype: 'treeviewdragdrop',
        },
        listeners: {       
            drop: function (node, data, overModel, dropPosition) {
                  var d = {
                		src: data.records[0].id,
                		dst: overModel.data.id
                  };
          		Ext.Ajax.request({
        			url : API + 'treemod',
        			method: 'get',
        			params : d
        		});
            },
        }
    },
    initComponent: function(){
    	var me = this;
    	this.store = Ext.create('casco.store.TreeDocuments', {
    		proxy: {
    			extraParams: {
    				project_id: me.project.id
    			}
    		}
    	});
    	if(this.editable){
    		this.dockedItems = [{
    	        xtype: 'toolbar',
    	        dock: 'bottom',
    	        style: {
    	            background: '#eee'
    	        },
    	        items: [{
    	            text: 'Document',
    	            glyph: 0xf067,
    	            handler: function() {
    	                var win = Ext.create('widget.document.create', {project: me.project});
    	                win.show();
    	            }
    	        }, {
    	            text: 'Folder',
    	            glyph: 0xf067,
    	            handler: function() {
    	                var win = Ext.create('widget.document.foldercreate', {project: me.project});
    	                win.show();
    	            }
    	        }]
    	    }]
    	}
    	this.callParent();
    }
})