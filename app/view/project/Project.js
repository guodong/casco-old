Ext.define("casco.view.project.Project", {
	extend : 'Ext.window.Window',
	xtype : 'project',

	requires : [ 'casco.view.project.ProjectController', 'casco.view.project.Create'],

	controller : 'project',
	title : 'Projects',
    closable: false,
    title: 'Choose Project',
	autoShow : true,
	items : {
        xtype: 'form',
        bodyPadding: 10,
        items: [{
            xtype: 'combobox',
            name: 'project_id',
            editable: false,
            fieldLabel: 'Choose Project',
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            allowBlank: false,
            store: 'Projects'
        }],
        buttons: [{
            text: 'Create Project',
            listeners: {
            	click: 'create'
            }
        },{
            text: 'OK',
            formBind: true,
            listeners: {
                click: 'onChooseProject'
            }
        }]
    }

});