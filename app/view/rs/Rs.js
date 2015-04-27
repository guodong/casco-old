var cvd = 0;
Ext.define('casco.view.rs.Rs', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.rs',
	requires: ['casco.view.rs.RsImport', 'casco.store.Rss', 'casco.view.rs.RsDetail','casco.store.Versions'],
	autoHeight: true,
	allowDeselect: false,
	viewModel: 'main',
	initComponent: function() {
		var me = this;
		var st = new casco.store.Rss();
		st.load({
			params: {
				document_id: me.document_id
			},
			synchronous: true
		});
		me.store = st;
		st.each(function(rs){
			if(rs.tcs.length){
				cvd++;
			}
		});
		var latest_v = me.document.get('versions').length==0?'':me.document.get('versions')[0].name;
		me.tbar = [{
			xtype: 'label',
			text: 'version: '+latest_v
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
					type: 'rs'
				});
				win.show();
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
		},{
			text: 'View Statistics',
			glyph: 0xf080,
			scope: this,
			handler: function() {
				window.open('/stat/cover.htm#'+me.document_id);
			}
		}];
		me.listeners = {
			celldblclick: function(a,b,c,record){
				if(c==0){
					window.open('/draw/graph2.html#'+record.get('tag'));
					return;
				}
				if(c==5||c==6){
					var st = Ext.create('casco.store.Vat');
					st.setData(record.get('vat'));
					if(record.get('vatstr'))
						st.add({id: record.get('vatstr').id, tag: record.get('vatstr').name});
					var wd = Ext.create("casco.view.rs.vat.Add", {
						vat: st,
						document_id: me.document_id
					});
					wd.show();
					return;
				}
				var win = Ext.create('widget.rs.rsdetail', {
					rs: record,
					editvat: c==6||c==5,
					document_id: me.document_id
				});
				win.down('form').loadRecord(record);
				win.show();
			}
		};
		me.columns = [{
			text: "tag",
			dataIndex: "tag",
			width: 130,
	        summaryType: 'count',
	        summaryRenderer: function(value, summaryData, dataIndex) {
	            return Ext.String.format('{0} item{1}', value, value !== 1 ? 's' : '');
	        }
		}, {
			text: "implement",
			dataIndex: "implement",
			width: 100,
	        summaryRenderer: function(value, summaryData, dataIndex) {
	            //return 'covered:' +cvd;
	        }
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
				if(!value) return '';
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
		}/*, {
			text: "result",
			dataIndex: "result",
			width: 70,
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
		}*/];
		me.callParent(arguments);
	},
    viewConfig: { 
        stripeRows: false, 
        getRowClass: function(record) {
        	if(record.get('tcs').length != 0)
        		return ''; 
        	if(record.get('tcs').length == 0 && !record.get('vat').length && !record.get('vatstr'))
        		return 'red'; 
        	if(!record.get('vat').length || record.get('vatstr'))
        		return 'yellow'; 
        } 
    },
    features: [{
    	ftype: 'summary',
    	dock: 'top'
    }],
	
})