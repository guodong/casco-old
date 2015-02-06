Ext.define('casco.view.document.DocumentController', {
	extend : 'Ext.app.ViewController',
	alias : 'controller.document',
	uses : [ 'casco.model.Document', 'casco.model.Folder' ],
	createDocument : function() {
		var form = this.lookupReference('document_create_form');
		var pjt = new casco.model.Document(form.getValues());
		if (pjt.get('id')) {
			pjt.set('id', 0);
		}
		pjt.set('project_id', localStorage.getItem("project_id"));
		pjt.save({
			callback: function(){
				var t = Ext.ComponentQuery.query("#mtree")[0];
				t.store.reload();
				document.getElementById('draw').contentWindow.location.reload();
			}
		});
		
	},
	createFolder : function() {
		var form = this.lookupReference('documentfolder_create_form');
		var pjt = new casco.model.Document(form.getValues());
		if (pjt.get('id')) {
			pjt.set('id', 0);
		}
		pjt.set('project_id', localStorage.getItem("project_id"));
		pjt.save({
			callback: function(){
				var t = Ext.ComponentQuery.query("#mtree")[0];
				t.store.reload()
			}
		});

	}

});