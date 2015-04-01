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
    	var store = Ext.create('casco.store.Projects');
    	store.load({
    		params:{
    			user_id: localStorage.uid
    		}
    	});
    	var user = JSON.parse(localStorage.user);
    	this.items = [{
            xtype: 'label',
            html: 'CASCO TEST CENTER',
            style: 'font-size: 27px;'
        },'->',{
            text: 'Manage',
            xtype: 'button',
            handler: function(){
            	localStorage.view = 'manage';
            	location.reload();
            },
            hidden: localStorage.view == 'manage'?true:false
        }
        ,{
            text: 'Testing',
            xtype: 'button',
            handler: 'testing',
            hidden: localStorage.view == 'manage'?true:false
        },{
            text: 'Project Stat',
            xtype: 'button',
            handler: function(){
            	window.open("/prostat/projectstat-tmp.htm");
            },
            hidden: localStorage.view == 'manage'?false:true
        },{
            text: 'Relation view',
            xtype: 'button',
            handler: function(){
            	window.open('/draw/graph2.html');
            }
        }
        ,{
            xtype: 'combobox',
            editable: false,
            displayField: 'name',
            valueField: 'id',
            store: store,
            queryMode: 'local',
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
            text: user.realname,
            glyph: 0xf007,
            menu: [{
                text: 'Account'
            },{
                text: 'Change Password'
            },{
                text: 'Logout',
                handler: 'onLogout'
            }]
        }];
    	this.callParent();
    }
})