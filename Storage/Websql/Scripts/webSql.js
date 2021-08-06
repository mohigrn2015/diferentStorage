
  var DatabaseName = 'MyDatabase';  
  var imageName= "";
  var Version = 1.0;  
  var TextDescription = 'My First Web-SQL Example';  
  var DatabaseSize = 2 * 1024 * 1024;  
  var dbObj = openDatabase(DatabaseName, Version, TextDescription, DatabaseSize);  
   dbObj.transaction(function (tx) {

       tx.executeSql('CREATE TABLE IF NOT EXISTS EmployeeTable (id unique, Name, Location, did, image)');  
       tx.executeSql('CREATE TABLE IF NOT EXISTS deptTable (did unique, dName,estd)');  


       var today = new Date();  
       var dd = today.getDate();  
       var mm = today.getMonth() + 1;

       var yyyy = today.getFullYear();  
       if (dd < 10) {  
           dd = '0' + dd  
       }  
       if (mm < 10) {  
           mm = '0' + mm  
       }  
       var today = dd + '/' + mm + '/' + yyyy;  

       tx.executeSql('insert into deptTable(did, dName, estd) values(1,"IT","' + today + '")');  
       tx.executeSql('insert into deptTable(did, dName, estd) values(2,"HR","' + today + '")');  
       tx.executeSql('insert into deptTable(did, dName, estd) values(3,"Payroll","' + today + '")');  
       tx.executeSql('insert into deptTable(did, dName, estd) values(4,"Accounts","' + today + '")');  

       alldetails();  
   });  


   function Insert() {  
       
       var id = document.getElementById("tbID").value;  
       var name = document.getElementById("tbName").value;  
       var location = document.getElementById("tbLocation").value;  
       var did = document.getElementById("tbLdept").value; 

       dbObj.transaction(function (tx) {  
           tx.executeSql('insert into EmployeeTable(id, Name, Location, did, image) values(' + id + ',"' + name + '","' + location + '",' + did + ', "' + imageName + '")');  

       });  

      alldetails();  
   }  

   function del() {  
       var id = document.getElementById("ddlid").value;  
       dbObj.transaction(function (tx) {  
           tx.executeSql('delete from EmployeeTable where id=' + id + '');  
       });  

       empidbind();  

       alldetails();  
   }  


   function myFunction()  
   {  
       var id = document.getElementById("ddlid").value;  

       dbObj.transaction(function (tx) {  
           tx.executeSql('SELECT * from EmployeeTable where id=' + id + '', [], function (tx, results)  
           {  
onsole.log(results.rows);


               document.getElementById("tbName").value = results.rows.item(0).Name;  
               document.getElementById("tbLocation").value = results.rows.item(0).Location;  
               document.getElementById("tbLdept").value = results.rows.item(0).did;  
$('#blah').attr('src', results.rows.item(0).image);					
                 
           }, null);  
       });  
        
   }  

   function showdel() {  
       empidbind();  
       $('#tdorginal').hide();  
       $('#tdid').show();  
       $('#btnupdate').hide();  
       $('#btnInsert').hide();  
       $('#btndel').show();  
       $('#btninsertshw').show();  
       $('#btnupdateshw').show();  
       $('#btndeleteshw').hide();  
       $('#rowName').hide();  
       $('#rowLocation').hide();  
       $('#rowdept').hide();  
   } 
   function showin()  
   {  
       $('#tdid').hide();  
       $('#tdorginal').show();  
       $('#btnupdate').hide();  
       $('#btnInsert').show();  
       $('#btndel').hide();  
       $('#btninsertshw').hide();  
       $('#btnupdateshw').show();  
       $('#btndeleteshw').show();   
       $('#rowName').show();  
       $('#rowLocation').show();  
       $('#rowdept').show();  

     document.getElementById("tbID").value='';  
     document.getElementById("tbName").value='';  
     document.getElementById("tbLocation").value='';  
     document.getElementById("tbLdept").value='1';  

          empidbind();  
   }  


   function empidbind()  
   {  
       dbObj.transaction(function (tx) {  
           tx.executeSql('SELECT * from EmployeeTable', [], function (tx, results) {  
               var len = results.rows.length, i;  
               document.getElementById("ddlid").innerHTML = '';  
               var str = '';  
               for (i = 0; i < len; i++) {  
                   str += "<option value=" + results.rows.item(i).id + ">" + results.rows.item(i).id + "</option>";  
                   document.getElementById("ddlid").innerHTML += str;  
                   str = '';  
               }  
           }, null);  
       });  

   }  

   function showupdte()  
   {  
       empidbind();  
       $('#tdorginal').hide();  
       $('#tdid').show();  
       $('#btnupdate').show();  
       $('#btnInsert').hide();  
       $('#btndel').hide();  
       $('#btninsertshw').show();  
       $('#btnupdateshw').hide();  
       $('#btndeleteshw').show();  
       $('#rowName').show();  
       $('#rowLocation').show();  
       $('#rowdept').show();  
         
   }  

   function updte() {  
       
       var id = document.getElementById("ddlid").value;  
       var name = document.getElementById("tbName").value;  
       var location = document.getElementById("tbLocation").value;  
       var did = document.getElementById("tbLdept").text;  

       dbObj.transaction(function (tx) {  
           tx.executeSql('update EmployeeTable set Name="' + name + '",Location="' + location + '",did="' + did + '", image="' + imageName + '" where id=' + id + '');  
       });  

       alldetails();  
   }  

   function alldetails()  
   {  

       dbObj.transaction(function (tx) {  
           tx.executeSql('SELECT e.id,e.Name,e.Location,e.image, d.dName,d.did FROM EmployeeTable e left join deptTable d on e.did=d.did ', [], function (tx, results) {  

   $('#blah').attr('src', results.rows.item(0).image);

var len = results.rows.length, i;  
               $("#tblGrid").find("tr:gt(0)").remove();  
               var str = '';  
               for (i = 0; i < len; i++) {  
                   str += "<tr>";  
                   str += "<td>" + results.rows.item(i).id + "</td>";  
                   str += "<td>" + results.rows.item(i).Name + "</td>";  
                   str += "<td>" + results.rows.item(i).Location + "</td>";  
                   str += "<td>" + results.rows.item(i).dName + "</td>";  
	str += "<td><img src=" + results.rows.item(i).image + " width='64' height='64'></td>";  
                   str += "</tr>";  
                   document.getElementById("tblGrid").innerHTML += str;  
                   str = '';  
               }  
           }, null);  
       });  

   }  

   dbObj.transaction(function (tx) {  
       tx.executeSql('SELECT * from deptTable', [], function (tx, results) {  
           var len = results.rows.length, i;  
           var str = '';  
           for (i = 0; i < len; i++) {  
               str += "<option value=" + results.rows.item(i).did + ">" + results.rows.item(i).dName + "</option>";  
               document.getElementById("tbLdept").innerHTML += str;  
               str = '';  
           }  
       }, null);  
   });  



  function readURL(input) {
       if (input.files && input.files[0]) {
           var reader = new FileReader();

           reader.onload = function (e) {
console.log(input.files[0].name);
imageName=e.target.result;
               $('#blah').attr('src', e.target.result);

           };

           reader.readAsDataURL(input.files[0]);
       }
   }
