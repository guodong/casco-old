Ext.define('casco.view.main.Tree', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.tree',
    requires: ['casco.ux.Registry', 'casco.store.TreeDocuments', 'casco.view.document.Create', 'casco.view.document.FolderCreate'],

    listeners: {
        itemclick: 'seldoc',
    },
    displayField: 'name',

    rootVisible : false,

    initComponent: function() {
    	var self = this;
    	var project_id = localStorage.project_id;//casco.ux.Registry.get('project_id');
        var st = new casco.store.TreeDocuments();
        st.proxy.extraParams = {project_id: project_id};
        st.load();
        this.store = st;
        this.callParent(arguments);
    },
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'bottom',
        style: {
            background: '#eee'
        },
        items: [{
            text: 'Document',
            glyph: 0xf067,
            handler: function() {
                var win = Ext.create('widget.document.create');
                win.show();
            }
        }, {
            text: 'Folder',
            glyph: 0xf067,
            handler: function() {
                var win = Ext.create('widget.document.foldercreate');
                win.show();
            }
        }]
    }],
})