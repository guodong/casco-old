Ext.define('casco.view.auth.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',
    requires: ['casco.model.Accesstoken'],
    onLoginClick: function(){
    	var me = this;
    	var view = this.getView();
    	var form = view.down("form");
    	var accesstoken = Ext.create('casco.model.Accesstoken');
    	accesstoken.set('id', null);
    	accesstoken.load({
    		params: form.getValues(),
    		success: function(record){
    			if(record.get('error')){
    				Ext.Msg.alert('Error', 'Authentication failure.');
    			}else{console.log(record)
    		        localStorage.setItem("uid", record.get('id'));
    		        localStorage.setItem("user", JSON.stringify(record.data));
    		        localStorage.setItem("role",record.get('role'));
    		        me.getView().destroy();

    		        Ext.widget('app-main');
    			}
    		}
    	});

    }
});