function Utilities(input) {
    var matchesIndex = [];
    var matches = {};
    var notValid = {};

    var items = input.split("\n")
        .map(function(val) {
            //remove spaces
            val = val.replace(/,\s*/g, ",");
            return val.split(",");
        });

    var setsAreEquals = function(set1, set2) {
        // if the other array is a false value, return
        if (!set2)
            return false;

        // compare lengths - can save a lot of time 
        if (set1.length != set2.length)
            return false;

        set1 = set1.map(Number).sort();
        set2 = set2.map(Number).sort();
        for (var i = 0, l = set1.length; i < l; i++) {
            if (set1[i] != set2[i]) {
                return false;
            }
        }
        return true;
    };

    var setIsValid = function(set) {
        for (var i = 0; i < set.length; i++) {
            if (isNaN(set[i]) || set[i] === "" || set[i] == undefined || !Number.isInteger(Number(set[i])))
                return false;
        }
        return true;
    };

    var addDuplicated = function(pivot, duplicate) {
        matches[pivot].duplicates.push(duplicate);
    };

    var addNonDuplicated = function(pivot, duplicate) {
        matches[pivot].nonDuplicates.push(duplicate);
    };

    var addNotValid = function(set){
        var nv = set.toString();

        if (notValid[nv] == null) 
            notValid[nv] = 0;

        notValid[nv]++;
    }

    return {
        getReportInformation: function() {
            var i = 0,
                len = items.length;

            
            for (i = 0; i < len; i++) {
                if (matchesIndex.indexOf(i) == -1) {
                    if (setIsValid(items[i])) {
                        if (matches[items[i]] !== null && typeof matches[items[i]] !== 'object')
                                matches[items[i]] = {duplicates: [], nonDuplicates: []};

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