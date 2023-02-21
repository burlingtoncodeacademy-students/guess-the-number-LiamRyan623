const { clear } = require('console');
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}


// run file in terminal with; node fileName.js
// ! DO NOT TOUCH CODE ABOVE THIS LINE


/*   
Okay. I have NO idea what is happening. The game works, but when choosing to be the guesser it logs this Guess a number from 1 to 25: you have chosen to be the guesser.
Guess a number from 1 to 25: you have chosen to be the guesser.
Guess a number from 1 to 25: You have chosen to have me guess the number.
Guess a number from 1 to 25:
This is when you can start playing the game. When choosing to have the computer guess things work as normally. Please advise!
*/
gameStart()
  async function gameStart(){
  console.log("Welcome to number picker!");
 let gameMode = await ask (`If you would like to be the guesser enter 1. If you would like the computer to be the guesser enter 2: `)

 if (gameMode == "2") {
  computerStart()
 } else if (gameMode == "1") {
  humanGuess()
 }

 humanGuess()
async function humanGuess() {
  console.log("you have chosen to be the guesser.")

    // creates random number from 1-25
    const random = Math.floor(Math.random() * 25) + 1;

    // take input from the user
    let guess = await ask ('Guess a number from 1 to 25: ');

    // take the input until the guess is correct
    while (guess != random) {
       guess = await ask ("That is not correct. Please guess again. ")
    }

    // check if the guess is correct
    if(guess == random) {
        console.log('You guessed the correct number.');
        let repeat = await ask("Would you like to play again? Yes(y) or No(n)?")
        if (repeat == "y"){
          gameStart()
        } else if (repeat == "n")
        process.exit()
    }

  }

// call the function
humanGuess();

computerStart();

// The function that starts the whole game
async function computerStart() {
  // Intro game text
  // Game intro message
  
  console.log("You have chosen to have me guess the number.")


  // Now try and complete the program.

  // Example async await function to ask for highest num
  pickHighNum()
  async function pickHighNum() {
    // set lowest num         
    let minNum = 1;

    let pickMaxNum = await ask(`\nPlease choose a number greater than ${minNum}: `);
    
    // Grab the value of user input
    let highNum = parseInt(pickMaxNum);

    //confirmation message to print
    console.log(`\nYou set ${highNum} as the highest value.`);


  // this sets the secret number that the player chooses.
   let secretNumber = await ask("What is your secret number?\nI won't peek, I promise...\n");
   secretNumber = parseInt(secretNumber)
  console.log('You entered: ' + secretNumber);
 
  // numMath is the guess the computer makes, and Math.floor is the size of the number pool.
  let numMath = Math.floor((minNum + highNum) / 2)

  //this is the part of the game that allows the computer to guess what the number you chose is.
  gameGuess()
  async function gameGuess() {                  // computer guess
    let guess = await ask(`Is your secret number ${numMath}? Yes(y) or No?(n)`)
    console.log(`You said, ${guess}`)


    //This block of code is what determines if the computer made the right guess, and protects against cheating.
    if (guess == "y" && numMath == secretNumber) {
      console.log("I win!")
    } else if (guess == "y" && secretNumber != numMath){
      console.log("Hey! Don't be lazy! Now we're starting over!")
      start()
    } else if (guess == "n" && numMath == secretNumber){
        console.log("No cheating! Now you lose, AND we're starting over!")
        start()
    } else if (guess == "n" && numMath != secretNumber){
      console.log("Hmm.")
      let pool = await ask(`Is the secret number higher(h) or lower(l)?`)
      if (pool == "l"){
      highNum = numMath - 1;
      numMath = Math.floor((minNum + highNum) / 2)
      console.log(`The new number range is between ${minNum} and ${highNum}`)
      gameGuess()
    } else if (pool == "h"){
        minNum = numMath + 1;
        numMath = Math.floor((minNum + highNum) / 2)
        console.log(`The new number range is between ${minNum} and ${highNum}`)
        gameGuess()
      }
    }

    //if you want to play again it calls back to the gameStart function, and if not process.exit ends the game.
    let playAgain = await ask("Would you like to play again? Yes(y) or No(n)") 
      if (playAgain == "y") {
        gameStart()
      } else if (playAgain == "n"){
        process.exit()
      }
    
  }
    
  
   



  
  }}}