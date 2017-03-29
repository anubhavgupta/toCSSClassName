// example: $$C`c1, c2:${i}, c3, c4-$:${i+1}, c5`;
export default function $$C() {
    var strArray = arguments[0];
    var dataPointer = 0;
    var allClasses = [];
    var strArrayLength = strArray.length, classStrLength;
    for(var i = 0, classString = strArray[0]; i < strArrayLength; i++, classString = strArray[i]) {
        classStrLength = classString.length;
        var stringStack = [], startPtr = -1, endPtr = -1;
        for (var j=0, char=classString[0]; j < classStrLength; j++, char=classString[j]) {
            switch (char) {
                case ',':
                    if(endPtr > startPtr){
                        allClasses.push(classString.substring(startPtr, endPtr));
                    }
                    startPtr = -1;
                    endPtr = -1;
                    break;
                case ':':
                    dataPointer++;
                    var condition = arguments[dataPointer];
                    if (condition) {
                        if(stringStack.length) { // todo handle case when user types `c1$` only and `c$1`
                            // we have $ in the text
                            var classNameIsVar = (condition && condition.toString) ? condition.toString() : '$';
                            stringStack.push(endPtr > startPtr ? classString.substring(startPtr, endPtr) : '');
                            var finalClassName = stringStack.join(classNameIsVar);
                            allClasses.push(finalClassName);
                        } else {
                            (endPtr > startPtr) ? allClasses.push(classString.substring(startPtr, endPtr)): null;
                        }
                    }
                    startPtr = -1;
                    endPtr = -1;
                    stringStack = [];// clear stack
                    break;
                case '$':
                    // replace the $ with className which itself is the variable value.
                    // partial classname so push to stack.
                    (endPtr > startPtr)? stringStack.push(classString.substring(startPtr, endPtr)): null;
                    startPtr = -1;
                    endPtr = -1;
                    break;
                default:
                    if(!~startPtr){
                        startPtr = j;
                        endPtr = j;
                    }
                    endPtr ++;
                    break;
            }
        }
        // check if we still have some parsed data available, it must be a class name not ending with ,
        (endPtr > startPtr) ? allClasses.push(classString.substring(startPtr, endPtr)) : null
    }
    return allClasses.join(' ');
}
