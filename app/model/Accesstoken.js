Ext.define('casco.model.Accesstoken', {
    extend: 'Ext.data.Model',
    fields: ['token'],
    //identifier: 'uuid',
    proxy: {
        type: 'rest',
        url: API+'accesstoken',
        reader:{
        	type: 'json'
        },
        writer: {
            type: 'json'
        }
    }
});