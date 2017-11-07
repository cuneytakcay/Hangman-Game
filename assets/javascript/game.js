window.onload = function() {

	// Declare an array with a list of scientific words in it.
	var images = ["hangman6.png", "hangman5.png", "hangman4.png", "hangman3.png", "hangman2.png", "hangman1.png", "hangman0.png"]
	var words = ["beaker", "experiment", "einstein"];
	var wins = 0;
	var rnd, currentWord, letterSelection, guesses, unknownWord, image;
	var usedLetters = "";
	var gameStarted = false;

	/* When "Start" button is pressed, the game area will be set and a random word will be picked from the list 
	and removed from the array so it won't be asked in the next rounds.*/

	document.getElementById("btnStart").onclick = function () {
		gameStarted = true;
		unknownWord = [];
		document.getElementById("used-letters").innerHTML = ".......";
		placeImg("assets/images/" + images[6]);
		document.getElementById("wins").innerHTML = wins;
		guesses = 6;
		document.getElementById("guesses").innerHTML = guesses;

		if(words.length > 0) {
			rnd =(Math.floor(Math.random() * (words.length)) + 1) - 1;
			currentWord = words[rnd].toLowerCase();
			console.log(currentWord);// Delete this later!
			document.getElementById("word").innerHTML = "";
			words.splice(rnd, 1);

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
				letterSelection = event.key;
				document.getElementById("letter-repeat").innerHTML = "";

				if (currentWord.includes(letterSelection.toLowerCase())) {
					for (var i = 0; i < currentWord.length; i++) {
						if (currentWord[i] === (letterSelection.toLowerCase())) {
							unknownWord[i] = letterSelection;
							document.getElementById("word").innerHTML = unknownWord.join("");
						}
					}

					if (unknownWord.join("").includes(currentWord)) {
						document.getElementById("word").innerHTML = "Congratulations!";
						placeImg("assets/images/" + images[6]);
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
						// repeating a letter from the current word does not give a warning message!!!
						document.getElementById("letter-repeat").innerHTML = "This letter already was used!";
					}

					if (guesses == 0) {
						document.getElementById("word").innerHTML = "Press \"Start\" to try again.";
						gameStarted = false;	
					}
				}

			} else {
				event.preventDefault();
				document.getElementById("letter-repeat").innerHTML = "Please press a proper key!";
			}

		} else {

			if (words.length == 0) {
				document.getElementById("word").innerHTML = "No words left, please refresh the page to restart.";
			} else {
				document.getElementById("word").innerHTML = "Press \"Start Button\" first.";
			}
			
		}
	} 

	// Selects the right image and places it in the left of the viewport.
    function placeImg(hangmanImg) {
      image = document.createElement("img");
      image.setAttribute("src", hangmanImg);
      image.setAttribute("class", "mw-100");
      image.setAttribute("id", "left-image");
      document.getElementById("image-spot").innerHTML = "";
      document.getElementById("image-spot").appendChild(image);
    }
}
