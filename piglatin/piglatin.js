var isVowel = function(char){
  var charLower = char.toLowerCase();
  if(charLower === 'a' || charLower === 'e' || charLower === 'i' || charLower === 'o' || charLower === 'u' || charLower === 'y'){
    return true;
  }
  return false;
};

var isTranslatable = function(sample){
  var len = sample.length;
  var vowelCount = 0;
  for(var i = 0; i < len; i++){
    var c = sample.charAt(i);
    if(c < 'A' || c > 'z'){
      if(c !== '\'' && c !== '-'){
        return false;
      }
    }
    if(c > 'Z' && c < 'a'){
      return false;
    }
    if(isVowel(c) === true){
      vowelCount++;
    }
  }
  if(vowelCount > 0){
    return true;
  } else {
    return false;
  }
};

var translateWord = function(word){
  if(isTranslatable(word) === true){
    for(var j = 0; j < word.length; j++){
      if(isVowel(word.charAt(j)) === true){
        return word.substring(j) + "-" + word.substring(0, j) + "ay";
      } 
    }
  }
  return word;
};

var translateSentence = function(sentence){
  var str = sentence.split(' ');
  var pigSentence = '';
  for(var k = 0; k < str.length; k++){
    if(k === str.length - 1){
      pigSentence += translateWord(str[k]);
    } else {
      pigSentence += translateWord(str[k]) + ' ';
    }
  }
  return pigSentence;
};

console.log(translateSentence("JavaScript is cool"));