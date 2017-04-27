var cardArguments = process.argv[2];

//switch statement either begins flashcard quiz or creates new cards
switch (cardArguments) {

    case "quiz-me":
        quizMe();
        break;

    case "make-card":
        makeCard();
        break;

};


function quizMe() {


    //require inquirer npm package
    var inquirer = require("inquirer");

    //import flashcard fronts and backs
    var cardsJson = require("./cards.JSON");

    var cardFront = cardsJson.fronts;
    var cardBack = cardsJson.backs;

    //random math allows function to return random index/question
    var randomMath = Math.floor(Math.random() * 8);
    var i = randomMath;

    //quiz prompt
    inquirer.prompt([

        {
            message: cardFront[i].question,
            name: "name"

        }

    ]).then(function(answers) {

        //conditional statement to determine right or wrong answer
        if (answers.name != cardBack[i].answer) {

            console.log("Wrong, bro");
            console.log("correct answer: " + cardBack[i].answer);
        } else {

            console.log("Correct!");
        }

    });
};

//function to create new flashcards
function makeCard() {
    var inquirer = require("inquirer");
    var fs = require('fs');
    // constructor 
    function qConst(front, back) {
        this.front = front;
        this.back = back;
        this.printBoth = function() {
            console.log("Question: " + front + "\n" + "Answer: " + back);
        };
         };

 //prompt to type new questions 
    inquirer.prompt([{
        name: "question",
        message: "Type Question Here"
    }, {
        name: "answer",
        message: "Type Answer Here"

    }]).then(function(answers) {

//example using the above constructor 
        var newQ = new qConst(answers.question, answers.answer);

        newQ.printBoth();
        fs.appendFile("flashcardFiles.txt", JSON.stringify(answers) + "\n", function(error) {
            // JSON.stringify(answers);
            if (error) {
                console.log("ERROR: " + error);
            } else {
                console.log("File Updated");
            }

        });
    });

};

