// Arrays to store the game sequence and the user's input sequence
let gameSeq = [];
let userSeq = [];

// Array of button colors
let btns = ["yellow", "red", "purple", "green"];

// Flags to track if the game has started and the current level
let started = false;
let level = 0;

// Reference to the h2 element where the level or game status is displayed
let h2 = document.querySelector("h2");

// Event listener to start the game on a keypress
document.addEventListener("keypress", function() {
    if (!started) {
        console.log("game is started");
        started = true;
        levelUp(); // Start the game by moving to the first level
    }
});

// Function to add a flash effect to a button when the game sequence is shown
function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250); // Flash duration
}

// Function to add a flash effect to a button when the user clicks it
function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    }, 250); // Flash duration
}

// Function to advance the game to the next level
function levelUp() {
    level++;
    h2.innerText = `Level ${level}`; // Display the current level

    // Generate a random index to choose a random color from the btns array
    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`); // Select the button with the random color
    gameSeq.push(randColor); // Add the random color to the game sequence
    console.log(gameSeq);
    btnFlash(randBtn); // Flash the random button

    userSeq = [];  // Reset user sequence for the new level
}

// Function to check the user's input against the game sequence
function checkAns(currentLevel) {
    if (userSeq[currentLevel] === gameSeq[currentLevel]) {
        // If the user's current input matches the game sequence at the same position
        if (userSeq.length === gameSeq.length) {
            // If the user has completed the sequence correctly
            setTimeout(levelUp, 1000); // Move to the next level after a delay
        }
        console.log("Same Value");
    } else {
        // If the user's input does not match the game sequence
        h2.innerText = `Game Over! Press any key to start.`;
        started = false; // Reset the game state
        gameSeq = [];
        userSeq = [];
        level = 0;
    }
}

// Event handler for button clicks
function btnPress() {
    console.log(this);
    let btn = this;
    userFlash(btn); // Flash the button that was clicked

    let userColor = btn.getAttribute("id"); // Get the color of the clicked button
    userSeq.push(userColor); // Add the user's input to their sequence

    checkAns(userSeq.length - 1); // Check the user's input against the game sequence
}

// Add event listeners to all buttons to handle user clicks
let allBtns = document.querySelectorAll(".btn");
allBtns.forEach(function(btn) {
    btn.addEventListener("click", btnPress);
});
