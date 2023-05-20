(function () {
    // Functions
    function buildQuiz() {
        // variable to store the HTML output
        const output = [];

        // for each question...
        myQuestions.forEach(
            (currentQuestion, questionNumber) => {

                // variable to store the list of possible answers
                const answers = [];

                // and for each available answer...
                for (letter in currentQuestion.answers) {

                    // ...add an HTML radio button
                    answers.push(
                        `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
                    );
                }

                // add this question and its answers to the output
                output.push(
                    `<div class="slide">
            <div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join("")} </div>
          </div>`
                );
            }
        );

        // finally combine our output list into one string of HTML and put it on the page
        quizContainer.innerHTML = output.join('');
    }

    function showResults() {

        // gather answer containers from our quiz
        const answerContainers = quizContainer.querySelectorAll('.answers');

        // keep track of user's answers
        let numCorrect = 0;

        // for each question...
        myQuestions.forEach((currentQuestion, questionNumber) => {

            // find selected answer
            const answerContainer = answerContainers[questionNumber];
            const selector = `input[name=question${questionNumber}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;

            // if answer is correct
            if (userAnswer === currentQuestion.correctAnswer) {
                // add to the number of correct answers
                numCorrect++;

                // color the answers green
                answerContainers[questionNumber].style.color = 'lightgreen';
            }
            // if answer is wrong or blank
            else {
                // color the answers red
                answerContainers[questionNumber].style.color = 'red';
            }
        });

        // show number of correct answers out of total
        resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
    }

    function showSlide(n) {
        slides[currentSlide].classList.remove('active-slide');
        slides[n].classList.add('active-slide');
        currentSlide = n;
        if (currentSlide === 0) {
            previousButton.style.display = 'none';
        }
        else {
            previousButton.style.display = 'inline-block';
        }
        if (currentSlide === slides.length - 1) {
            nextButton.style.display = 'none';
            submitButton.style.display = 'inline-block';
        }
        else {
            nextButton.style.display = 'inline-block';
            submitButton.style.display = 'none';
        }
    }

    function showNextSlide() {
        showSlide(currentSlide + 1);
    }

    function showPreviousSlide() {
        showSlide(currentSlide - 1);
    }

    // Variables
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');
    const myQuestions = [
        {
            question: "What do the colors of Mardi Gras stand for? Green is for _________, gold means_________and purple symbolizes ___________.",
            answers: {
                a: "faith, power and justice",
                b: "grass, sun and flowers",
                c: "love, happiness and sacred"
            },
            correctAnswer: "a"
        },
        {
            question: "What does mardi gras mean?",
            answers: {
                a: "Parade",
                b: "Fat Tuesday",
                c: "Big party"
            },
            correctAnswer: "b"
        },
        {
            question: "It is illegal to ride in a Mardi Gras parade without a mask?",
            answers: {
                a: "True",
                b: "False",

            },
            correctAnswer: "a"
        },
        {
            question: "What is a doubloon?",
            answers: {
                a: "A cake with a baby inside",
                b: "A colorful mask worn at Mardi Gras",
                c: "A special coin thrown at parades"
            },
            correctAnswer: "c"
        },
        {
            question: "How many king cakes are sold every year in New Orleans?",
            answers: {
                a: "25,000",
                b: "2 million",
                c: "750,000"
            },
            correctAnswer: "c"
        },
        {
            question: "Mardi Gras has been a legal holiday since ________.",
            answers: {
                a: "1875",
                b: "1805",
                c: "1990"
            },
            correctAnswer: "a"
        },
        {
            question: "Before the Cajuns settled in Louisiana, where did they settle after leaving France?",
            answers: {
                a: "Eastern Canada",
                b: "Maine",
                c: "The Great Lakes"
            },
            correctAnswer: "a"
        },
        {
            question: "Which of the following is a Louisiana dish?",
            answers: {
                a: "Gumbo",
                b: "Etouffée",
                c: "Jambalaya",
                d: "All of these"
            },
            correctAnswer: "d"
        },
        {
            question: "What does it mean to get the baby in your piece of king cake?",
            answers: {
                a: "wealth and riches",
                b: "good luck all year",
                c: "lucky in love"
            },
            correctAnswer: "b"
        },
        {
            question: "What is the general name given to organizations that put together floats for parades and/or balls?",
            answers: {
                a: "Krewes",
                b: "Pacts",
                c: "Mardi Gras masses"
            },
            correctAnswer: "a"
        },
    ];

    // Kick things off
    buildQuiz();

    // Pagination
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;

    // Show the first slide
    showSlide(currentSlide);

    // Event listeners
    submitButton.addEventListener('click', showResults);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);
})();
