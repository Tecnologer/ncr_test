function Utilities(input) {
    var matchesIndex = [];
    var matches = {};
    var notValid = [];

    var items = input.split("\n")
        .map(function(val) {
            //remove spaces
            val = val.replace(/,\s*/g, ",");
            return val.split(",");
        });

    setsAreEquals = function(set1, set2) {
        // if the other array is a false value, return
        if (!set2)
            return false;

        // compare lengths - can save a lot of time 
        if (set1.length != set2.length)
            return false;

        set1 = set1.map(Number).sort();
        set2 = set2.map(Number).sort();
        for (var i = 0, l = set1.length; i < l; i++) {
            // Check if we have nested arrays
            if (set1[i] != set2[i]) {
                return false;
            }
        }
        return true;
    };

    setIsValid = function(set) {
        for (var i = 0; i < set.length; i++) {
            if (isNaN(set[i]) || set[i] === "" || set[i] == undefined)
                return false;
        }
        return true;
    };

    addDuplicated = function(pivot, duplicate) {
        if (matches[pivot] !== null && typeof matches[pivot] !== 'object')
                matches[pivot] = {duplicates: [], nonDuplicates: []};

        matches[pivot].duplicates.push(duplicate);
    };

    addNonDuplicated = function(pivot, duplicate) {
        if (matches[pivot] !== null && typeof matches[pivot] !== 'object')
                matches[pivot] = {duplicates: [], nonDuplicates: []};

        matches[pivot].nonDuplicates.push(duplicate);
    };

    addNotValid = function(set){
        var nv = set.toString();
        if (notValid.indexOf(nv) == -1) 
            notValid.push(nv);
    }

    return {
        getReportInformation: function() {
            var i = 0,
                len = items.length;

            for (i = 0; i < len; i++) {
                if (matchesIndex.indexOf(i) == -1 && notValid.indexOf(items[i].toString()) == -1) {
                    if (setIsValid(items[i])) {
                        for (var j = i + 1; j < len; j++) {
                            if (setIsValid(items[j])) {
                                if (setsAreEquals(items[i], items[j])) {
                                    matchesIndex.push(j);
                                    addDuplicated(items[i], items[j]);
                                } else {
                                    addNonDuplicated(items[i], items[j]);
                                }
                            }
                        }

                        if (i > 0){
                            for (var n = i - 1; n >= 0; n--) {
                                if (setIsValid(items[n])) {
                                    addNonDuplicated(items[i], items[n]);
                                }
                            }
                        }
                    }
                    //no valid
                    else {
                        addNotValid(items[i]);
                    }

                } /**/

            }

            return {
                information: matches,
                setsNotValid: notValid
            }
        }
    }
}