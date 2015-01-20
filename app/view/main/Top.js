/**
 * Created by gd on 14-7-31.
 */
Ext.define('casco.view.main.Top', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.top',
    requires: ['casco.view.testing.Test'],
    //uses: ['casco.view.project.Create'],
//    defaults : {
//        xtype : 'buttontransparent'
//    },
    
    style: {background: '#3892d3',padding: '10px',color: '#fff'},
    initComponent: function(){
    	this.items = [{
            xtype: 'label',
            html: 'CASCO TEST CENTER',
            style: 'font-size: 30px;'
        },{
            xtype: 'label',
            bind: {
                text: '{system.version}'
            },
            style: 'display:inline-block;padding-top: 1em'
        },'->',{
            text: 'Testing',
            xtype: 'button',
            handler: 'testing'
        },{
            text: 'Switch Project',
            xtype: 'button',
            handler: 'swProject'
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
    },
    getMenu: function(){
    	var store = Ext.getStore('Projects');alert(store.data.items.length)
    	var d = [];
    	store.each(function(r){
    		d.push({text: r.name})
    	});
    	d.push({
            text: 'Create Project',
            glyph: 0xf067,
            handler: function(){
            	var win = Ext.create('widget.project.create',{listeners:{scope: this}});
                win.show();
            }
        });
    	return d;
    }
})