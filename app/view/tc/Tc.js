Ext.define('casco.view.tc.Tc', {
    extend : 'Ext.grid.Panel',
    alias : 'widget.tc',
    requires: ['casco.view.tc.TcAdd', 'casco.store.Tcs'],
    title : 'TSP-SyRTC',
    allowDeselect: true,

    viewModel : 'main',
    initComponent: function(){
    	var me = this;
    	var st = new casco.store.Tcs;
    	st.load({
    		params: {document_id: me.document_id}
    	});
    	me.store = st;
    	
        me.tbar = [
        {
            text: 'Add Item',
            glyph: 0xf067, 
            handler : function() {
                var win = Ext.create('widget.tcadd',{listeners:{scope: this}, document_id: me.document_id});
                win.show();
            }
        },{
            text: 'Delete Item',
            glyph: 0xf068,
            handler : function() {

            }
        },{
            text: 'Export Document',
            glyph: 0xf019,
            handler : function() {
            	window.open(API+'tc/export?document_id='+me.document_id);
            	return;
            	Ext.Ajax.request({
        			url : API + 'tc/export',
        			params : {doc_id: me.doc_id},
        			method: 'get',
        			success : function(response, opts) {
        				console.dir(response);
        			},
        			failure : function(response, opts) {
        				console.log('server-side failure with status code '
        						+ response.status);
        			}
        		});
            }
        }];
    	me.callParent(arguments);
    },
    columns: [
//        {
//            xtype: 'checkcolumn',
//            header: '*',
//            dataIndex: 'active',
//            width: 30,
//            editor: {
//                xtype: 'checkbox',
//                cls: 'x-grid-checkheader-editor'
//            }
//        },
        //{text: "#", dataIndex: "id", width: 50, hideable: false},
        {text: "tag", dataIndex: "tag", width: 150, hideable: false},
        {text: "sources", dataIndex: "sources", width: 200, autoShow: false, renderer : function(value) {
			var arr = [];
			Ext.Array.each(value, function(v) {
		        arr.push(v.tag);
		    });
			return arr.join(', ');
		}},
        {text: "test method", dataIndex: "test_method", width: 100},
        {text: "pre condition", dataIndex: "pre_condition", flex: 1},
        {text: "result", dataIndex: "result", width: 100, renderer : function(value) {
			switch(value){
			case 0:
				return 'untested';
			case 1:
				return '<span style="color:green">passed</span>';
			case 2:
				return '<span style="color:red">failed</span>';
			}
		}}
    ],
    listeners : {
        itemdblclick: function(dv, record, item, index, e) {
        	var win = Ext.create('widget.tcadd',{tc: record, document_id: this.document_id});
            win.down('form').loadRecord(record);
            win.show();
        }
    }
})