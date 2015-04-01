Ext.define('casco.view.testing.Test', {
	extend: 'Ext.form.Panel',
	alias: 'widget.test',
	requires: ['casco.store.Tcs','casco.store.Documents','casco.store.Builds','Ext.layout.container.Column'],

	bodyPadding: '10',
	width: '100%',
	initComponent: function() {
		var me = this;
		var tcdocs = Ext.create('casco.store.Documents');
		tcdocs.load({
			params: {
				project_id: localStorage.project_id,
				type: 'tc'
			}
		});
		var rsdocs = Ext.create('casco.store.Documents');
		rsdocs.load({
			params: {
				project_id: localStorage.project_id,
				type: 'rs'
			}
		});
		//var builds = Ext.create('casco.store')
		me.items = [{
			layout: 'column',
			items: [{
				columnWidth:0.25,   
                //layout:"form", 
                items:[{
    				fieldLabel: 'Build Version',
    				name: 'build_id',
    				xtype: 'combobox',
    				editable: false,
    				displayField: 'version',
    				store: Ext.create('casco.store.Builds')
    			}] 
			}]
		},{
			layout: 'column',
			items: [{
				columnWidth:0.25,   
                //layout:"form", 
                items:[{
    				xtype: 'combobox',
    				name: 'document_id',
    				editable: false,
    				fieldLabel: 'Tc Document',
    				displayField: 'name',
    				valueField: 'id',
    				store : tcdocs,
    				allowBlank: false,
    				queryMode: 'local',
    				listeners: {
    					select: function(f, r, i) {
    						var store = Ext.create('casco.store.Tcs');
    						store.load({
    							params: {
    								document_id: r.get('id')
    							},
    							callback: function(){
    								me.down('grid').reconfigure(store);
    							}
    						});
						}
    				}
    			}] 
			},{
				columnWidth:0.25,   
                //layout:"form", 
                items:[{
    				fieldLabel: 'Tc Version',
    				name: 'tag',
    				xtype: 'combobox',
    				allowBlank: false
    			}] 
			}]
		},{
			layout: 'column',
			items: [{
				columnWidth:0.25,   
                //layout:"form", 
                items:[{
    				xtype: 'combobox',
    				name: 'document_id',
    				editable: false,
    				fieldLabel: 'Rs Document',
    				displayField: 'name',
    				valueField: 'id',
    				store : rsdocs,
    				allowBlank: false,
    				queryMode: 'local'
    			}] 
			},{
				columnWidth:0.25,   
                //layout:"form", 
                items:[{
    				fieldLabel: 'Rs Version',
    				name: 'tag',
    				xtype: 'combobox',
    				allowBlank: false
    			}] 
			}]
		}, {
			layout: 'column',
			items: [{
				xtype: 'grid',
				columnWidth: 1,
				autoScroll: true,
				scroll: true,
				height: 600,
				columns: [{
					text: "tag",
					dataIndex: "tag",
					width: 200
				}, {
					text: "sources",
					dataIndex: "sources",
					width: 200,
					autoShow: false,
					flex:1,
					renderer: function(value) {
						var arr = [];
						Ext.Array.each(value, function(v) {
							arr.push(v.tag);
						});
						return arr.join(', ');
					}
				}, {
					text: "test method",
					dataIndex: "testmethod",
					width: 100,
					renderer: function(tm) {
						return tm ? tm.name : ''
					}
				}, {
					text: "pre condition",
					dataIndex: "pre_condition",
					flex: 1
				}, {
					text: "result",
					dataIndex: "result",
					width: 230,
					renderer: function(value, a, record) {console.log(arguments)
						var str;
						switch (value) {
						case 0:
							str = '<form><input onclick="untested(\''+record.get('id')+'\')" type="radio" name="result" checked="checked">untested <input onclick="passed(\''+record.get('id')+'\')" type="radio" name="result">passed <input onclick="failed(\''+record.get('id')+'\')" type="radio" name="result">failed</form>';
							break;
						case 1:
							str = '<form><input onclick="untested(\''+record.get('id')+'\')" type="radio" name="result">untested <input onclick="passed(\''+record.get('id')+'\')" type="radio" name="result" checked="checked">passed <input onclick="failed(\''+record.get('id')+'\')" type="radio" name="result">failed</form>';
							break;
						case 2:
							str = '<form><input onclick="untested(\''+record.get('id')+'\')" type="radio" name="result">untested <input onclick="passed(\''+record.get('id')+'\')" type="radio" name="result">passed <input onclick="failed(\''+record.get('id')+'\')" type="radio" name="result" checked="checked">failed</form>';
						}
						return str;
					}
				}]
			}]
			
		}];
		me.callParent(arguments);
	}
})
function untested(id){
	Ext.Ajax.request({
	    url: API+'setresult',
	    params: {
	        id: id,
	        result: 0
	    },
	    success: function(response){
	    }
	});
}
function passed(id){
	Ext.Ajax.request({
	    url: API+'setresult',
	    params: {
	        id: id,
	        result: 1
	    },
	    success: function(response){
	    }
	});
}
function failed(id){
	Ext.Ajax.request({
	    url: API+'setresult',
	    params: {
	        id: id,
	        result: 2
	    },
	    success: function(response){
	    }
	});
}