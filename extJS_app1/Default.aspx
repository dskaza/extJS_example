    <%@ Page Title="Home Page" Language="C#" MasterPageFile="~/Site.master" AutoEventWireup="true"
    CodeBehind="Default.aspx.cs" Inherits="extJS_app1._Default" %>

<asp:Content ID="HeaderContent" runat="server" ContentPlaceHolderID="HeadContent">
</asp:Content>
<asp:Content ID="BodyContent" runat="server" ContentPlaceHolderID="MainContent">
    <h2>
        Welcome to ASP.NET!
    </h2>
    <p>
       @{
if (IsPost) { 
string username = Request["username"]; 
string firstName = Request["firstName"]; 
string lastName = Request["lastName"]; 
string role = Request["role"]; 
<p>You entered: <br />
username: @username <br />
first Name: @firstName <br />
last Name: @lastName <br />
role: @role </p>
}
else
{
ne
}


@{var price=50;}
@if (price>30)
{
    <p>The price is too high.</p>
}

    </p>
    <p>
           
    </p>
</asp:Content>
