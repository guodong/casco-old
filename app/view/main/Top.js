Ext.define('casco.view.main.Top', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.top',
    requires: ['casco.view.testing.Test'],
//    defaults : {
//        xtype : 'buttontransparent'
//    },
    
    style: {background: '#3892d3',padding: '10px',color: '#fff'},
    initComponent: function(){
    	var me = this;
    	this.items = [{
            xtype: 'label',
            html: 'CASCO TEST CENTER',
            style: 'font-size: 27px;'
        },{
            xtype: 'label',
            text: "CASCO TEST CENTER",
            style: 'display:inline-block;padding-top: 1em'
        },'->',{
            text: 'Manage',
            xtype: 'button',
            handler: function(){
            	localStorage.view = 'manage';
            	location.reload();
            }
        },{
            text: 'Testing',
            xtype: 'button',
            handler: 'testing'
        },{
            xtype: 'combobox',
            editable: false,
            displayField: 'name',
            valueField: 'id',
            store: Ext.create('casco.store.Projects'),
            emptyText: 'Switch Project',
            //value: localStorage.project_id,
            listeners: {
            	select: function(combo, record){
            		//if(record.id != localStorage.project_id){
            			localStorage.project_id = record.id;
            			localStorage.project_name = record.data.name;
            			localStorage.view = 'test';
            			location.reload();
            		//}
            	}
            }
        },{
            text: 'User',
            glyph: 0xf007,
            menu: [{
                text: 'Account'
            },{
                text: 'Logout',
                handler: 'onLogout'
            }]
        }];
    	this.callParent();
    }
})