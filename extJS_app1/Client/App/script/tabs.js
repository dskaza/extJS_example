
    // basic tabs 1, built from existing content
    var tabs = new Ext.TabPanel({
        //renderTo: 'tabs1',
        //renderTo: document.body,
        region: 'center', // a center region is ALWAYS required for border layout
        renderTo: Ext.getBody(),
        activeTab: 0,        
        //width:800,      
        //height:300,     
        //frame:false,
        //plain:true,
        deferredRender: false,
        //tabPosition: 'bottom',
        defaults: { autoHeight: true, autoScroll: true },        
        items:[
            {
                contentEl:'userList', title: 'User list', 
                //autoLoad:'user_list.html'
                html: '<div id="grid"></div>'
                , autoScroll: true
            },
            {
                contentEl:'userDetails', title: 'User details', 
                //autoLoad:'user_details.html'
                html: '<div class="x-clear"></div> <div id="fi-form"></div>' //<script>location.reload();</script>
                , autoScroll: false
                , closable: true
            }
            /*,{
                contentEl:'userDetails', title: 'New user', 
                //autoLoad:'user_details.html'
                html : '<div class="x-clear"></div> <div id="fi-form2"></div>' //<script>location.reload();</script>
            }*/
        ]
    });
