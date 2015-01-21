Ext.define('casco.model.Document', {
	extend: 'Ext.data.Model',
	fields: ['id', 'name', 'type', 'project_id', 'leaf'],
	proxy: {
		type: 'rest',
		url: API + 'document'
	}

});