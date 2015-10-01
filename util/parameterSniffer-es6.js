function getParameterNames(func){
    return sniffParameterNames(func.toString());
}

function sniffParameterNames(functionString){
    let openingParenIndex = functionString.indexOf('(') + 1,
        closingParenIndex = 0,
        STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;


    for(let checking = openingParenIndex;; checking++){
        if (functionString.charAt(checking) == ')'){
            closingParenIndex = checking;
            break;
        }
    }

    let paramString = functionString.slice(openingParenIndex, closingParenIndex);
    paramString = paramString.replace(STRIP_COMMENTS, '').replace(/\s/g, '');
    return paramString.split(',').filter(name => name); //remove empty string
}

module.exports = { getParameterNames, sniffParameterNames };