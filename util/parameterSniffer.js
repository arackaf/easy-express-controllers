'use strict';

function getParameterNames(func) {
    return sniffParameterNames(func.toString());
}

function sniffParameterNames(functionString) {
    var openingParenIndex = functionString.indexOf('(') + 1,
        closingParenIndex = 0,
        STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;

    for (var checking = openingParenIndex;; checking++) {
        if (functionString.charAt(checking) == ')') {
            closingParenIndex = checking;
            break;
        }
    }

    var paramString = functionString.slice(openingParenIndex, closingParenIndex);
    paramString = paramString.replace(STRIP_COMMENTS, '').replace(/\s/g, '');
    return paramString.split(',').filter(function (name) {
        return name;
    }); //remove empty string
}

module.exports = { getParameterNames: getParameterNames, sniffParameterNames: sniffParameterNames };