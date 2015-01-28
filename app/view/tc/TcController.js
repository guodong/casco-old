Ext.define('casco.view.tc.TcController', {
	extend : 'Ext.app.ViewController',
	alias : 'controller.tc',

	createTc : function() {
		var form = this.lookupReference('TcAddform');
		var data = form.getValues();
		data.document_id = localStorage.getItem("doc_id");
		var grid = Ext.ComponentQuery.query("#mgrid")[0];//this.down('#mgrid');//this.lookupReference('mgrid');
		var d = grid.store.getData();
		var steps = [];
		for ( var i in d.items) {
			if(d.items[i].data == ''){
				continue;
			}
			steps.push(d.items[i].data);
		}
		data.steps = steps;
		var sources = [];
		form.sources.each(function(s){
			sources.push({id: s.id, type: s.type});
		});
		data.sources = sources;
		// console.log(data);
		Ext.Ajax.request({
			url : API + 'tc',
			jsonData: data,
			success : function(response, opts) {
				var obj = Ext.decode(response.responseText);

				form.up("window").destroy();
				var t = Ext.ComponentQuery.query("#tab-" + data.document_id)[0];
				t.store.reload();
			},
			failure : function(response, opts) {
				console.log('server-side failure with status code '
						+ response.status);
			}
		});
	}
});