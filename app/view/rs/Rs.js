Ext.define('casco.view.rs.Rs', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.rs',
	requires: ['casco.view.rs.RsImport', 'casco.store.Rss', 'casco.view.rs.RsDetail'],
	autoHeight: true,
	allowDeselect: false,
	viewModel: 'main',
	initComponent: function() {
		var me = this;
		var st = new casco.store.Rss();
		st.load({
			params: {
				document_id: me.document_id
			}
		});
		me.store = st;
		me.tbar = [{
			text: 'Import Document',
			glyph: 0xf093,
			scope: this,
			handler: function() {
				var win = Ext.create('widget.rs.rsimport', {
					listeners: {
						scope: this
					},
					document_id: me.document_id
				});
				win.show();
			}
		}];
		me.listeners = {
			celldblclick: function(a,b,c,record){
				var win = Ext.create('widget.rs.rsdetail', {
					rs: record,
					editvat: c==7,
					document_id: me.document_id
				});
				win.down('form').loadRecord(record);
				win.show();
			}
		};
		me.callParent(arguments);
	},
    viewConfig: { 
        stripeRows: false, 
        getRowClass: function(record) {
        	if(record.get('tcs').length != 0)
        		return ''; 
        	if(record.get('tcs').length == 0 && record.get('vat').length == 0 && !record.get('vatstr'))
        		return 'red'; 
        	if(record.get('vat').length != 0 || record.get('vatstr'))
        		return 'yellow'; 
        } 
    },
	columns: [{
		xtype: 'checkcolumn',
		header: '',
		dataIndex: 'active',
		width: 60,
		editor: {
			xtype: 'checkbox',
			cls: 'x-grid-checkheader-editor'
		}
	}, {
		text: "tag",
		dataIndex: "tag",
		width: 130
	}, {
		text: "implement",
		dataIndex: "implement",
		width: 100
	}, {
		text: "category",
		dataIndex: "category",
		width: 130
	}, {
		text: "allocation",
		dataIndex: "allocation",
		flex: 1
	}, {
		text: "tcs",
		dataIndex: "tcs",
		width: 250,
		renderer: function(value) {
			var str = "";
			Ext.Array.each(value, function(v) {
				str += v.tag + " ";
			});
			return str;
		}
	}, {
		text: "vat",
		dataIndex: "vat",
		width: 250,
		renderer : function(value) {
			var arr = [];
			Ext.Array.each(value, function(v) {
		        arr.push(v.tag);
		    });
			return arr.join(', ');
		}
	}, {
		text: "vat string",
		dataIndex: "vatstr",
		width: 100,
		renderer: function(value) {
			return value?value.name:'';
		}
	}, {
		text: "result",
		dataIndex: "result",
		width: 150,
		renderer : function(value) {
			switch(value){
			case 0:
				return 'untested';
			case 1:
				return '<span style="color:green">passed</span>';
			case 2:
				return '<span style="color:red">failed</span>';
			}
		}
	}]
})