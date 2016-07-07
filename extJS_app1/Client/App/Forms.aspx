<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Forms.aspx.cs" Inherits="extJS_app1.Client.App.Forms" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">    
    <title>Simple GUI with tree, grid panel and form panel</title>
    <link rel="stylesheet" type="text/css" href="resources/css/ext-all.css" />
    <!-- GC -->
    <!-- LIBS -->
    <script type="text/javascript" src="../lib/Ext/ext-base.js"></script>
    <!-- ENDLIBS -->
    <script type="text/javascript" src="../lib/Ext/ext-all.js"></script>
 <!-- 
   <script type="text/javascript" src="../lib/Ext/ext-all-debug.js"></script> 
-->

    <script type="text/javascript" src="script/app.js"></script>

    <script type="text/javascript" src="Store/states.js"></script> <!-- user roles for combobox -->
    
    <!-- Tabs Example Files -->
    <link rel="stylesheet" type="text/css" href="resources/css/tabs-example.css" />
    <script type="text/javascript" src="script/tabs.js"></script>
    <!-- GRID -->
    <script type="text/javascript" src="script/grid.js"></script>
    <link rel="stylesheet" type="text/css" href="resources/css/grid-examples.css" />
    <!-- form panel -->
    <script type="text/javascript" src="script/absform.js"></script>
    <link rel="stylesheet" type="text/css" href="resources/css/forms.css" />

    <script type="text/javascript">
        Ext.onReady(function () {
            var movie_form = new Ext.FormPanel({
                url: 'movie-form-submit.aspx',
                //renderTo: Ext.getBody(),
                renderTo: 'myform',
                frame: true,
                title: 'Movie Information Form',
                width: 250,
                items: [{
                    xtype: 'textfield',
                    fieldLabel: 'Title',
                    name: 'title'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Director',
                    name: 'director'
                }, {
                    xtype: 'datefield',
                    fieldLabel: 'Released',
                    name: 'released'
                }]
            });
        });
    </script>
</head>
<body>
    <form id="form1" runat="server">
     <div id="myform"></div> 
    </form>
</body>
</html>
