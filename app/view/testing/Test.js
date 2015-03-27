Ext.define('casco.view.testing.Test', {
	extend: 'Ext.form.Panel',
	alias: 'widget.test',
	requires: ['casco.store.Tcs'],

	allowDeselect: true,

	viewModel: 'main',

	bodyPadding: '10',
	width: '100%',
	initComponent: function() {
		var me = this;
		var tcs = Ext.create('casco.store.Documents');
		tcs.load({
			params: {
				project_id: localStorage.project_id,
				type: 'tc'
			}
		});
		//var builds = Ext.create('casco.store')
		me.items = [{
			layout: 'column',
			items: [{
				columnWidth:.3,   
                layout:"form", 
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
				columnWidth:.3,   
                layout:"form", 
                items:[{
    				xtype: 'combobox',
    				name: 'document_id',
    				editable: false,
    				fieldLabel: 'Tc Document',
    				displayField: 'name',
    				valueField: 'id',
    				store : tcs,
    				allowBlank: false,
    				queryMode: 'local'
    			}] 
			},{
				columnWidth:.3,   
                layout:"form", 
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
				columnWidth:.3,   
                layout:"form", 
                items:[{
    				xtype: 'combobox',
    				name: 'document_id',
    				editable: false,
    				fieldLabel: 'Rs Document',
    				displayField: 'name',
    				valueField: 'id',
    				store : tcs,
    				allowBlank: false,
    				queryMode: 'local'
    			}] 
			},{
				columnWidth:.3,   
                layout:"form", 
                items:[{
    				fieldLabel: 'Rs Version',
    				name: 'tag',
    				xtype: 'combobox',
    				allowBlank: false
    			}] 
			}]
		}, {
			xtype: 'grid',
			columns: [{
				text: "tag",
				dataIndex: "tag",
				width: 200
			}, {
				text: "sources",
				dataIndex: "sources",
				width: 200,
				autoShow: false,
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
				width: 100,
				renderer: function(value) {
					switch (value) {
					case 0:
						return 'untested';
					case 1:
						return '<span style="color:green">passed</span>';
					case 2:
						return '<span style="color:red">failed</span>';
					}
				}
			}]
		}];
		me.callParent(arguments);
	}
})