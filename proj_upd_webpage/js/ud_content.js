function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        pushcountent(this);
        }
    };
    xhttp.open("GET", "userdefine/samplepage.xml", true);
    xhttp.send();
}

function pushcountent(xml){
    var xmlDoc = xml.responseXML;
    var x;
    var i;
    var y;
    y = document.querySelectorAll('[id^="ud_"]');
    /*
    for (i=0; i<y.length; i++) {
        console.log(i);
        x = xmlDoc.getElementsByTagName(y[i].id);
        document.getElementById(y[i].id).innerHTML =x[0].childNodes[0].nodeValue;
    }
    */
   x = xmlDoc.getElementsByTagName("ud_proj_name");
   document.getElementById("ud_proj_name").innerHTML =x[0].childNodes[0].nodeValue;
}