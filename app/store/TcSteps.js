Ext.define('casco.store.TcSteps', {
    extend: 'Ext.data.Store',
    model: 'casco.model.TcStep',
    pageSize: 0, //disable paging
    //autoLoad : true,
    proxy: {
        type: 'rest',
        url: '/project.json',
        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        writer: {
            type: 'json'
        }
    }
});