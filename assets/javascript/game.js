window.onload = function() {

	// Declare all variables and an array with a list of scientific words in it.
	var scienceWords = ["beaker", "experiment", "einstein", "quantum", "electron", "relativity", "neutron", "atom", "distillation", "avagadro"];
	var images = ["hangman-01.png", "hangman-02.png", "hangman-03.png", "hangman-04.png", "hangman-05.png", 
					"hangman-06.png", "hangman-07.png", "hangman-08.png", "hangman-09.png", "hangman-10.png"];
	var wins = 0;
	var rand, currentWord, letterSelection, guesses, unknownWord;
	var usedLetters = "";
	var gameStarted = false;

	/* When "Start" button is pressed, the game area will be set and a random word will be picked from the list 
	and removed from the array so it won't be asked in the next rounds.*/

	document.getElementById("btnStart").onclick = function () {
		gameStarted = true;
		unknownWord = [];
		usedLetters = "";
		guesses = 10;
		document.getElementById("used-letters").innerHTML = "-";
		document.getElementById("mesage-space").innerHTML = "";
		placeImg("assets/images/hangman-11.png");
		document.getElementById("wins").innerHTML = wins;
		document.getElementById("guesses").innerHTML = guesses;

		if(scienceWords.length > 0) {
			rand =(Math.floor(Math.random() * (scienceWords.length)) + 1) - 1;
			currentWord = scienceWords[rand].toLowerCase();
			document.getElementById("word").innerHTML = "";

			for (var i = 0; i < currentWord.length; i++) {

				unknownWord[i] = " _ ";			
			}

			document.getElementById("word").innerHTML = unknownWord.join("");

		} else {
			document.getElementById("word").innerHTML = "All words in the database have been used. Refresh the page to replay.";
			gameStarted = false;
		}	
	}

	// When a letter is entered, it will be compared to the letters in the word. 
		// If the letter exists, it will show in the "Current word" area
		// If not exists, it will be shown in the "Used letters" area, and the remaining guesses will count down from 6 for each wrong letter.
		// If the player guesses all the letters correctly before 6 wrong guesses, the game will congratulate the player and the "Wins" will increase by 1.
		// If the player guesses wrong for 6 times, the player will lose.
	document.onkeydown = function(event) {
		if(gameStarted) {

			if (event.which <= 90 && event.which >= 65) {
				letterSelection = event.key.toLowerCase();
				document.getElementById("mesage-space").innerHTML = "";

				if (unknownWord.join("").includes(letterSelection)) {
						document.getElementById("mesage-space").innerHTML = "This letter already was used!";
					}

				if (currentWord.includes(letterSelection)) {
					for (var i = 0; i < currentWord.length; i++) {
						if (currentWord[i] === letterSelection) {
							unknownWord[i] = letterSelection;
							document.getElementById("word").innerHTML = " " + unknownWord.join("") + " ";
						}
					}

					if (unknownWord.join("").includes(currentWord)) {
						document.getElementById("word").innerHTML = "Congratulations!";
						document.getElementById("mesage-space").innerHTML = "You got " + currentWord.toUpperCase() + " right.";
						scienceWords.splice(rand, 1);
						placeImg("assets/images/hangman-dab.png");
						document.getElementById("wins").innerHTML = ++wins;
						gameStarted = false;
					}


				} else {

					if (!usedLetters.includes(letterSelection)) {
						usedLetters = usedLetters + " " + letterSelection;
						document.getElementById("used-letters").innerHTML = usedLetters;
						document.getElementById("guesses").innerHTML = --guesses;
						placeImg("assets/images/" + images[guesses]);
					} else {
						document.getElementById("mesage-space").innerHTML = "This letter already was used!";
					}

					if (guesses == 0) {
						document.getElementById("word").innerHTML = "Sorry, you missed " + currentWord.toUpperCase() + "!";
						scienceWords.splice(rand, 1);
						document.getElementById("mesage-space").innerHTML = "Press \"Start\" to try again.";
						gameStarted = false;	
					}
				}

			} else {
				event.preventDefault();
				document.getElementById("mesage-space").innerHTML = "Please press a proper key!";
			}

		} else {

			if (scienceWords.length == 0) {
				document.getElementById("word").innerHTML = "No words left, please refresh the page to restart.";
			} else {
				event.preventDefault();
				document.getElementById("word").innerHTML = "Press \"Start Button\" first.";
			}
			
		}
	} 

	// Selects the right image and places it in the left of the viewport.
    function placeImg(hangmanImg) {
    	var image = document.createElement("img");
    	image.setAttribute("src", hangmanImg);
    	image.setAttribute("class", "w-75");
    	image.setAttribute("id", "left-image");
    	document.getElementById("image-space").innerHTML = "";
    	document.getElementById("image-space").appendChild(image);
    }
}
