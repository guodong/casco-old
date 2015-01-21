Ext.define('casco.view.tc.TcController', {
	extend : 'Ext.app.ViewController',
	alias : 'controller.tc',

	createTc : function() {
		var form = this.lookupReference('TcAddform');
		var data = form.getValues();
		data.doc_id = localStorage.getItem("doc_id");
		var grid = Ext.ComponentQuery.query("#mgrid")[0];//this.down('#mgrid');//this.lookupReference('mgrid');
		var d = grid.store.getData();
		var steps = [];
		for ( var i in d.items) {
			steps.push(d.items[i].data);
		}
		data.steps = steps;
		// console.log(data);
		Ext.Ajax.request({
			url : API + 'tc',
			params : Ext.JSON.encode(data),
			success : function(response, opts) {
				var obj = Ext.decode(response.responseText);

				form.up("window").destroy();
				var t = Ext.ComponentQuery.query("#tab-" + data.doc_id)[0];
				t.store.reload();
			},
			failure : function(response, opts) {
				console.log('server-side failure with status code '
						+ response.status);
			}
		});
	}
});