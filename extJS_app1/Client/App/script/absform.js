//
//form panel
//

	Ext.QuickTips.init();

	var roles = getUserRoles();

    var msg = function(title, msg){
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
            readOnly: true, 
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
		new Ext.form.ComboBox({
            fieldLabel: 'User role',
			id: 'role',
            hiddenName:'roleId',
			hiddenId:'roleId',
            store: new Ext.data.ArrayStore({
                fields: ['id', 'role'],
                data : roles // from states.js
            }),
            valueField:'id',
            displayField:'role',
            typeAhead: true,
            mode: 'local',
            triggerAction: 'all',
            emptyText:'Select a user role...',
            selectOnFocus:true,
            width:190
        })
		]
        /*,
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
                            //console.log('action');
                            //console.log(action);
                            for (key in action) {
                                //console.log('key');
                                //console.log(action[key]);
                            }
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');                            
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
        */
    });
    //fp.render('fi-form');

    fp.on({
        actioncomplete: function(form, action){
            if(action.type == 'load'){
                submit.enable();
            }
        }
    });
    
    //store.load();
    fp.show();
//