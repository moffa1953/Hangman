$(document).ready(function() {
		// set up global variables
		var charsUsed = "";
		var displayStage;
		var maxAttempts = 0;
		var gameStatus   = "start"
		var artists      = Array("JIMI HENDRIX", "ROLLING STONES", "YOUNG RASCALS","ERIC CLAPTON");
		var hints        = Array("Are you Experienced?", "They can't get satisfied", "Their Lovin has to be good","He is the main ingredient in Cream")
		var userChoice;
		var message = "";
		var gameNo       = 4;
		var artistsName;
		var openSelection;
		var previousStatus;
		var letterUsed = "";
		var letterFound = "";

        //image variables
        var displayRow = Array(0,1,1,1,2,2,3);
        var bodyParts  = Array(" O "," | ","\\| ","\\|/","/  ","/ \\");
        var displayMan = Array(" "," "," "," ");

        if(confirm("Would you like to play the game Hangman?")) {
        	gameStatus = 'play';
        	initGame();
        }


	// document.onkeyup = function(event) {
		checkStatus()
//		updateScreen()


if(gameStatus = 'play') {

	document.onkeyup = function(event) {
		updateScreen()
		userChoice = event.key;
		letterType = event.code

	            // test if entry is a valid key
	            userChoiceValid = letterType.startsWith('Key');

	            if(userChoiceValid) {
	            	userChoice = userChoice.toUpperCase();            	
	            	validateAndProcess();
	            	checkStatus()

	            } // end of UserChoiceValid condition 
			} // end of keyup
		} // end of gameStatus play condition


		function initGame() {
			charsUsed    = "";
			displayStage = "";
			displayMan = ["","","","",""];
			maxAttempts  = 0;
			userChoice   = "";
			message		 = "";
			gameNo       = gameNo - 1;        
			artistsName  = artists[gameNo];

        // the following will initially set the display stage to underscores
        openSelection = "[ABCDEFGHIJKLMNOPQRSTUVWXYZ]";
        reg = new RegExp(openSelection, "g");
        userChoice = "#";
        updateScreen();
        updateBody();

	} // end of function init game


	function updateScreen() {
		reg = RegExp(userChoice, "g");
		openSelection = openSelection.replace(reg,"#");

		var reg = RegExp(openSelection, "g");
		displayStage = artistsName.replace(reg, "-");

		document.getElementById("displayStage").innerHTML = displayStage;
		document.getElementById("hintBox").innerHTML = "<h4>Guest the musical artist - <h4>Hint:</h4> <h4>"+hints[gameNo]+"</h4>";
		document.getElementById("charsUsed").innerHTML = "Letters Used: " + charsUsed.split("");
		document.getElementById("message").innerHTML = message;
		document.getElementById("maxAttempts").innerHTML = "Lives Remaining " +(6 -maxAttempts);

    }  // end of function update screen

    // this function builds the hangmans body
    function updateBody() {
    	displayMan[displayRow[maxAttempts - 1]] = bodyParts[maxAttempts - 1];
    	document.getElementById("Line0").innerHTML = displayMan[0];
    	document.getElementById("Line1").innerHTML = displayMan[1];
    	document.getElementById("Line2").innerHTML = displayMan[2];
    	document.getElementById("Line3").innerHTML = displayMan[3];
    } // end of function update body

    function validateAndProcess() {

    		// check if letter was used before


    		if(charsUsed.search(userChoice) != -1) {
    			message = "This letter has been used before";
    			document.getElementById("message").style.color = "blue";
    		} else {
    			charsUsed = charsUsed + userChoice;

    			if(artistsName.search(userChoice) != -1) {
    				message = "Yes. we found a hit!!";
    				updateScreen()
    				document.getElementById("message").style.color = "black";
    			} else {
    				maxAttempts += 1;
    				message = "The letter " + userChoice + " is not in the artists name";
    				document.getElementById("message").style.color = "red";
    				updateScreen()
    				updateBody();
    			}
    		}
    		checkStatus()
    		//charsUsed = charsUsed + userChoice;

    } // end of function ValidateandProcess

    function checkStatus() {	

    	if((displayStage == artistsName) || (maxAttempts == 6)) {			
    		gameStatus = 'new';
    		if(maxAttempts == 6) {					   
    			message = "Sorry - you lost";
    			if(maxAttempts == 6) {
    				displayMan[0] = "@";              				
    				displayMan[1] = "/|\\";
    				document.getElementById("bodywrap").style.color = "red";
    			}	
    		} else {
    			message = "You Won - Great Job";		
    		}
    		updateScreen();

    		if(gameNo == 0) {
    			gameStatus = 'end'
    		}
    		

     } // end of check current game status

     switch(gameStatus) {

     	case 'new':
     	updateScreen();
     	console.log(message)
     	var gameStatus = confirm("Would you like to play another game Hangman?")
     	break;
     	case 'end':
     	alert("That was the last game - Thanks for playing")
     	break;
     }

        // check if user wants to play another game
        if(gameStatus) {
        	initGame();
        }
    }
}) //ready