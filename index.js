// `c1, c2:${x}, c3, $:${y}, c5, c6`
export default function $$C(...args) {
  const [strArray, ...vars] = args;
  let dataPointer = -1;
  const allClasses = [];
  strArray
    .forEach((classString)=>{
      let className = [];
      classString = classString + ',';
      // parser
      classString
      .split('')
      .forEach(char => {
        switch (char) {
        case ',':
          className.length ? allClasses.push(className.join('')): null;
          className = [];
          break;
        case ':':
          dataPointer++;
          const condition = vars[dataPointer];
          // check for '$' sign
          let classNameCurrentPointer = className.length;
          let classNameCurrentPointedChar = className[classNameCurrentPointer];
          if(condition){
            // we should apply this class.
            allClasses.push(className.join(''));
          }
          className = []; // clear className
          break;
      case '$':
            // replace the $ with className which itself is the variable value.
            dataPointer++;
            const classNameIsVar = (vars[dataPointer] && vars[dataPointer].toString) ? vars[dataPointer].toString().split('') : '$';
            className = className.concat(classNameIsVar);
            dataPointer--;
            break;
        default:
          className.push(char);
          break;
        }
      });
    });
    return allClasses.join(' ');
}
