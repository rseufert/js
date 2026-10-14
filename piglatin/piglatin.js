var isLetter = function(c){
  return (c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z');
};

var isVowel = function(word, index){
  var charLower = word.charAt(index).toLowerCase();
  if(charLower === 'y'){
    return index > 0;  // 'y' is a consonant at the start of a word ("yellow") and a vowel elsewhere ("rhythm")
  }
  if(charLower === 'a' || charLower === 'e' || charLower === 'i' || charLower === 'o' || charLower === 'u'){
    return true;
  }
  return false;
};

var splitPunctuation = function(word){  // separates leading/trailing punctuation so "cool!" is translated as "cool" + "!"
  var start = 0;
  var end = word.length;
  while(start < end && !isLetter(word.charAt(start))){
    start++;
  }
  while(end > start && !isLetter(word.charAt(end - 1))){
    end--;
  }
  return {
    lead: word.substring(0, start),
    core: word.substring(start, end),
    trail: word.substring(end)
  };
};

var isTranslatable = function(sample){
  var len = sample.length;
  var vowelCount = 0;
  for(var i = 0; i < len; i++){
    var c = sample.charAt(i);
    if(!isLetter(c) && c !== '\'' && c !== '-'){
      return false;
    }
    if(isVowel(sample, i) === true){
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
  var p = splitPunctuation(word);
  var core = p.core;
  if(isTranslatable(core) === true){
    for(var j = 0; j < core.length; j++){
      if(core.charAt(j) === '-'){
        break;  // a hyphen before the first vowel ("x-ray") couldn't be untranslated, so leave the word alone
      }
      if(isVowel(core, j) === true){
        return p.lead + core.substring(j) + "-" + core.substring(0, j) + "ay" + p.trail;
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

var untranslateWord = function(word){
  var p = splitPunctuation(word);
  var marker = p.core.lastIndexOf('-');  // the last hyphen is ours, so "ell-known-way" still splits correctly

  if(marker === -1){
    return word;
  }

  var front = p.core.substring(0, marker);
  var back = p.core.substring(marker + 1);
  if(back.toLowerCase().substring(back.length - 2) !== 'ay'){
    return word;
  }

  var prefix = back.substring(0, back.length - 2);
  var original = prefix + front;
  for(var i = 0; i < prefix.length; i++){
    if(isVowel(original, i) === true){
      return word;  // translateWord only ever moves the letters before the first vowel, so this wasn't pig latin ("x-ray")
    }
  }
  if(isVowel(original, prefix.length) === false){
    return word;
  }

  return p.lead + original + p.trail;
};

var untranslateSentence = function(pigStr){
  var str = pigStr.split(' ');
  var normSentence = '';

  for(var l = 0; l < str.length; l++){
    if(l === str.length - 1){
      normSentence += untranslateWord(str[l]);
    } else {
      normSentence += untranslateWord(str[l]) + " ";
    }
  }
  return normSentence;   
};

//var x = translateSentence("JavaScript is cool")
//console.log(x);
//var y = untranslateSentence(x);
//console.log(y);