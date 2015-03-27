Ext.define('casco.model.Build', {
	extend: 'Ext.data.Model',
	fields: ['id', 'version', 'project_id'],
	proxy: {
		type: 'rest',
		url: API + 'build'
	}

});