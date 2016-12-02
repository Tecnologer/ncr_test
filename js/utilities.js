function Utilities(input) {
    input = input.split("\n")
        .map(function(val) {
            val = val.replace(/,\s*/g, ",");
            return val.split(",");
        });

    setsAreEquals = function(set1, set2) {
        // if the other array is a falsy value, return
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

    setIsValid = function(set1) {
        for (var i = 0, l = set1.length; i < l; i++) {
            if (isNaN(set1[i]) || set1[i] === "" || set1[i] == undefined)
                return false;
        }
        return true;
    };

    return {
        getReportInformation: function() {
            var items = input;
            var i = 0,
                len = items.length;
            var matchesIndex = [];
            var matches = {};
            var notValid = [];
            for (i = 0; i < len; i++) {
                if (matchesIndex.indexOf(i) == -1 && notValid.indexOf(items[i]) == -1) {
                    if (setIsValid(items[i])) {
                        for (var j = i + 1; j < len; j++) {
                            if (setIsValid(items[j])) {
                                if (setsAreEquals(items[i], items[j])) {
                                    matchesIndex.push(j);
                                    if (matches["" + items[i]] !== null && typeof matches["" + items[i]] === 'object' && Array.isArray(matches["" + items[i]].d)) {
                                        matches["" + items[i]].d.push(items[j]);
                                    } else {
                                        if (matches["" + items[i]] !== null && typeof matches["" + items[i]] !== 'object')
                                            matches["" + items[i]] = {};

                                        matches["" + items[i]]["d"] = [items[j]];
                                    }
                                } else {
                                    if (matches["" + items[i]] !== null && typeof matches["" + items[i]] === 'object' && Array.isArray(matches["" + items[i]].nd)) {
                                        matches["" + items[i]].nd.push(items[j]);
                                    } else {
                                        if (matches["" + items[i]] !== null && typeof matches["" + items[i]] !== 'object')
                                            matches["" + items[i]] = {};

                                        matches["" + items[i]]["nd"] = [items[j]];
                                    }
                                }
                            }
                            //not valid
                            else if (notValid.indexOf(items[j]) == -1) {
                                notValid.push(items[j]);
                            }

                        }
                    }
                    //no valid
                    else if (notValid.indexOf(items[i]) == -1) {
                        notValid.push(items[i]);
                    }

                    if (i > 0)
                        for (var n = i - 1; n >= 0; n--) {
                            if (setIsValid(items[n])) {
                                if (matches["" + items[i]] !== null && typeof matches["" + items[i]] === 'object' && Array.isArray(matches["" + items[i]].nd)) {
                                    matches["" + items[i]].nd.push(items[n]);
                                } else {
                                    if (matches["" + items[i]] !== null && typeof matches["" + items[i]] !== 'object')
                                        matches["" + items[i]] = {};

                                    matches["" + items[i]]["nd"] = [items[n]];
                                }
                            }
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