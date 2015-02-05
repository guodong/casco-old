/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('casco.view.main.Main', {
    extend: 'Ext.container.Viewport',
    requires: [
        'casco.view.main.MainController',
        'casco.view.main.MainModel',
        'casco.view.main.Top',
        'casco.view.project.Project',
        'casco.view.main.Tree',
        'casco.store.TcSteps'
    ],

    xtype: 'app-main',
    
    controller: 'main',
    viewModel: {
        type: 'main'
    },

    layout: {
        type: 'border'
    },
    initComponent : function() {
		Ext.setGlyphFontFamily('FontAwesome'); // 设置图标字体文件，只有设置了以后才能用glyph属性
		var me = this;
		this.items = [{
	        region: 'north',
	        xtype: 'top'
	    },{
	        xtype: 'tree',
	        id: 'mtree',
	        itemId: 'mtree',
	        title: localStorage.project_name,
	        region: 'west',
	        width: 200,
	        split: true,
	        collapsible: true
	    },{
	        region: 'center',
	        xtype: 'tabpanel',
	        reference: 'main',
	        items:[{
	            title: 'Main',
	            html: '<iframe src="/draw/index.html?'+localStorage.project_id+'" style="width:100%;height:100%;border:0"></iframe>'
	        }]
	    }]
		this.callParent();
	},

    
});
