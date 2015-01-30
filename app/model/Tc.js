Ext.define('casco.model.Tc', {
	extend : 'Ext.data.Model',
	fields : ['id', 'tag'],
	proxy: {
        type: 'rest',
        url: API+'tc',
        reader:{
        	type: 'json'
        },
        writer: {
            type: 'json'
        }
    }
});