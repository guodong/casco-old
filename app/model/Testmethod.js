Ext.define('casco.model.Testmethod', {
    extend: 'Ext.data.Model',
    fields: ['name'],
    //identifier: 'uuid',
    proxy: {
        type: 'rest',
        url: API+'testmethod',
        reader:{
        	type: 'json'
        },
        writer: {
            type: 'json'
        }
    }
});