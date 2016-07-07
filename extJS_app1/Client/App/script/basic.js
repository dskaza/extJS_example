

// create the Data Store
var mystore = getUsers();
//console.log(mystore);
//var mystore1 = getUsers1();
//console.log(mystore1);
//mystore1.load();

var userRoles = getUserRoles();
//console.log(userRoles);

var comboUserRole = new Ext.form.ComboBox({
    fieldLabel: 'User role',
    id: 'role',
    hiddenName: 'roleId',
    hiddenId: 'roleId',
    store: new Ext.data.ArrayStore({
        fields: ['id', 'role'],
        data: userRoles // from states.js
    }),
    valueField: 'id',
    displayField: 'role',
    typeAhead: true,
    mode: 'local',
    triggerAction: 'all',
    emptyText: 'Select a user role...',
    selectOnFocus: true,
    width: 190
});


//
//DEFAULT panel items for viewPort
//


//
//form panel
//
//Ext.QuickTips.init();

var msg = function (title, msg) {
    Ext.Msg.show({
        title: title,
        msg: msg,
        minWidth: 200,
        modal: true,
        icon: Ext.Msg.INFO,
        buttons: Ext.Msg.OK
    });
};
var fp = new Ext.FormPanel({
    id: "form1",
    //renderTo: 'fi-form',
    //fileUpload: true,
    //url:'save-form.php',
    width: 500,
    frame: true,
    title: 'User details',
    deferredRender: false,
    autoShow: true,
    autoHeight: true,
    bodyStyle: 'padding: 10px 10px 0 10px;',
    labelWidth: 50,
    //closable: true,
    buttonAlign: 'center',
    defaults: {
        anchor: '95%',
        allowBlank: false,
        //readOnly: true,
        msgTarget: 'side'
    },
    items: [{
        xtype: 'textfield',
        emptyText: 'username',
        id: 'username',
        //readOnly: true, 
        fieldLabel: 'username'
    },
		{
		    xtype: 'textfield',
		    emptyText: 'First Name',
		    id: 'firstName',
		    fieldLabel: 'First Name'
		},
		{
		    xtype: 'textfield',
		    emptyText: 'Last Name',
		    id: 'lastName',
		    fieldLabel: 'Last Name'
		},
		comboUserRole
        ,{
		    xtype: 'label',
		    emptyText: '',
		    id: 'resultMessage'
		}
    ]
    ,
    buttons: [{
        text: 'Save',            
        handler: function(){
            if(fp.getForm().isValid()){
                fp.getForm().submit({
                //url: 'form_submit.cs',
                //url: '../../Default.aspx',
                url: '../../WebService1.asmx/userPost',
                //url: '?hander/save',
                //url: 'javascript: test(); ',
                method: 'POST',
                //jsonData: items,
                waitMsg: 'Saving data...',
                params: fp.getForm().getFieldValues(true),
                success: function(fp, o) {
                    //console.log('o');
                    //console.log(o);
                    msg('Success', 'Save user "'+o.result+'" on the server');
                },
                failure: function (fp, action) {
                    console.log('action');
                    console.log(action);
                    for (key in action) {
                    console.log('key');
                   console.log(action[key]);
                    }
                    Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response :-(');
                }
            });
        }
    }
    },{
        text: 'Reset',
        iconCls: 'nav', // see the HEAD section for style used
        handler: function(){
            fp.getForm().reset();
        }
    }]
});
//fp.render('fi-form');

fp.on({
    actioncomplete: function (form, action) {
        if (action.type == 'load') {
            submit.enable();
        }
    }
});

fp.show();
//

//
//GRID panel
//   
Ext.ns('Ext.ux.grid');
var editor = new Ext.ux.grid.RowEditor({
    saveText: 'Update'
});

var User = Ext.data.Record.create([{
    name: 'username',
    type: 'string'
}, {
    name: 'firstname',
    type: 'string'
}, {
    name: 'lastName',
    type: 'string'
}, {
    name: 'dateinserted',
    type: 'date',
    dateFormat: 'n/j/Y'
}, {
    name: 'role',
    type: 'string'
}
]);

// hideous function to generate user data
/*
var genData = function () {
    var data = [];
    data.push({
        //dateinserted: s.clearTime(true).add(Date.DAY, Ext.ux.getRandomInt(0, 27)),
        dateinserted: (new Date()).clearTime(),
        username: 'user name',
        firstname: 'first name',
        lastName: 'Last name',
        role: 'select a user role'
    });
    return data;
}

var store = new Ext.data.GroupingStore({
    reader: new Ext.data.JsonReader({ fields: User }),
    data: genData(),
    sortInfo: { field: 'username', direction: 'ASC' }
});
console.log('store');
console.log(store);
*/

var grid = new Ext.grid.GridPanel({
    id: "grid",
    title: 'User list',
    autoScroll: true,
    store: mystore,        
    layout: 'fit',
    margins: '0 5 5 5',    
    plugins: [editor],
    /*
    view: new Ext.grid.GroupingView({
        markDirty: false
    }),
    */
    tbar: [{
        iconCls: 'icon-user-add',
        text: 'Add User',
        handler: function () {
            var e = new User({
                username: 'user name',
                firstname: 'first name',
                lastName: 'Last name',
                dateinserted: (new Date()).clearTime(),
                role: new Ext.form.ComboBox({
                    fieldLabel: 'User role',
                    id: 'role',
                    hiddenName: 'roleId',
                    hiddenId: 'roleId',
                    store: new Ext.data.ArrayStore({
                        fields: ['id', 'role'],
                        data: userRoles // from states.js
                    }),
                    valueField: 'id',
                    displayField: 'role',
                    typeAhead: true,
                    mode: 'local',
                    triggerAction: 'all',
                    emptyText: 'Select a user role...',
                    selectOnFocus: true,
                    width: 190
                }) //'select a user role'
            });
            editor.stopEditing();
            mystore.insert(0, e);
            grid.getView().refresh();
            grid.getSelectionModel().selectRow(0);
            editor.startEditing(0);
        }
    }, {
        ref: '../removeBtn',
        iconCls: 'icon-user-delete',
        text: 'Remove User',
        disabled: true,
        handler: function () {
            editor.stopEditing();
            var s = grid.getSelectionModel().getSelections();
            for (var i = 0, r; r = s[i]; i++) {
                mystore.remove(r);
            }
        }
    }],

    columns: [
        //new Ext.grid.RowNumberer(),
        {
            header: "Date inserted", width: 120, dataIndex: 'dateinserted', sortable: true
            , editor: {
                xtype: 'datefield',
                allowBlank: false,
                minValue: '2006-01-01',
                minText: 'Can\'t have a start date before the company existed!',
                //format: 'Y-m-d', //Y-m-d g:i A
                maxValue: (new Date()).format('Y-m-d g:i A')
            }
        },
        {
            header: "Username", width: 115, dataIndex: 'username', sortable: true
            , editor: {
                xtype: 'textfield',
                allowBlank: false
           }
        },
        {
            header: "First Name", width: 180, dataIndex: 'Firstname', sortable: true
            , editor: {
                xtype: 'textfield',
                allowBlank: false
           }
        },
		{
		    header: "Last name", width: 180, dataIndex: 'lastName', sortable: true
		    , editor: {
		        xtype: 'textfield',
		        allowBlank: false
		    }
		},
        {
            header: "User Role", width: 100, dataIndex: 'role', sortable: true
            , editor: comboUserRole
        }
    ],
    //renderTo: 'grid',
    stateful: true,
    stateId: 'grid',
    width: 700,
    height: 200
});

mystore.load();


var cstore = new Ext.data.JsonStore({
    fields: ['username', 'firstname', 'lastname'],
    data: [],
    refreshData: function () {
        var o = {}, data = [];
        var s = new Date(2007, 0, 1);
        var now = new Date(), i = -1;
        while (s.getTime() < now.getTime()) {
            var m = {
                username: s.format('M y'),
                firstname: '',
                lastname: '',
                index: ++i
            }
            data.push(m);
            o[m.username] = m;
            s = s.add(Date.MONTH, 1);
        }
        mystore.each(function (r) {
            var m = o[r.data.start.format('M y')];
            for (var i = m.index, mo; mo = data[i]; i++) {
                mo.firstname += 10000;
                mo.lastname += r.data.salary;
            }
        });
        this.loadData(data);
    }
});
cstore.refreshData();
mystore.on('add', cstore.refreshData, cstore);
mystore.on('remove', cstore.refreshData, cstore);
mystore.on('update', cstore.refreshData, cstore);




//
// TREE
//
var Tree = Ext.tree;
var tree = new Ext.tree.TreePanel({
    id: 'drevo',
    title: 'Navigation',
    iconCls: 'nav', // see the HEAD section for style used
    //renderTo: 'tree-div',
    animate: true,
    enableDD: false,
    loader: new Tree.TreeLoader(), // Note: no dataurl, register a TreeLoader to make use of createNode()
    lines: true,
    //selModel: new Ext.tree.MultiSelectionModel(),
    autoScroll: true,
    containerScroll: true,
    layout: 'fit',
    root: {
        nodeType: 'async',
        text: 'Ext JS',
        draggable: false,
        id: 'source'
    }
        , listeners: {
            click: function (item) {
                clickUser(item);
            }
        }
});

var json = [];
Ext.iterate(userRoles, function (key, value) {
    var userChilds = [], val = 1;
    mystore.on('load', function () {
        mystore.data.each(function () {
            if (this.data['role'] == key[1]) {
                userChilds.push({ "text": this.data['Firstname'] + ' ' + this.data['lastName'], "id": this.data['username'], "leaf": true, "cls": "file" });
            }
            val = val + 1;
        });
    });
    json.push({ "text": key[1], "id": 100 + value + 1, "leaf": false, "cls": "folder", "children": userChilds });
});

// set the root node
var root1 = new Tree.AsyncTreeNode({
    text: 'User roles',
    draggable: false,
    id: 'source',
    children: json
});

tree.setRootNode(root1);
//tree.getRootNode().expand();

//tree.render();
//root1.expand();



//
//south panel
//
/*{       
xtype: 'box',
region: 'north',
applyTo: 'header',
height: 30
},*/
/*
autoEl: {
tag: 'div',
html: '<p>north - generally for menus, toolbars and/or advertisements</p>'                
}
var northPanel = 
new Ext.BoxComponent({
region: 'north',
height: 32, // give north and south regions a height
applyTo: 'header'
});
*/
var southPanel = {
    // lazily created panel (xtype:'panel' is default)
    region: 'south',
    title: 'Footer',
    //contentEl: 'south',
    split: true,
    //height: 100,
    height: 50,
    minSize: 100,
    maxSize: 200,
    collapsible: true,    
    margins: '0 0 0 0',
    padding: '0 150 0 150',
    html: 'Copyright &copy; 2016 Denis Skaza'
};

//
//easth panel
//
var easthPanel = {
    region: 'east',
    title: 'East Side',
    collapsible: true,
    split: true,
    width: 225, // give east and west regions a width
    minSize: 175,
    maxSize: 400,
    margins: '0 5 0 0',
    layout: 'fit', // specify layout manager for items
    items:            // this TabPanel is wrapped by another Panel so the title will be applied
                    new Ext.TabPanel({
                        border: false, // already wrapped so don't add another border
                        activeTab: 1, // second tab initially active
                        tabPosition: 'top', //bottom
                        items: [{
                            html: '<p>A TabPanel component can be a region.</p>',
                            title: 'A Tab',
                            autoScroll: true
                        }, new Ext.grid.PropertyGrid({
                            title: 'Property Grid',
                            closable: true,
                            source: {
                                "(name)": "Properties Grid",
                                "grouping": false,
                                "autoFitColumns": true,
                                "productionQuality": false,
                                "created": new Date(Date.parse('10/15/2006')),
                                "tested": false,
                                "version": 0.01,
                                "borderWidth": 1
                            }
                        })]
                    })
};


//
//west panel
//
var westPanel = {
    region: 'west',
    id: 'west-panel', // see Ext.getCmp() below
    title: 'West',
    split: false,
    width: 200,
    minSize: 175,
    maxSize: 400,
    collapsible: false,
    margins: '0 0 0 5',
    layout: {
        type: 'accordion',
        animate: true
    },
    items: [
        //meni drevo
        Ext.getCmp('drevo')
        , {
            title: 'Settings',
            html: '<p>TODO</p>',
            border: false,
            iconCls: 'settings'
        }
    ]
};


//
//tab panel
//
var tabPanel = new Ext.TabPanel({
    id: "tabs",
    region: 'center', // a center region is ALWAYS required for border layout                            
    activeTab: 0,
//disabled: true,
    //width:800,      
    //height:300,     
    //frame:false,
    //plain:true,
    deferredRender: false,
    autoScroll: true,       
    //tabPosition: 'bottom',
    //defaults: { autoHeight: true, autoScroll: true },
    items: [
    // tab 1 user list
                        Ext.getCmp('grid'),
    //tab 2 user details
                        Ext.getCmp('form1')
    ]
    /*
    , listeners: {
       'afterlayout': {
            fn: function(p){
                p.disable();
            },
            single: true // important, as many layouts can occur
        }
    }
    */
});

//from users.XML
function getUsersFromXML() {
    return new Ext.data.Store({
        url: 'Store/users.xml',
        reader: new Ext.data.XmlReader({
            record: 'Item',
            fields: ['username', 'dateinserted', 'Firstname', 'lastName', 'role']
        })
    });
}

//from users.json
function getUsers() {
    return new Ext.data.Store({
        url: 'Store/users.json',
        reader: new Ext.data.JsonReader({
            root: 'users',
            //totalProperty: 'results',
            fields: ['username', 'dateinserted', 'Firstname', 'lastName', 'role'],
            idProperty: 'username',
            storeId: 'mystore'
        })
    });
}

function getUsers1() {
    return new Ext.data.JsonStore({
        url: 'Store/users.json',
        root: 'users',
        //totalProperty: 'results',
        fields: ['username', 'dateinserted', 'Firstname', 'lastName', 'role'],
        idProperty: 'username',
        storeId: 'mystore'
    });
}

