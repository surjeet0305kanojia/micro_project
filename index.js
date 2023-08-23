
    
$("#student_rollno").focus();
function saveRec(jsonobj){
    var lvdata=JSON.parse(jsonobj.data);
    localStorage.setItem("recno",lvdata.rec_no);
}
function getstudrollasjsonobj(){
    var stud=$("#student_rollno").val();
    var jsonstr={
        id:student_rollno
    };
    return JSON.stringify(jsonstr);
}

function validateData() {
var studRolvar = $("#student_rollno").val();
if(studRolvar in jsonStrObj){
    return;
}
alert(studRolvar);
if (studRolvar === "") {
alert("Student RollNo Required Value");
$("#student_rollno").focus();
return "";
}
var studNameVar = $("#student_name").val();
if (studNameVar === "") {
alert("Student Name is Required Value");
$("#Student_name").focus();
return "";
}
var studClassVar = $("#class").val();
if (studClassVar === "") {
alert("Class is Required Value");
$("#class").focus();
return "";
}
var studDob = $("#Date-birth").val();
if(studDob===""){
    alert("DOB is required Value");
    $("#Date-birth").focus();
    return "";
}
var studAddress =$("#add").val();
if(studAddress===""){
    alert("Address is required value");
    $("#add").focus();
    return "";
}
var enroll=$("#Enrollment_date").val();
if(enroll===""){
    alert("enrollment date is required value");
    $("#Enrollment_date").focus();
    return "";
}

var jsonStrObj = {
student_rollno: studRolvar,
student_name: studNameVar,
class: studClassVar,
date_birth:studDob,
Address:studAddress,
Enrollment:enroll,
};
return JSON.stringify(jsonStrObj);
}
// This method is used to create PUT Json request.
function createPUTRequest(connToken, jsonObj, dbName, relName) {
var putRequest = "{\n"
+ "\"token\" : \""
+ connToken
+ "\","
+ "\"dbName\": \""
+ dbName
+ "\",\n" + "\"cmd\" : \"PUT\",\n"
+ "\"rel\" : \""
+ relName + "\","
+ "\"jsonStr\": \n"
+ jsonObj
+ "\n"
+ "}";
return putRequest;
}


function executeCommand(reqString, dbBaseUrl, apiEndPointUrl) {
var url = dbBaseUrl + apiEndPointUrl;
var jsonObj;
$.post(url, reqString, function (result) {
jsonObj = JSON.parse(result);
}).fail(function (result) {
var dataJsonObj = result.responseText;
jsonObj = JSON.parse(dataJsonObj);
});
return jsonObj;
}

function resetForm() {
$("#student_rollno").val("")
$("#student_name").val("");
$("#class").val("");
$("#Date-birth").val("");
$("#add").val("");
$("#Enrollment_date").val("");
$("#student_rollno").prop("disabled",false);
$("#save").prop("disabled",true);
$("#change").prop("disabled",true);
$("#reset").prop("disabled",true);
$("#student_rollno").focus();

}
function getData(){
    var studrolljsonobj=getstudrollasjsonobj();
    var getrequest= createGET_BY_KEYRequest("90931302|-31949327943842355|90961122",
    "SCHOOL-DB", "STUDENT-TABLE",studrolljsonobj);
    jQuery.ajaxSetup({async:false});
    var resJsonObj=executeCommand(getrequest,"http://api.login2explore.com:5577", "/api/iml");
    jQuery.ajaxSetup({async:true});
    if(resJsonObj.status===400){
        $("#save").prop("disabled",false);
        $("#reset").prop("disabled",false);
        $("#student_name").focus();
    }
    else if(resJsonObj===200){
        $("#student_rollno").prop("disabled",true);
        filldata(resJsonObj);
        $("#reset").prop("disabled",false);
        $("#change").prop("disabled",false);
        $("#student_name").focus();

    }


}
function filldata(){
    saveRec(jsonobj);
    var record=JSON.parse(jsonobj.data).record;
    $("#student_name").val(record.student_rollno);
$("#class").val(record.class);
$("#Date-birth").val(record.date_birth);
$("#add").val(record.Address);
$("#Enrollment_date").val(record.Enrollment);

}

function saveStudent() {
var jsonStr = validateData();

var putReqStr = createPUTRequest("90931302|-31949327943842355|90961122",
jsonStr, "SCHOOL-DB", "STUDENT-TABLE");
 alert(putReqStr);
jQuery.ajaxSetup({async: false});
var resultObj = executeCommand(putReqStr,
"http://api.login2explore.com:5577", "/api/iml");
jQuery.ajaxSetup({async: true});
resetForm();
$("#student_rollno").focus();
}

function changeData(){
    $("#change").prop("disabled",true);
    jsonchg=validateData();
    var updateRequest=createUPDATERecordRequest("90931302|-31949327943842355|90961122", jsonchg
, "SCHOOL-DB", "STUDENT-TABLE" ,localStorage.getItem("recno"));
jQuery.ajaxSetup({async: false});
var resultObj = executeCommand(putReqStr,
"http://api.login2explore.com:5577", "/api/iml");
jQuery.ajaxSetup({async: true});
console.log(resultObj);
resetForm();
$("#student_rollno").focus();
}