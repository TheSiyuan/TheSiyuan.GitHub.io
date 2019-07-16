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
    var x = xmlDoc.getElementsByTagName("NAME");
    document.getElementById("TITLE1").innerHTML = x[0].childNodes[0].nodeValue;
    }