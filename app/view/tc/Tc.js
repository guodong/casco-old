Ext.define('casco.view.tc.Tc', {
    extend : 'Ext.grid.Panel',
    alias : 'widget.tc',
    requires: ['casco.view.tc.TcAdd', 'casco.store.Tcs',
               'Ext.toolbar.TextItem','Ext.form.field.Checkbox',
	           'Ext.form.field.Text','Ext.ux.statusbar.StatusBar'],
    //title : 'TSP-SyRTC',
    allowDeselect: true,
    
  //search参数
	searchValue:null,
	indexes:[],
	//currentIndex:null,
	searchRegExp:null,
	//caseSensitive:false,
	regExpMode:false,
	matchCls:'x-livesearch-match',
	defaultStatusText:'Nothing Found',

    viewModel : 'main',
    initComponent: function(){
    	var me = this;
    	me.versions = new casco.store.Versions();
		me.store = new casco.store.Tcs();
		me.versions.load({
			params:{
				document_id: me.document.id
			},
			callback: function(){
				me.down('combobox').select(me.versions.getAt(0));
				var latest_v = me.versions.getCount() > 0?me.versions.getAt(0):0;
				me.curr_version = latest_v;
				if(latest_v){
					me.store.load({
						params: {
							version_id: latest_v.get('id')
						}
					});
				}
			}
		});
        me.tbar = [{
			xtype: 'combobox',
			id: 'docv-'+me.document.id,
			fieldLabel: 'version',
			labelWidth: 50,
			store: me.versions,
			displayField: 'name',
            valueField: 'id',
            queryMode: 'local',
            width:200,
            editable: true,
            lastQuery:'',
            listeners: {
            	select: function(combo, record){
            		me.curr_version = record;
            		me.store.load({
            			params:{
                			version_id: record.get('id')
            			}
            		})
            	}, 
        		beforequery : function(e){
        			e.query = new RegExp(e.query.trim(), 'i');
        			e.forceAll = true;
        		}
            }
		},'-',{
			text: 'Create Version',
			glyph: 0xf067,
			scope: this,
			hidden:true,
			handler: function() {
				var win = Ext.create('widget.version.create', {
					document: me.document,
				});
				win.show();
			}
		},'-',{
			text: 'Import Doc',
			glyph: 0xf093,
			scope: this,
			handler: function() {
				var win = Ext.create('widget.rs.rsimport', {
					listeners: {
						scope: this
					},
					//version_id: me.down('combobox').getValue(),
					vstore:me.versions,
					document_id: me.document.id,
					type: 'tc',
				});
				win.show();
			}
		},'-',{
            text: 'Export Doc',
            glyph: 0xf019,
            handler : function() {
            	version_id = me.down('combobox').getValue();
            	console.log(me.version_id);
            	window.open(API+'tc/export?version_id='+me.version_id);
            	return;
            	Ext.Ajax.request({
        			url : API + 'tc/export',
        			params : {ver_id:me.version_id},
        			method: 'get',
        			success : function(response, opts) {
        				console.dir(response);
        			},
        			failure : function(response, opts) {
        				console.log('server-side failure with status code '
        						+ response.status);
        			}
        		});
            }
        },'-',{
            text: 'Add Item',
            glyph: 0xf067, 
            handler : function() {
                var win = Ext.create('widget.tcadd',{listeners:{scope: this}, version_id: me.curr_version.get('id')});
                win.show();
            }
        },'-',{
            text: 'Delete Item',
            glyph: 0xf068,
            handler : function() {

            }
        },'-',{
			text: 'View Doc',
			glyph: 0xf108,
			scope: this,
			hidden:true,
			handler: function() {
				window.open("/viewdoc.html?file="+me.version.get('filename'),"_blank","width=800,height=900");
			}
		},'-',{
			text: 'View Graph',
			glyph: 0xf0e8,
			scope: this,
			handler: function() {
				window.open('/draw/graph.html?document_id='+me.document_id);
			},
			hidden: true
		},'->',{
			xtype: 'textfield',
            fieldLabel: 'Search',  
            labelWidth: 50,
            name: 'searchField', 
            //hideLabel: true,
            width: 200,
            listeners: {
                change: {
                    fn: me.onTextFieldChange,
                    scope: this,
                    //buffer: 500
                }
            }
		}];
        
        me.bbar = Ext.create('Ext.ux.StatusBar',{
			defaultText:me.defaultStatusText,
			name:'searchStatusBar'
		});
        
        me.columns = [
		{text: "tag", dataIndex: "tag", width: 200, hideable: false,
		  summaryType: 'count',
		  summaryRenderer: function(value, summaryData, dataIndex) {
		      return Ext.String.format('{0} item{1}', value, value !== 1 ? 's' : '');
		  }},
		{text: "source", dataIndex: "source_json", width: 200, autoShow: false, renderer : function(value) {
			var arr = [];
			if(value == '') return;
			var data = JSON.parse(value);
			return data.join(', ');
		}},
		{text: "test method", dataIndex: "testmethod", width: 100, renderer: function(tm){if(tm.length==0)return ' ';var str='';for(var i in tm){str+=(tm[i].name+' ')}return str;}},
		{text: "pre condition", dataIndex: "pre_condition", flex: 1},
		];
    	me.callParent(arguments);
    },
    
    features: [{
    	ftype: 'summary',
    	dock: 'top'
    }],
    
    listeners : {
        celldblclick: function(a,b,c, record, item, index, e) {
        	if(c==0){
				window.open('/draw/graph2.html#'+record.get('tag'));
				return;
			}
        	console.log(typeof(record.get('testmethod_id')));
        	if(typeof(record.get('testmethod_id')) != 'object'){ 
        	record.set('testmethod_id',record.get('testmethod_id').split(','));
        	}
        	var win = Ext.create('widget.tcadd',{tc: record, document_id: this.document_id});
            win.down('form').loadRecord(record);
            win.show();
        }
    },
    
    afterRender:function(){
		var me = this;
		me.callParent(arguments);
		me.textField= me.down('textfield[name = searchField]');
		me.statusBar = me.down('statusbar[name = searchStatusBar]');
	},
	
	tagsRe:/<[^>]*>/gm,  //detects html tag gm 参数
	tagsProtect:'\x0f',  //DEL ASCII code
	
	getSearchValue:function(){
		var me = this,
		value = me.textField.getValue();  //?var
		if(value === ''){
			return null;
		}
		if(!me.regExpMode){
			value = Ext.String.escapeRegex(value);
		}else{
			try{
				new RegExp(value);
			}catch(error){
				me.statusBar.setStatus({
					text:error.message,
					//iconCls:'x-status-error'
				});
				return null;
			}
			if(value === '^' || value === '$'){
				return null;
			}
		}
		return value;
	},
	
	onTextFieldChange: function() {
        var me = this,
        count = 0,
        view = me.view,
        cellSelector = view.cellSelector,
        innerSelector = view.innerSelector;

        view.refresh();
        // reset the statusbar
        me.statusBar.setStatus({
            text: me.defaultStatusText,
            iconCls: '',
        });

        me.searchValue = me.getSearchValue();
        me.indexes = [];
        me.currentIndex = null;

        if (me.searchValue !== null) {
            me.searchRegExp = new RegExp(me.getSearchValue(), 'g' + (me.caseSensitive ? '' : 'i'));
            me.store.each(function(record, idx) {
                var td = Ext.fly(view.getNode(idx)).down(cellSelector),
                    cell, matches, cellHTML;
                while (td) {
                    cell = td.down(innerSelector);
                    matches = cell.dom.innerHTML.match(me.tagsRe);
                    cellHTML = cell.dom.innerHTML.replace(me.tagsRe, me.tagsProtect);
                    
                    // populate indexes array, set currentIndex, and replace wrap matched string in a span
                    cellHTML = cellHTML.replace(me.searchRegExp, function(m) {
                       count += 1;
                       if (Ext.Array.indexOf(me.indexes, idx) === -1) {
                           me.indexes.push(idx);
                       }
                       if (me.currentIndex === null) {
                           me.currentIndex = idx;
                       }
                       return '<span class="' + me.matchCls + '">' + m + '</span>';
                    });
                    // restore protected tags
                    Ext.each(matches, function(match) {
                       cellHTML = cellHTML.replace(me.tagsProtect, match); 
                    });
                    // update cell html
                    cell.dom.innerHTML = cellHTML;
                    td = td.next();
                }
            }, me);
         // results found
            if (me.currentIndex !== null) {
                me.getSelectionModel().select(me.currentIndex)   ;
                me.statusBar.setStatus({
                    text: count + ' matche(s) found.',
                    iconCls: 'x-status-valid'
                });
            }
        } 

        // no results found
        if (me.currentIndex === null) {
            me.getSelectionModel().deselectAll();
        }

        me.textField.focus();
    }
    
})
    
  
    