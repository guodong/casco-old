/**
 * Provides for repetitive polling of the server at distinct {@link #interval intervals}.
 * The initial request for data originates from the client, and then is responded to by the
 * server.
 * 
 * Configuration for the PollingProvider can be generated by the server-side
 * API portion of the Ext.Direct stack.
 *
 * An instance of PollingProvider may be created directly via the new keyword or by simply
 * specifying `type = 'polling'`. For example:
 *
 *      var pollA = new Ext.direct.PollingProvider({
 *          type:'polling',
 *          url: 'php/pollA.php',
 *      });
 *      Ext.direct.Manager.addProvider(pollA);
 *      pollA.disconnect();
 *      
 *      Ext.direct.Manager.addProvider({
 *          type:'polling',
 *          url: 'php/pollB.php',
 *          id: 'pollB-provider'
 *      });
 *      var pollB = Ext.direct.Manager.getProvider('pollB-provider');
 *
 */
Ext.define('Ext.direct.PollingProvider', {
    extend: 'Ext.direct.JsonProvider',
    alias:  'direct.pollingprovider',
    
    requires: [
        'Ext.Ajax',
        'Ext.util.TaskRunner',
        'Ext.direct.ExceptionEvent'
    ],
    
    type: 'polling',
    
    /**
     * @cfg {Number} [interval=3000]
     * How often to poll the server-side in milliseconds. Defaults to every 3 seconds.
     */
    interval: 3000,

    /**
     * @cfg {Object} [baseParams]
     * An object containing properties which are to be sent as parameters on every
     * polling request. Note that if baseParams are set and {@link #url} parameter
     * is an URL string, poll requests will use POST method instead of default GET.
     */
    
    /**
     * @cfg {String/Function} url
     * The url which the PollingProvider should contact with each request. This can also be
     * an imported Ext.Direct method which will be passed baseParams as named arguments.
     *
     * *Note* that using string `url` is deprecated, use {@link #pollFn} instead.
     * @deprecated 5.1.0
     */
    
    /**
     * @cfg {String/Function} pollFn
     *
     * Ext.Direct method to use for polling. If a method name is provided as a string,
     * the actual function will not be resolved until the first time this provider
     * is connected.
     *
     * The method should accept named arguments and will be passed {@link #baseParams}
     * if set.
     */
    
    /**
     * @event beforepoll
     * @preventable
     * Fired immediately before a poll takes place.
     *
     * @param {Ext.direct.PollingProvider} this
     */

    /**
     * @event poll
     * Fired immediately after a poll takes place.
     *
     * @param {Ext.direct.PollingProvider} this
     */
    
    constructor: function(config) {
        var me = this;
        
        me.callParent([config]);
        
        me.pollTask = Ext.TaskManager.newTask({
            run: me.runPoll,
            interval: me.interval,
            scope: me
        });
    },
    
    destroy: function() {
        this.pollTask = null;
        
        this.callParent();
    },
    
    doConnect: function() {
        var me = this,
            url = me.url,
            pollFn = me.pollFn;
        
        // It is important that pollFn resolution happens at the time when
        // Provider is first connected, and not at construction time. If
        // pollFn is configured as a string, the API stub may not exist yet
        // when PollingProvider is constructed.
        if (pollFn && Ext.isString(pollFn)) {
            //<debug>
            var fnName = pollFn;
            //</debug>
            
            me.pollFn = pollFn = Ext.direct.Manager.parseMethod(pollFn);
            
            //<debug>
            if (!Ext.isFunction(pollFn)) {
                Ext.Error.raise("Cannot resolve Ext.Direct API method " + fnName +
                                " for PollingProvider");
            }
            //</debug>
        }
        else if (Ext.isFunction(url)) {
            //<debug>
            Ext.log.warn('Using a function for url is deprecated, use pollFn instead.');
            //</debug>
            
            me.pollFn = pollFn = url;
            me.url = url = null;
        }
        
        if (url || pollFn) {
            me.setInterval(me.interval);
            
            me.pollTask.start();
        }
    },

    doDisconnect: function() {
        this.pollTask.stop();
    },
    
    getInterval: function() {
        return this.pollTask.interval;
    },
    
    setInterval: function(interval) {
        var me = this,
            pollTask = me.pollTask;
        
        //<debug>
        if (interval < 100) {
            Ext.Error.raise("Attempting to configure PollProvider " + me.id +
                            " with interval that is less than 100ms.");
                            
        }
        //</debug>
        
        me.interval = pollTask.interval = interval;
        
        if (me.isConnected()) {
            pollTask.restart(interval);
        }
    },
    
    /**
     * @private
     */
    runPoll: function() {
        var me = this,
            url = me.url,
            pollFn = me.pollFn,
            baseParams = me.baseParams,
            args;
        
        if (me.fireEvent('beforepoll', me) !== false) {
            if (pollFn) {
                args = pollFn.directCfg.method.getArgs({
                    params: baseParams !== undefined ? baseParams : {},
                    callback: me.onPollFn,
                    scope: me
                });
                
                pollFn.apply(window, args);
            }
            else {
                Ext.Ajax.request({
                    url: url,
                    callback: me.onData,
                    scope: me,
                    params: baseParams
                });
            }
            
            me.fireEvent('poll', me);
        }
    },

    /**
     * @private
     */
    onData: function(opt, success, response) {
        var me = this, 
            i, len, events;
        
        if (success) {
            events = me.createEvents(response);
            
            for (i = 0, len = events.length; i < len; ++i) {
                me.fireEvent('data', me, events[i]);
            }
        }
        else {
            events = new Ext.direct.ExceptionEvent({
                data: null,
                code: Ext.direct.Manager.exceptions.TRANSPORT,
                message: 'Unable to connect to the server.',
                xhr: response
            });
            
            me.fireEvent('data', me, events);
        }
    },
    
    /**
     * @private
     */
    onPollFn: function(result, event, success, options) {
        this.onData(null, success, { responseText: result });
    },
    
    inheritableStatics: {
        checkConfig: function(config) {
            // Polling provider needs either URI or pollFn
            return config && config.type === 'polling' &&
                   (config.url || config.pollFn);
        }
    }
});