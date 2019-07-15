//test function for javascript code
var heading = "this is the new heading";
function myFunction() {
document.getElementById("demo").innerHTML = heading;
document.getElementById("demo").style.fontSize = "40px";
}
function loadDoc() {
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    document.getElementById("demo1").innerHTML = this.responseText;
    anotherfunction(this);
    }
};
xhttp.open("GET", "userdefine/content2.xml", true);
xhttp.send();
}
function anotherfunction(xml){
var xmlDoc = xml.responseXML;
var x = xmlDoc.getElementsByTagName("NAME");
var y = x[0].childNodes[0].nodeValue;
document.getElementById("TITLE1").innerHTML = y;
}