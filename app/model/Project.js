Ext.define('casco.model.Project', {
	extend: 'Ext.data.Model',
	fields: ['id', 'name'],
	proxy: {
		type: 'rest',
		url: API + 'project',
	}

});