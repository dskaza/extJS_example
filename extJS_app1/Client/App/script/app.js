

//click from tree item menu
function clickUser(item) {

    var tabPanel = Ext.getCmp('tabs');

    var activeTab = tabPanel.getActiveTab(),
        sibling = activeTab.nextSibling();
    if (sibling) tabPanel.setActiveTab(sibling);
//activeTab.disable();
//console.log(activeTab);
     
    if (item.text == 'User roles') {
        //Ext.userData.tabs.setActiveTab(0);
        Ext.getCmp('tabs').setActiveTab(0);        
    } else if (item.text.split(' ').length != 1) {        
        Ext.getCmp('username').setValue(item.id);
        Ext.iterate(mystore.data.items, function (key, value) {
            //console.log('Item' + value + ': ' + key.data.username);
            if (key.data.username == item.id) {
                Ext.getCmp('username').setReadOnly(true);
                //Ext.getCmp('username').setDisabled(true);        
                Ext.getCmp('firstName').setValue(key.data.Firstname);
                Ext.getCmp('lastName').setValue(key.data.lastName);
                Ext.getCmp('role').setValue(key.data.role);
            }
        });
        //Ext.userData.tabs.setActiveTab(1);
        Ext.getCmp('tabs').setActiveTab(1);
    }
}


//
// Finaly on ready definition
//
Ext.onReady(function () {
    
    //
    // This is the main layout definition.
    //
    Ext.QuickTips.init();
    /*
    var myDiv = Ext.get('south');
    
    myDiv.highlight();      // The element's background will highlight to yellow then fade back
    myDiv.addClass('red');  // Add a custom CSS class (defined in ExtStart.css)
    myDiv.center();         // Center the element in the viewport
    myDiv.setOpacity(.25);  // Make the element partially-transparent
console.log(myDiv);
*/
    // NOTE: This is an example showing simple state management. During development,
    // it is generally best to disable state management as dynamically-generated ids
    // can change across page loads, leading to unpredictable results.  The developer
    // should ensure that stable state ids are set for stateful components in real apps.
    Ext.state.Manager.setProvider(new Ext.state.CookieProvider());

    var viewport = new Ext.Viewport({
        layout: 'border',
        title: 'EXT Simple GUI',
        items: [
        //northPanel
        /*
        new Ext.BoxComponent({
        region: 'north',
        height: 32, // give north and south regions a height
        applyTo: 'header'
        }),
        */
            southPanel,
            easthPanel,
            westPanel,
            tabPanel
        ]

    });

    // get a reference to the HTML element with id "drevo"
    var tree = Ext.getCmp('drevo');
    tree.getRootNode().expand();
    tree.render();
    //var root1 = Ext.getCmp('source');
    //root1.expand();
});
