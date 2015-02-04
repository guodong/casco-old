Ext.define('casco.model.Vat', {
	extend : 'Ext.data.Model',
	fields : ['id', 'tag'],
	proxy: {
        type: 'rest',
        url: API+'vat',
        reader:{
        	type: 'json'
        },
        writer: {
            type: 'json'
        }
    }
});