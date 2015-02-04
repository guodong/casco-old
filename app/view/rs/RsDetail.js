Ext.define('casco.view.rs.RsDetail', {
    extend: 'Ext.window.Window',

    alias: 'widget.rs.rsdetail',
    uses: [
           'casco.view.document.DocumentController'
    ],
    
    modal: true,
    title: 'Rs Detail',
    width: 600,
    
    initComponent: function(){
    	var me = this;
    	me.vat = Ext.create('casco.store.Vat');
		if(me.rs){
			me.vat.setData(me.rs.get('vat'));
		}
    	Ext.apply(me, {
    		dockedItems: [{
                xtype: 'toolbar',
                dock: 'bottom',
                style: {background: '#eee'},
                items: ['->',
                        {
                    text: 'Close',
                    glyph: 0xf112,
                    scope: me,
                    handler : this.destroy
                },
                {
                    text: 'Save',
                    glyph: 0xf0c7,
                    scope: me,
                    handler : function(){
                    	var rs = me.rs;
                    	var vat = [];
                    	me.vat.each(function(s){
                			vat.push(s.getData());
                		});
                    	rs.set('vat', vat);
                    	rs.save();
                    	this.destroy();
                    }
                }
                ]
            }],
    		items: [{
    	    	xtype: 'form',
    	    	bodyPadding: '10',
    	    	width: '100%',
    	    	items: [{
    	            fieldLabel: 'tag',
    	            xtype: 'textfield',
    	            editable: false,
        	    	width: '100%',
    	            name: 'tag'
    	        },{
    	            fieldLabel: 'description',
    	            xtype: 'textareafield',
    	            editable: false,
        	    	width: '100%',
    	            name: 'description'
    	        },{
    	            fieldLabel: 'implement',
    	            xtype: 'textfield',
    	            editable: false,
        	    	width: '100%',
    	            name: 'implement'
    	        },{
    	            fieldLabel: 'priority',
    	            xtype: 'textfield',
    	            editable: false,
        	    	width: '100%',
    	            name: 'priority'
    	        },{
    	            fieldLabel: 'contribution',
    	            xtype: 'textfield',
    	            editable: false,
        	    	width: '100%',
    	            name: 'contribution'
    	        },{
    	            fieldLabel: 'category',
    	            xtype: 'textfield',
    	            editable: false,
        	    	width: '100%',
    	            name: 'category'
    	        },{
    	            fieldLabel: 'allocation',
    	            xtype: 'textfield',
    	            editable: false,
        	    	width: '100%',
    	            name: 'allocation'
    	        },{
    	            fieldLabel: 'vat',
    	            xtype: 'textfield',
    	            id: 'vat',
    	            editable: true,
        	    	width: '100%',
    	            name: 'vat'
    	        }, {
    				xtype: 'grid',
    				fieldLabel: 'Vat',
    				dockedItems: [{
    	    	        xtype: 'toolbar', 
    	    	        dock: 'bottom',
    	    	        items: [{
    	    	            glyph: 0xf067,
    	    	            text: 'Edit Vat',
    	    	            handler: function(){
    	    					var wd = Ext.create("casco.view.rs.vat.Add", {
    	    						vat: me.vat
    	    					});
    	    					wd.show();
    	    				}
    	    	        }]
    	    	    }],
    			    columns: [
    			        { text: 'Vat',  dataIndex: 'tag', flex: 1}
    			    ],
    			    store: me.vat
    			}]
    	    }]
    	});
    	me.callParent(arguments);
    },
    doHide: function(){
        this.hide();
    }
});