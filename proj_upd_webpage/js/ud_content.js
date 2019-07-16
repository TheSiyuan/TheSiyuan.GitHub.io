function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        document.getElementById("demo1").innerHTML = this.responseText;
        anotherfunction(this);
        }
    };
    xhttp.open("GET", "userdefine/samplepage.xml", true);
    xhttp.send();
}

function anotherfunction(xml){
    var xmlDoc = xml.responseXML;
    var x;
    var i;
    var y;
    y = document.querySelectorAll('[id^="ud_"]');
    for (i=0; i<y.length; i++) {
        x = xmlDoc.getElementsByTagName(y[i].id);
        document.getElementById(y[i].id).innerHTML =x[0].childNodes[0].nodeValue;
    }
}