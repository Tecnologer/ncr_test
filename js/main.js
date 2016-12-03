var time1 = new Date();

function main() {
    var input = getInput();
    if (input) {
        var util = new Utilities(input);
        var report = util.getReportInformation();

        showDupplicates(report.information);
        showInvalids(report.setsNotValid);
    } else {
        document.getElementById("requeriment_b").tBodies[0].innerHTML="";
        document.getElementById("requeriment_d").innerHTML = "";
        document.getElementById("div_requeriment_d").style.display = "none";
    }
    var time2 = new Date();
    console.log(time2.getTime() - time1.getTime());
}


function showDupplicates(report) {
    var mostDuplicate = "";
    var tbody = document.getElementById("requeriment_b").tBodies[0];
    tbody.innerHTML = "";
    Object.keys(report).forEach(function(set, i) {

        if (report[mostDuplicate] == undefined || report[mostDuplicate].duplicates == undefined || (report[mostDuplicate].duplicates && report[set].duplicates && report[mostDuplicate].duplicates.length < report[set].duplicates.length)) {
            mostDuplicate = set;
        }

        var tr = document.createElement("tr");
        tr.id = set;
        var td1 = document.createElement("td")
        td1.innerHTML = set;
        var td2 = document.createElement("td")
        td2.innerHTML = (report[set].duplicates && report[set].duplicates.length || 0);
        var td3 = document.createElement("td")
        td3.innerHTML = (report[set].nonDuplicates && report[set].nonDuplicates.length || 0);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tbody.appendChild(tr);


        if (Object.keys(report).length - 1 == i) {
            document.getElementById("sSet").innerHTML = mostDuplicate;
            document.getElementById("sCount").innerHTML = report[mostDuplicate].duplicates.length;
            document.getElementById(mostDuplicate).className = "mostDuplicate";
        }
    });

}

function showInvalids(invalids) {
    var ul = document.getElementById("requeriment_d");
    ul.innerHTML = "";
    for (var i = 0; i < invalids.length; i++) {
        var li = document.createElement("li");
        li.innerHTML = invalids[i];
        ul.appendChild(li);
    }
    
    document.getElementById("div_requeriment_d").style.display = invalids.length>0 ? "block":"none";
}

function getInput() {
    return document.getElementById("inputTextArea").value;
}

// main();
document.getElementById("btnGetReport").addEventListener("click", main);