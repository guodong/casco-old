Ext.define('casco.model.TcStep', {
	extend : 'Ext.data.Model',
	
	fields : [ {
		name : 'id',
		type : 'number'
	}, {
		name : 'num',
		type : 'number'
	}, {
		name : 'actions',
		type : 'string'
	}, {
		name : 'exp_res',
		type : 'string'
	} ]

});