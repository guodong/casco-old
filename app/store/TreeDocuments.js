Ext.define('casco.store.TreeDocuments', {
    extend: 'Ext.data.TreeStore',
    model: 'casco.model.Document',
    pageSize: 0,
    autoLoad : false,
    proxy: {
        type: 'rest',
        url: API+'tree',
        reader: {
            type: 'json',
        },
        writer: {
            type: 'json'
        }
    }
});