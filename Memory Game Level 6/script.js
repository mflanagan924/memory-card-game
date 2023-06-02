// This array is used to randomize the cards
var myArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

/* Object that holds all of the country information
It store the information in the following order:
flipped: tells if false, the card is not flipped ie showing only the front of the card, if true then showing the back of the card where the info is
picture: lets you know if the card is the picture if it is true than don't show the picture if it is false than show the picture
country: the name of the country
capital: the capital of the country
fact: interesting info about the country
imagePath: the image of the country flag */

var playingCard = {
    1: {
        flipped: false,
        back: {
            picture: true,
            country: "Egypt",
            capital: "Cairo",
            fact: "Is home to the Only Remaining Ancient Wonder in the World, the Great Pyramid of Giza.",
            imagePath: "images/egypt-300x200.png"
        }
    },
    2: {
        flipped: false,
        back: {
            picture: false,
            country: "Egypt",
            imagePath: "images/egypt-300x200.png"
        }
    },
    3: {
        flipped: false,
        back: {
            picture: true,
            country: "Iraq",
            capital: "Baghdad",
            fact: "A superstition about black cats could have originated in Iraq.",
            imagePath: "images/iraq-300x200.png"
        }
    },
    4: {
        flipped: false,
        back: {
            picture: false,
            country: "Iraq",
            imagePath: "images/iraq-300x200.png"
        }
    },
    5: {
        flipped: false,
        back: {
            picture: true,
            country: "Yemen",
            capital: "Sana'a",
            fact: "Mocha is a port city that found this thype of coffee in the 14th century.",
            imagePath: "images/yemen-300x200.png"
        }
    },
    6: {
        flipped: false,
        back: {
            picture: false,
            country: "Yemen",
            imagePath: "images/yemen-300x200.png"
        }
    },
    7: {
        flipped: false,
        back: {
            picture: true,
            country: "Sudan",
            capital: "Khartoum",
            fact: "Is home to more pyramids than Egypt.",
            imagePath: "images/sudan-300x150.png"
        }
    },
    8: {
        flipped: false,
        back: {
            picture: false,
            country: "Sudan",
            imagePath: "images/sudan-300x150.png"
        }
    },
    9: {
        flipped: false,
        back: {
            picture: true,
            country: "Syria",
            capital: "Damascus",
            fact: "Is home to the oldest library in the world dating to around 3,000 BC.",
            imagePath: "images/syria-300x200.png"
        }
    },
    10: {
        flipped: false,
        back: {
            picture: false,
            country: "Syria",
            imagePath: "images/syria-300x200.png"
        }
    },    
};

// Initialize each card by selecting all items with the items in the html document with class of card
var cards = document.querySelectorAll('.card');
// Initialize each card value
var cardValues = [];
// Initialize the tempArr that stores the index and country of the clicked cards
var tempArr = [];
// Flag to indicate whether clicks are enabled
var clickEnabled = true; 
// Initialize the score in the game, ie how many times it takes to win game
let count = 0;
// Initialize the counter to check if the game is finished
let finishGameCounter = 0;

// Initialize by hiding hte restart button
var hideButtonRestart =  document.getElementById("restart-game-btn");
 hideButtonRestart.style.visibility = "hidden";


var cardElements = document.getElementsByClassName("card");
    for (var i = 0; i < cardElements.length; i++) {
      cardElements[i].style.pointerEvents = "none";
      // Create a new image element for each card
      var imageElement = document.createElement("img");
      imageElement.src = "images/world-map-297446_1280.png";
      // Append the image element to the current card element
      cardElements[i].appendChild(imageElement);
    }

// Empty array to store the ID of each card that is clicked
let cardIDArr = [];

//event listener for clicking of each card
cards.forEach(function(card, index) {
  card.addEventListener('click', function() {
    // Check if clicks are enabled
    if (!clickEnabled) {
      return;
    }
    // Index of the clicked card
    var clickedCardIndex = Array.from(cards).indexOf(this);
    // Establishes what the card is by looking athte playingCard object and using clickedCardIndex
    var currentCard = playingCard[myArray[clickedCardIndex]];
    // Prevents clicking a card again after it has already been set to flipped === true
    if (currentCard.flipped === true){
        return;
    }
      // Changes the flipped condition to true
      currentCard.flipped = true;
      // Adds the flipped class to the clicked card
      card.classList.add("flipped"); 
      // Used to monitor that the card that was clicked, helps save the first card and second card that was clicked
      cardIDArr.push(card.id);
      // Pushes the index of the card that was clicked
      tempArr.push(clickedCardIndex)
      // Pushes the country of the clicked card
      tempArr.push(currentCard.back.country)
      // Reinitializes the display of cards
      displayArrayValue();
      // Checking when 2 cards have been clicked and if they are the same country
      if (tempArr.length === 4 && tempArr[1] === tempArr[3]) {
        // Gets the first card that was clicked
        var element = document.getElementById(cardIDArr[0]);
        // Removes the flipped class from the second card that was clicked
        card.classList.remove("flipped"); 
        // Removes the flipped class from the first card that was clicked
        element.classList.remove("flipped"); 
        // Reinitializes the temp array
        tempArr = [];
        // Adds 1 to the score
        count += 1;
        // Reinitializes the cardIDArr
        cardIDArr = [];
        // Score updater
        var score = document.querySelector('.score');
        score.textContent = "Turns: " + count;
        // Adds to the finishGameCounter which monitors if the game is finished or not
        finishGameCounter += 1;
        // Finished game conditions
        // Checks when the game is finished and if it took more than 20 turns to finish
        if (finishGameCounter === 5 && count > 20) {
          // Shows picture for this condition
          var hideImprovePicture = document.getElementById("need-to-improve");
          hideImprovePicture.style.visibility = "visible";
        // Checks when the game is finished and if it took between 9 and 20 turns to finish
        } else if (finishGameCounter === 5 && count > 8) {
          // Shows picture for this condition
          var goodJob = document.getElementById("good-job");
          goodJob.style.visibility = "visible";
        // Checks when the game is finished and if it took between 5 and 8 turns to finish
        } else if (finishGameCounter === 5 && count > 5) {
          // Shows picture for this condition
          // calls the confetti.js function
          startConfetti();
          var greatJob = document.getElementById("great-job");
          greatJob.style.visibility = "visible";
        // Checks when you get the perfect game ie in 5 turns
        } else if (finishGameCounter === 5 && count === 5) {
          // Shows picture for this condition
          // calls the confetti.js function
          startConfetti();
          var perfectJob = document.getElementById("perfect-job");
          perfectJob.style.visibility = "visible";
        }
      // Checks in case when two cards are picked but they are not equal
      } else if (tempArr.length === 4 && tempArr[1] !== tempArr[3]) {
        var element = document.getElementById(cardIDArr[0]);
        // Disable click event listeners temporarily
        clickEnabled = false;
        // Increases the score
        count += 1;
        // Score updater
        var score = document.querySelector('.score');
        // Update the score text
        score.textContent = "Turns: " + count;
        // Flip the cards back after a delay
        setTimeout(function() {
          // Second card selected
          card.classList.remove("flipped"); 
          // First card selected
          element.classList.remove("flipped"); 
          // Adds the reverse flip css to second card
          card.classList.add("reverse-flipped"); 
          // Adds teh reverse flip css to the first card
          element.classList.add("reverse-flipped");
          // Rests the flipped back for both of these cards
          playingCard[myArray[tempArr[0]]].flipped = false;
          playingCard[myArray[tempArr[2]]].flipped = false;
          // Rests the ID check
          cardIDArr = [];
          // Rests the tempArr
          tempArr = [];
          // Update the displaid cards
          displayArrayValue();
          // Re-enable click event listeners
          clickEnabled = true;
          // Timeout function to take off the reverse-flipped class on the cards
          setTimeout(function() {
            card.classList.remove("reverse-flipped"); 
            element.classList.remove("reverse-flipped"); 
          }, 500);
        }, 3000); // Adjust the delay time (in milliseconds) as needed
      }
    // Update the displayed card at the end
    displayArrayValue();
    }
  );
});

// Function to show which cards are displayed
function displayArrayValue() {
  // Map each card value
  cardValues.map((cardValue, index) => {
    var currentCard = playingCard[myArray[index]];
    // When cards are not flipped they shows their back
    if (currentCard.flipped === false) {  
      cardValue.textContent = "picture";
      var imageElement = document.createElement("img");
      imageElement.src = "images/world-map-297446_1280.png";
      while (cardValue.firstChild) {
        cardValue.firstChild.remove();
      }
      cardValue.appendChild(imageElement);
    }
    // If card is flipped and it is an info card
    if (currentCard.back.picture === true && currentCard.flipped === true) {
      // Sets the HTML of the card
      cardValue.innerHTML = "<b class='country-name'>" + currentCard.back.country + "</b>" + "<p class='card-info'>" + "<b>Capital:</b> " + "<br>" + currentCard.back.capital + "<br><br>" + "<b>Interesting Fact:</b> " + "<br>" + currentCard.back.fact + "</p>";
    }
    // If the card is flipped and it is a picture card
    if (currentCard.back.picture === false && currentCard.flipped === true) {
      cardValue.textContent = "picture";
      var imageElement = document.createElement("img");
      imageElement.src = currentCard.back.imagePath;
      while (cardValue.firstChild) {
        cardValue.firstChild.remove();
      }
      cardValue.appendChild(imageElement);
    }
  });
}

// Shuffles the array using the Fisher-Yates shuffle algorithm.
function shuffleArray(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  // While there remain elements to shuffle
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // Swap it with the current element
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  // Check if the shuffled array contains duplicate countries or flags
  var hasDuplicateCountries = false;
  var hasDuplicateFlags = false;
  for (var i = 0; i < array.length - 1; i++) {
    var currentCard = playingCard[array[i]];
    var nextCard = playingCard[array[i + 1]];
    if (currentCard.back.country === nextCard.back.country) {
      hasDuplicateCountries = true;
      break;
    }
    if (currentCard.back.imagePath === nextCard.back.imagePath) {
      hasDuplicateFlags = true;
      break;
    }
  }
  // If there are duplicate countries or flags, shuffle the array again
  if (hasDuplicateCountries || hasDuplicateFlags) {
    return shuffleArray(array);
  }
  return array;
}

// Initializes the need-to-improve as hidden
var hideImprovePicture =  document.getElementById("need-to-improve");
hideImprovePicture.style.visibility = "hidden";

// Initializes the good-job as hidden
var goodJob = document.getElementById("good-job");
goodJob.style.visibility = "hidden";

// Initializes the great-job as hidden
var greatJob = document.getElementById("great-job");
greatJob.style.visibility = "hidden";

// Initializes the perfect-job as hidden
var perfectJob = document.getElementById("perfect-job");
perfectJob.style.visibility = "hidden";

// Start game button function
function startGame() {
// Enable the card elements
var cardElements = document.getElementsByClassName("card");
for (var i = 0; i < cardElements.length; i++) {
  cardElements[i].style.pointerEvents = "auto";
}
// Shuffle the cards
var shuffledArray = shuffleArray(myArray);
var cards = document.querySelectorAll('.card');
cards.forEach(function(card) {
  card.style.visibility = "visible";
});
// Sets all the win cards to hidden
var hideImprovePicture =  document.getElementById("need-to-improve");
hideImprovePicture.style.visibility = "hidden"; 
var goodJob = document.getElementById("good-job");
goodJob.style.visibility = "hidden";
var greatJob = document.getElementById("great-job");
greatJob.style.visibility = "hidden";
var perfectJob = document.getElementById("perfect-job");
perfectJob.style.visibility = "hidden";
// Disable the "start game" button
document.getElementById("start-game-btn").disabled = true;
var hideButton =  document.getElementById("start-game-btn");
hideButton.style.visibility = "hidden";
// Enable the "restart game" button
document.getElementById("restart-game-btn").disabled = false;
var hideButtonRestart =  document.getElementById("restart-game-btn");
hideButtonRestart.style.visibility = "visible";
// Initialize cardValues
cardValues = Array.from({ length: 10 }, (_, i) =>
document.getElementById(`card${i + 1}`)
);
// Display the array value at index 0
displayArrayValue();
}

// Initialize the restart button so that is is disabled
document.getElementById("restart-game-btn").disabled = true;

// Restart game function
function restartGame() {
  // Enable start button
  var score = document.querySelector('.score');
  document.getElementById("start-game-btn").disabled = false;
  var hideButton =  document.getElementById("start-game-btn");
  hideButton.style.visibility = "visible";
  // Disable restart button
  var hideButtonRestart =  document.getElementById("restart-game-btn");
  hideButtonRestart.style.visibility = "hidden";
  document.getElementById("restart-game-btn").disabled = true;
  // Hides the win condition cards
  var hideImprovePicture =  document.getElementById("need-to-improve");
  hideImprovePicture.style.visibility = "hidden";
  var goodJob = document.getElementById("good-job");
  goodJob.style.visibility = "hidden";
  var greatJob = document.getElementById("great-job");
  greatJob.style.visibility = "hidden";
  var perfectJob = document.getElementById("perfect-job");
  perfectJob.style.visibility = "hidden";
  // Resets the score text
  score.textContent = "Turns: 0";
  // Resets the score
  count = 0;
  // Resets the end game counter
  finishGameCounter = 0;
  // Disable the card elements
  var cardElements = document.getElementsByClassName("card");
  for (var i = 0; i < cardElements.length; i++) {
    cardElements[i].style.pointerEvents = "none";
  }
  for (i = 1; i < 11; i++){
    playingCard[i].flipped = false;
  }
  // Stop th confetti
  stopConfetti();
  // Display the cards
  displayArrayValue();
}

// Event listener for hover over the countries in the description to show hint of their flag
document.addEventListener("DOMContentLoaded", function() {
  var countryElements = document.querySelectorAll(".country");
  var popup = document.querySelector(".popup");
  var flagImage = popup.querySelector(".flag-image");
  countryElements.forEach(function(countryElement) {
    countryElement.addEventListener("mouseenter", function(event) {
      var cardId = countryElement.dataset.card;
      var imagePath = playingCard[cardId].back.imagePath;
      flagImage.src = imagePath;
      popup.style.display = "block";
      // Position the popup relative to the hovered text
      var rect = event.target.getBoundingClientRect();
      popup.style.top = rect.top + "px";
      popup.style.left = rect.right + "px";
    });
    countryElement.addEventListener("mouseleave", function() {
      popup.style.display = "none";
    });
  });
});

