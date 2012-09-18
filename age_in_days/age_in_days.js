var age = prompt('How old are you?');
var birthMonth = prompt('Please enter the number of your birth month?');
var birthDay = prompt('What day of the month?');

var date = new Date();
var birthYear = date.getFullYear() - age;
var m = date.getMonth() + 1;
var d = date.getDate();

if (birthMonth > m || (birthMonth == m && birthDay > d)){
  birthYear--;
}

var birthDate = new Date(birthYear, birthMonth - 1, birthDay);
var ageMill = birthDate.getTime();
var dateMill = date.getTime();
ageMill = dateMill - ageMill;

var numDays = Math.round(ageMill / 1000 / 60 / 60 / 24);


alert("You are " + numDays + " days old.");