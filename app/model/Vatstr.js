Ext.define('casco.model.Vatstr', {
	extend: 'Ext.data.Model',
	fields: ['id', 'name', 'project_id'],
	proxy: {
		type: 'rest',
		url: API + 'vatstr',
		reader: {
			type: 'json'
		},
		writer: {
			type: 'json'
		}
	}
});