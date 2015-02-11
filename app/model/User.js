Ext.define('casco.model.User', {
    extend: 'Ext.data.Model',
    fields: ['jobnumber', 'account', 'realname'],
    //identifier: 'uuid',
    proxy: {
        type: 'rest',
        url: API+'user',
        reader:{
        	type: 'json'
        },
        writer: {
            type: 'json'
        }
    }
});