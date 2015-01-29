Ext.define('casco.view.tc.TcController', {
	extend : 'Ext.app.ViewController',
	alias : 'controller.tc',

	createTc : function() {
		var view = this.getView();
		var form = view.down('form');
		console.log(form.getValues());
		var data = form.getValues(); //提交的数据
		data.document_id = view.document_id;
		data.steps = [];
		var i = 1;
		form.steps.each(function(s){
			data.steps.push({ 
				num: i,
				actions: s.data.actions,
				expected_result: s.data.expected_result
			});
			i++;
		});
		data.sources = [];
		form.sources.each(function(s){
			data.sources.push(s.id);
		})
		Ext.Ajax.request({
			url : API + 'tc',
			jsonData: data,
			success : function(response, opts) {
				form.up("window").destroy();
				var t = Ext.ComponentQuery.query("#tab-" + data.document_id)[0];
				t.store.reload();
			}
		});
	}
});