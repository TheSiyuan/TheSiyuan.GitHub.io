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
    var x = xmlDoc.getElementsByTagName("ud_proj_name");
    document.getElementById("ud_proj_name").innerHTML = x[0].childNodes[0].nodeValue;
    document.getElementById("ud_proj_name_page").innerHTML = x[0].childNodes[0].nodeValue;       





    }