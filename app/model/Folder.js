Ext.define('casco.model.Folder', {
    extend: 'Ext.data.Model',
    requires:[
        'Ext.data.proxy.LocalStorage',
        'Ext.data.proxy.Ajax'
    ],
    fields: [
        { name: 'id', type: 'int' },
        { name: 'name' },
        {name: 'fid'},
        {name: 'project_id'}
    ],
    proxy: {
        type: 'rest',
        url: API+'folder',
        writer: {
            type: 'json'
        }
    }

});