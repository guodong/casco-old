Ext.define('casco.model.Tc', {
	extend : 'Ext.data.Model',
	fields : [ {
		name : 'active',
		type : 'bool'
	}, {
		name : 'id',
		type : 'string'
	}, {
		name : 'description',
		type : 'string'
	}, {
		name : 'sources',
		type : 'string'
	}, {
		name : 'testmethod',
		type : 'string'
	}, {
		name : 'precondition',
		type : 'string'
	}]
});