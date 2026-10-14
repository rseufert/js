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
	
	this.getName = function(){
		if (number === 1){
			return "Ace";
		} else if (number === 11){
			return "Jack";
		} else if (number === 12){
			return "Queen";
		} else if (number === 13){
			return "King";
		} else {
			return number;
		}
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
		for (var i=0; i<len; i++){
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
		for (var i=0; i<len; i++){
          if (hand[i].getSuit() === 1){
              str = str + hand[i].getName() + " of Clubs, ";
          } else if (hand[i].getSuit() === 2){
              str = str + hand[i].getName() + " of Diamonds, ";
          } else if (hand[i].getSuit() === 3){
              str = str + hand[i].getName() + " of Hearts, ";
          } else if (hand[i].getSuit() === 4){
              str = str + hand[i].getName() + " of Spades, ";
          }
		}
		return str;
	};
	
	this.hitMe = function(){
		hand[hand.length] = deal();
	};
}

//Deck shared by the user and the dealer for one game
var deck = [];

//newDeck function - builds all 52 cards and shuffles them (Fisher-Yates)
function newDeck(){
    console.log("Shuffling a new deck");
	deck = [];
	for (var s=1; s<=4; s++){
		for (var n=1; n<=13; n++){
			deck[deck.length] = new Card(s, n);
		}
	}
	for (var i=deck.length - 1; i>0; i--){
		var j = Math.floor(Math.random() * (i + 1));
		var temp = deck[i];
		deck[i] = deck[j];
		deck[j] = temp;
	}
}

//Deal function - takes the top card off the deck, so no card can be dealt twice
function deal(){
    console.log("Dealing...");
	return deck.pop();
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
	// Stop asking once the hand reaches 21 or busts, since another hit can't help
	while(h.score() < 21 && confirm(h.printHand() + "do you want another hit?") === true){
		h.hitMe();
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
		return lose; // The player busts first, so they lose even if the dealer busts too
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
	newDeck();
	var userHand = playAsUser();
	var dealerHand = playAsDealer();
	var result = declareWinner(userHand, dealerHand);
	console.log("Your hand: " + userHand.printHand() + "for a score of " + userHand.score() + "\n");
	console.log("Dealer's hand: " + dealerHand.printHand() + "for a score of " + dealerHand.score() + "\n");
	console.log(result);
}

playGame();