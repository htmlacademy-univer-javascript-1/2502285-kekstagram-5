    function isStringValid(string, maxLength) {
    return string.length <= maxLength;
  }

  console.log(isStringValid('проверяемая строка', 20)); // true
  console.log(isStringValid('проверяемая строка', 18)); // true
  console.log(isStringValid('проверяемая строка', 10)); // false

  function isPalindrome(string) {
    const normalizedString = string.replaceAll(' ', '').toLowerCase();
    
    let reversedString = '';
  
    for (let i = normalizedString.length - 1; i >= 0; i--) {
      reversedString += normalizedString[i];
    }
  
    return normalizedString === reversedString;
  }
  
  console.log(isPalindrome('топот')); // true
  console.log(isPalindrome('ДовОд')); // true
  console.log(isPalindrome('Кекс'));  // false
  console.log(isPalindrome('Лёша на полке клопа нашёл')); // true

  function extractNumber(input) {
    const string = input.toString();
    let result = '';

    for (let i = 0; i < string.length; i++) {
      const char = string[i];
  
      const digit = parseInt(char, 10);
  
      if (!Number.isNaN(digit)) {
        result += digit; 
      }
    }
  
    return result.length > 0 ? parseInt(result, 10) : NaN;
  }
  
  console.log(extractNumber('2023 год'));            // 2023
  console.log(extractNumber('ECMAScript 2022'));     // 2022
  console.log(extractNumber('1 кефир, 0.5 батона')); // 105
  console.log(extractNumber('агент 007'));           // 7
  console.log(extractNumber('а я томат'));           // NaN
  console.log(extractNumber(2023));  // 2023
  console.log(extractNumber(-1));    // 1
  console.log(extractNumber(1.5));   // 15
  