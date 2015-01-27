Ext.define('casco.view.main.ItemTree', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.itemtree',
    requires: ['casco.store.TreeItems'],
    displayField: 'name',

    header: false,
    rootVisible : false,
    initComponent: function(){
    	this.store = Ext.create('casco.store.TreeItems', {
    		proxy: {
    			extraParams: {
    				project_id: localStorage.project_id
    			}
    		}
    	});
    	
    	this.callParent();
    }
})