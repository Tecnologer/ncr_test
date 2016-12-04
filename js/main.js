var time1 = new Date();
var report;
var totalRecords = 0;
function main() {
    time1 = new Date();

    totalRecords = 0;
    var input = getInput();
    if (input) {
        showLoading();
        setTimeout(function() {
            var util = new Utilities(input);
            setTimeout(function() {
                report = util.getReportInformation();
                var time2 = new Date();
                console.log(time2.getTime() - time1.getTime());
                showReport(report.information);
                showInvalids(report.setsNotValid);
                hideLoading();

                document.getElementById("totalSets").innerHTML = totalRecords;
            }, 1);
        }, 1);
    } else {
        document.getElementById("requeriment_b").tBodies[0].innerHTML = "";
        document.getElementById("requeriment_d").innerHTML = "";
        document.getElementById("div_requeriment_d").style.display = "none";
        document.getElementById("totalSets").innerHTML = totalRecords;
    }


}


function showReport(reportInfo) {
    var mostDuplicate = "";
    var tbody = document.getElementById("requeriment_b").tBodies[0];
    tbody.innerHTML = "";
    document.getElementById("mostDuplicated").style.display = "none";    
    
    Object.keys(reportInfo).forEach(function(set, i) {

        if (reportInfo[mostDuplicate] == undefined || (reportInfo[mostDuplicate].duplicates.length < reportInfo[set].duplicates.length)) {
            mostDuplicate = set;
        }

        var tr = document.createElement("tr");
        tr.id = set;
        tr.addEventListener("click", showDupplicates);
        tr.className = "cursor";
        var td1 = document.createElement("td")
        td1.innerHTML = set;
        var td2 = document.createElement("td")
        td2.innerHTML = (reportInfo[set].duplicates && reportInfo[set].duplicates.length || 0);
        var td3 = document.createElement("td")
        td3.innerHTML = (reportInfo[set].nonDuplicates && reportInfo[set].nonDuplicates.length || 0);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tbody.appendChild(tr);


        if (Object.keys(reportInfo).length - 1 == i) {
            document.getElementById("mostDuplicated").style.display = "block";
            document.getElementById("sSet").innerHTML = mostDuplicate;
            document.getElementById("sCount").innerHTML = reportInfo[mostDuplicate].duplicates.length;
            document.getElementById(mostDuplicate).className = "mostDuplicate";

            totalRecords += 1 + reportInfo[mostDuplicate].duplicates.length + reportInfo[mostDuplicate].nonDuplicates.length;
        }
    });

}

function showInvalids(invalids) {
    var ul = document.getElementById("requeriment_d");
    ul.innerHTML = "";
    var x=0;
    // for (var i = 0; i < invalids.length; i++) {
    Object.keys(invalids).forEach(function(nv, i) {
        var li = document.createElement("li");
        li.innerHTML = '<span class="bolder">' + (nv == ""? "[Empty String]" : nv) + "</span> => appear " + invalids[nv] + " times.";
        ul.appendChild(li);

        totalRecords += invalids[nv];
    });

    document.getElementById("div_requeriment_d").style.display = Object.keys(invalids).length > 0 ? "block" : "none";
}

function getInput() {
    return document.getElementById("inputTextArea").value;
}

function showDupplicates() {
    var set = this.id;
    var duplicates = report.information[set].duplicates;
    var ul = document.getElementById("set_duplicates");
    ul.innerHTML = "";

    document.getElementById("dialogTitle-label").innerHTML = "Duplicates of set <span class='bolder'>(" + set + ")</span>, with " + duplicates.length + " duplications.";
    
    if(duplicates.length>0){
        for (var i = 0; i < duplicates.length; i++) {
            var li = document.createElement("li");
            li.innerHTML = duplicates[i].toString();
            ul.appendChild(li);
        }
    }
    else{
        var li = document.createElement("li");
        li.innerHTML = "<span style='font-size: 30px;'>This set don't have duplicates.</span>";
        ul.appendChild(li);
    }

    showDialog();
}

function showLoading() {
    document.getElementById("divButton").style.display = "none";
    document.getElementById("divLoader").style.display = "block";
}

function hideLoading() {
    document.getElementById("divButton").style.display = "block";
    document.getElementById("divLoader").style.display = "none";
}

function showDialog() {
    var cName = document.getElementById("dialog").className.replace("hidden", "");
    document.getElementById("dialog").className = cName;
}

function closeDialog() {
    document.getElementById("dialog").className += "hidden";
}
// main();
document.getElementById("btnGetReport").addEventListener("click", main);
document.getElementById("closeDialog").addEventListener("click", closeDialog);