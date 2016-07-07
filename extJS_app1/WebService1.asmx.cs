using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;
using System.Web.Script.Serialization;

namespace extJS_app1
{
    /// <summary>
    /// Summary description for WebService1
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    // [System.Web.Script.Services.ScriptService]
    public class WebService1 : System.Web.Services.WebService
    {
        public object lbErrorDescription { get; private set; }

        [WebMethod]
        public string HelloWorld()
        {
            return "Hello World";
        }
        /*
        [WebService(Namespace = "localhost")]
        [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
        [System.ComponentModel.ToolboxItem(false)]
        [System.Web.Script.Services.ScriptService]
        public class Director : System.Web.Services.WebService
        {*/

        public class SimpleResult
        {
            public string result;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json, UseHttpGet = true, XmlSerializeString = false)]
        public string userPost() //string[] args
        {
            string json;

            string s = @"{ 'result': 'success' }";
            dynamic result = new JavaScriptSerializer().Serialize(s);
            return result;
            /*
            try
            {

                JavaScriptSerializer serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
                */

            //string username = Request["username"];
            //string firstName = Request["firstName"];
            //string lastName = Request["lastName"];
            //string role = Request["role"];

            // Produkt p = new Produkt();                
            /*
                XmlSerializer serializer = new XmlSerializer(typeof(Produkt));
                FileStream fs = new FileStream("TestProdukt.xml", FileMode.Open);
                p = (Produkt)serializer.Deserialize(fs);
                txBoxCenaNov.Text = p.cena_produkta;
                txBoxIDProduktaNov.Text = p.id_produkta;
                txBoxNazivNov.Text = p.naziv_produkta;
*/


            //string json = "[{\"ID\":\"0\",\"NAME\":\"ALAN\"},{\"ID\":\"1\",\"NAME\":\"BLAKE\"}]";
            //json = @"{ ""call"":""KF6GPE"",""type"":""l"",""time"":""1399371514"",""lasttime"":""1418597513"",""lat"": 37.17667,""lng\"": -122.14650,""result"": ""ok"" }";


            //System.Diagnostics.Debug.WriteLine(json);

            //reading and writing json on the client
            /*
            dynamic result = serializer.DeserializeObject(json);
                foreach (KeyValuePair<string, object> entry in result)
                {
                    var key = entry.Key;
                    var value = entry.Value as string;
                    Console.WriteLine(String.Format("{0} : {1}", key, value));
                }
                Console.WriteLine(serializer.Serialize(result));
                var anotherResult = new SimpleResult { result = "ok" };
                Console.WriteLine(serializer.Serialize(anotherResult));
            } 
            */
            /*
            catch (System.Exception e2)
            {
                    //lbErrorDescription.Text = e2.Message.ToString();
            }
           */
            


            return "";
       }

        //serialize()
        public string serialize(Object  o)
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();

            return serializer.Serialize(o);
        }

        //deserialize()
        public dynamic deserialize(string jSON, Type targetType)
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();

            return serializer.Deserialize(jSON, targetType);
        }

        private class Produkt
        {            
            private string mUsername = "";
            private string mFirstname = "";
            private string mlastname = "";
            private string mRole = "";         
        }        
        //}
    }
 
}
