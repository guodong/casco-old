Ext.define('casco.view.manage.Vatstr', {
    extend: 'Ext.grid.Panel',

    alias: 'widget.vatstr',
    requires: [
        'Ext.grid.plugin.CellEditing',
        'Ext.form.field.TextArea',
        'Ext.form.field.Number',
        'Ext.toolbar.TextItem',
    ],
	columns: [{
        text: 'Vat Option',
        width: '100%',
        sortable: true,
        resizable: false,
        draggable: false,
        hideable: false,
        menuDisabled: true,
        dataIndex: 'name',
        field: {
            type: 'textareafield',
            grow: true
        }
    }],
    initComponent: function(){
    	var me = this;
    	this.editing = Ext.create('Ext.grid.plugin.CellEditing');
    	Ext.apply(me, {
    		plugins: [this.editing],
    		dockedItems: [{
    	        xtype: 'toolbar',
    	        dock: 'bottom',
    	        items: [{
    	            glyph: 0xf067,
    	            text: 'Add',
    	            scope: me,
    	            handler: this.onAddClick,
    	        }, {
    	            glyph: 0xf068,
    	            text: 'Delete',
    	            disabled: true,
    	            itemId: 'delete',
    	            scope: me,
    	            handler: this.onDeleteClick,
    	        }]
    	    }],
    	});
    	me.callParent(arguments); //必须在getSelectionModel上边，否则报错
    	this.getSelectionModel().on('selectionchange', this.onSelectChange, this);

    },
    onSelectChange: function(selModel, selections){
        this.down('#delete').setDisabled(selections.length === 0);
    },
    onAddClick: function(){
        var rec = new casco.model.Vatstr({
            name: ''
        }), edit = this.editing;
        
        edit.cancelEdit();
        this.store.add(rec);
        this.getView().refresh();
        edit.startEditByPosition({
            row: this.store.getCount() - 1,
            column: 0
        });
    },
    onDeleteClick: function(){
    	Ext.Msg.confirm('Confirm', 'Are you sure to delete?', function(choice){if(choice == 'yes'){
    		var selection = this.getView().getSelectionModel().getSelection()[0];
	        if (selection) {
	            this.store.remove(selection);
	            this.getView().refresh();
	        }
    	}}, this);
        
    }
});