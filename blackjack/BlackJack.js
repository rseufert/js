// Card Constructor
function Card(suit_param, number_param){
    console.log("Creating new Card");
	var suit = suit_param;
	var number = number_param;
	
	this.getNumber = function(){
		return number;
	};
	
	this.getSuit = function(){
		return suit;
	};
	
	this.getValue = function(){
		if (number === 1){
			return 11;
		} else if (number >= 10){
			return 10;
			} else {
				return number;
				}
	};
}

//Hand Constructor
function Hand(){
    console.log("Creating new Hand");
	var hand = [];
	hand[0] = deal();
	hand[1] = deal();
	
	this.getHand = function(){
		return hand;
	};
	
	this.score = function(){
		var len = hand.length;
		var sum = 0;
		var aces = 0;
		for (i=0; i<len; i++){
			sum += hand[i].getValue();
			if (hand[i].getValue() === 11){
				aces++;
			}
		}
		while (sum > 21 && aces > 0){
			sum -= 10; // Convert the ace from 11 to 1, until the sum is under 21 or there are no more aces
			aces--;				
		}
		return sum;
	};
	
	this.printHand = function(){
		var len = hand.length;
		var str = "";
		for (i=0; i<len; i++){
          if (hand[i].getSuit() === 1){
              str = str + hand[i].getNumber() + " of Clubs, ";
          } else if (hand[i].getSuit() === 2){
              str = str + hand[i].getNumber() + " of Diamonds, ";
          } else if (hand[i].getSuit() === 3){
              str = str + hand[i].getNumber() + " of Hearts, ";
          } else if (hand[i].getSuit() === 4){
              str = str + hand[i].getNumber() + " of Spades, ";
          }
		}
		return str;
	};
	
	this.hitMe = function(){
		hand[hand.length] = deal();
	};
}

//Deal function
function deal(){
    console.log("Dealing...");
	var s = Math.floor(Math.random() * 4 + 1);
	var n = Math.floor(Math.random() * 13 + 1);
	var Card1 = new Card(s, n);
	return Card1;
}

//playAsDealer function
function playAsDealer(){
    console.log("Playing as dealer");
	var h = new Hand();
	while(h.score() < 17){
		h.hitMe();
	}
	return h;
}

//playAsUser function
function playAsUser(){
    console.log("Playing as user");
	var h = new Hand();
	var bool = confirm(h.printHand() + "do you want another hit?");
	while(bool === true){
		h.hitMe();
		bool = confirm(h.printHand() + "do you want another hit?");
	}
	return h;
}

//declareWinner function
function declareWinner(userHand, dealerHand){
    console.log("Determining the winner");
	var userScore = userHand.score();
	var dealerScore = dealerHand.score();
	var tied = "You tied!";
	var win = "You win!";
	var lose = "You lose!";
	
	if (userScore > 21){
		if (dealerScore > 21){
			return tied;
		} else {
			return lose;
		}
	}
	if (dealerScore > 21){
		return win;
	}
	if (userScore > dealerScore){
		return win;
	} else if (userScore === dealerScore){
		return tied;
	} else {
		return lose;
	}
}

//playGame function
function playGame(){
	var userHand = playAsUser();
	var dealerHand = playAsDealer();
	var result = declareWinner(userHand, dealerHand);
	console.log("Your hand: " + userHand.printHand() + "for a score of " + userHand.score() + "\n");
	console.log("Dealer's hand: " + dealerHand.printHand() + "for a score of " + dealerHand.score() + "\n");
	console.log(result);
}

playGame();