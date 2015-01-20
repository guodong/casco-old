Ext.define('casco.view.auth.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',
    onLoginClick: function(){        
        localStorage.setItem("uid", true);

        this.getView().destroy();

        Ext.widget('project');
    }
});