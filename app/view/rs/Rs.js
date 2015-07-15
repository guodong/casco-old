var cvd = 0;
Ext.define('casco.view.rs.Rs', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.rs',
	requires: ['casco.view.rs.RsImport', 'casco.store.Rss', 'casco.view.rs.RsDetail',
	           'casco.store.Versions','casco.view.document.version.Create',
	           'Ext.toolbar.TextItem','Ext.form.field.Checkbox',
	           'Ext.form.field.Text','Ext.ux.statusbar.StatusBar'],
	autoHeight: true,
	allowDeselect: false,
	viewModel: 'main',
	
	//search参数
	searchValue:null,
	indexes:[],
	//currentIndex:null,
	searchRegExp:null,
	//caseSensitive:false,
	regExpMode:false,
	matchCls:'x-livesearch-match',
	defaultStatusText:'Nothing Found',
	
	initComponent: function() {
		var me = this;
		me.versions = new casco.store.Versions();
		me.store = new casco.store.Rss();
		me.versions.load({
			params:{
				document_id: me.document.id
			},
			synchronous: true,
			callback: function(){
				me.down('combobox').select(me.versions.getAt(0));     //取最近的版本
				var latest_v = me.versions.getCount() > 0?me.versions.getAt(0):0;
				me.curr_version = latest_v;
				if(latest_v){
					me.store.load({
						params: {
							version_id: latest_v.get('id')
						}
					});
					me.store.each(function(rs){     
						if(rs.tcs.length){
							cvd++;
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
            editable: true,
            lastQuery: '',
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
		},{
			text: 'Create Version',
			glyph: 0xf067,
			scope: this,
			//hidden:true,
			handler: function() {
				var win = Ext.create('widget.version.create', {
					document: me.document,
				});
				
				win.show();
			}
		},{
			text: 'Import Document',
			glyph: 0xf093,
			scope: this,
			handler: function() {
				var win = Ext.create('widget.rs.rsimport', {
					listeners: {
						scope: this
					},
					//version_id: me.down('combobox').getValue(),
					document_id: me.document.id,
					vstore:me.versions,
					type: 'rs'
				});
				win.show();
				}   
		},{
			text: 'View Document',
			glyph: 0xf108,
			scope: this,
			handler: function() {
				window.open("/viewdoc.html?file="+me.curr_version.get('filename'),"_blank","width=800,height=900");
			}
		},{
			text: 'View Graph',
			glyph: 0xf0e8,
			scope: this,
			handler: function() {
				window.open('/draw/graph.html?document_id='+me.document_id);
			},
			hidden: true
		},{
			text: 'View Statistics',
			glyph: 0xf080,
			scope: this,
			handler: function() {
				window.open('/stat/cover.htm#'+me.document_id);
			}
		},'Search',{
            xtype: 'textfield',
            name: 'searchField',
            hideLabel: true,
            width: 200,
            listeners: {
                change: {
                    fn: me.onTextFieldChange,
                    scope: this,
                    buffer: 500
                }
            }
       }];
		
		me.bbar = Ext.create('Ext.ux.StatusBar',{
			defaultText:me.defaultStatusText,
			name:'searchStatusBar'
		});
		
		me.listeners = {
			celldblclick: function(a,b,c,record){
				if(c==0){
					window.open('/draw/graph2.html#'+record.get('tag'));
					return;
				}
				if(c==5||c==6){
					var st = Ext.create('casco.store.Vat');
					st.setData(record.get('vat'));
					if(record.get('vatstr'))
						st.add({id: record.get('vatstr').id, tag: record.get('vatstr').name});
					var wd = Ext.create("casco.view.rs.vat.Add", {
						vat: st,
						document_id: me.document_id
					});
					wd.show();
					return;
				}
				var win = Ext.create('widget.rs.rsdetail', {
					rs: record,
					editvat: c==6||c==5,
					document_id: me.document_id
				});
				win.down('form').loadRecord(record);
				win.show();
			}
		};
		me.columns = [{
			text: "tag",
			dataIndex: "tag",
			width: 130,
	        summaryType: 'count',
	        summaryRenderer: function(value, summaryData, dataIndex) {
	            return Ext.String.format('{0} item{1}', value, value !== 1 ? 's' : '');
	        }
		}, {
			text: "allocation",
			dataIndex: "allocation",
			flex: 1
		}, {
			text: "implement",
			dataIndex: "implement",
			width: 100,
	        summaryRenderer: function(value, summaryData, dataIndex) {
	            //return 'covered:' +cvd;
	        }
		}, {
			text: "category",
			dataIndex: "category",
			width: 130
		}, {
			text: "tcs",
			dataIndex: "tcs",
			width: 250,
			renderer: function(value) {
				var str = ""; 
				Ext.Array.each(value, function(v) {
					str += v.tag + " ";
				});
				return str;
			}
		}, {
			text: "vat",
			dataIndex: "vat",
			width: 250,
			renderer : function(value) {
				if(!value) return '';
				var arr = [];
				Ext.Array.each(value, function(v) {
			        arr.push(v.tag);
			    });
				return arr.join(', ');
			}
		}, {
			text: "vat string",
			dataIndex: "vatstr",
			width: 100,
			renderer: function(value) {
				return value?value.name:'';
			}
		}/*, {
			text: "result",
			dataIndex: "result",
			width: 70,
			renderer : function(value) {
				switch(value){
				case 0:
					return 'untested';
				case 1:
					return '<span style="color:green">passed</span>';
				case 2:
					return '<span style="color:red">failed</span>';
				}
			}
		}*/];
		me.callParent(arguments);
	},
	
	afterRender:function(){
		var me = this;
		me.callParent(arguments);
		me.textField= me.down('textfield[name = searchField]');
		me.statusBar = me.down('statusbar[name = searchStatusBar]');
	},
	tagsRe:/<[^>]*>/gm,  //detects html tag
	tagsProtect:'\x0f',  //DEL ASCII code
	getSearchValue:function(){
		var me = this,
		value = me.textField.getValue();
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
					iconCls:'x-status-error'
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
            iconCls: ''
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
                me.getSelectionModel().select(me.currentIndex);
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
    },

	
    viewConfig: { 
        stripeRows: false, 
        getRowClass: function(record) {
        	if(record.get('tcs') == undefined)
        		return 'red';
        	if(record.get('tcs').length != 0)
        		return ''; 
        	if(record.get('tcs').length == 0 && !record.get('vat').length && !record.get('vatstr'))
        		return 'red'; 
        	if(!record.get('vat').length || record.get('vatstr'))
        		return 'yellow'; 
        } 
    },
    features: [{
    	ftype: 'summary',
    	dock: 'top'
    }],
	
})