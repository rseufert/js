var age = prompt('How old are you?');
var birthMonth = prompt('Please enter the number of your birth month?');
var birthDay = prompt('What day of the month?');
var birthDate;
var ageMill;
var dateMill;
var numDays;

var date = new Date();
var birthYear = date.getFullYear() - age;
var m = date.getMonth() + 1;
var d = date.getDate();

if (birthMonth > m || (birthMonth == m && birthDay > d)){  //calculate birth year
  birthYear--;
}

birthDate = new Date(birthYear, birthMonth - 1, birthDay);  //create date object for birth date
ageMill = birthDate.getTime();                              //get birthdate in milliseconds
dateMill = date.getTime();                                  //get date in milliseconds
ageMill = dateMill - ageMill;                               //get age in milliseconds

numDays = Math.round(ageMill / 1000 / 60 / 60 / 24);        //convert to days


alert("You are " + numDays + " days old.");