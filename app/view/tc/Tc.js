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
    	
        me.tbar = [{
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
			text: 'Import Document',
			glyph: 0xf093,
			scope: this,
			handler: function() {
				var win = Ext.create('widget.rs.rsimport', {
					listeners: {
						scope: this
					},
					document_id: me.document_id,
					type: 'tc',
				});
				win.show();
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
        },{
			text: 'View Document',
			glyph: 0xf108,
			scope: this,
			handler: function() {
				window.open("/viewdoc.html?file="+me.document_id,"_blank","width=800,height=900");
			}
		},{
			text: 'View Graph',
			glyph: 0xf0e8,
			scope: this,
			handler: function() {
				window.open('/draw/graph.html?document_id='+me.document_id);
			},
			hidden: true
		}];
    	me.callParent(arguments);
    },
    features: [{
    	ftype: 'summary',
    	dock: 'top'
    }],
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
        {text: "tag", dataIndex: "tag", width: 200, hideable: false,
            summaryType: 'count',
            summaryRenderer: function(value, summaryData, dataIndex) {
                return Ext.String.format('{0} item{1}', value, value !== 1 ? 's' : '');
            }},
        {text: "sources", dataIndex: "sources", width: 200, autoShow: false, renderer : function(value) {
			var arr = [];
			Ext.Array.each(value, function(v) {
		        arr.push(v.tag);
		    });
			return arr.join(', ');
		}},
        {text: "test method", dataIndex: "testmethod", width: 100, renderer: function(tm){return tm?tm.name:''}},
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
        celldblclick: function(a,b,c, record, item, index, e) {
        	if(c==0){
				window.open('/draw/graph2.html#'+record.get('tag'));
				return;
			}
        	var win = Ext.create('widget.tcadd',{tc: record, document_id: this.document_id});
            win.down('form').loadRecord(record);
            win.show();
        }
    }
})