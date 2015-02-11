Ext.define('casco.view.manage.Useradd', {
	extend: 'Ext.window.Window',

	xtype: 'widget.useradd',
	requires: [],
	controller: 'manage',
	resizable: true,
	maximizable: true,
	modal: true,
	title: 'Add User',
	width: 300,
	initComponent: function() {
		var me = this;

		Ext.apply(me, {
			
			items: [{
				xtype: 'form',
				reference: 'useraddform',
				bodyPadding: '10',
				items: [{
					anchor: '100%',
					fieldLabel: 'Account',
					name: 'account',
					labelAlign: 'top',
					msgTarget: 'under',
					xtype: 'textfield',
					allowBlank: false
				}, {
					anchor: '100%',
					fieldLabel: 'Realname',
					name: 'realname',
					labelAlign: 'top',
					msgTarget: 'under',
					xtype: 'textfield',
					allowBlank: false
				}, {
					anchor: '100%',
					fieldLabel: 'Jobnumber',
					name: 'jobnumber',
					labelAlign: 'top',
					msgTarget: 'under',
					xtype: 'textfield'
				}, {
					anchor: '100%',
					fieldLabel: 'Password',
					name: 'password',
					labelAlign: 'top',
					msgTarget: 'under',
					xtype: 'textfield',
					inputType: 'password',
					allowBlank: false
				}],
				buttons: ['->', {
					text: 'Save',
					formBind: true,
					glyph: 0xf0c7,
					listeners: {
						click: 'createuser'
					}
				}, {
					text: 'Cancel',
					glyph: 0xf112,
					scope: me,
					handler: this.destroy
				}]

			}]
		});
		me.callParent(arguments);
	},
	doHide: function() {
		this.hide();
	}
});