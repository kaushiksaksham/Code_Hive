// ======================================
// AI LEARNING HUB - JAVASCRIPT
// ======================================


// QUIZ QUESTION DATABASE

const questionBank = {

    HTML: [
        {
            question: "What does HTML stand for?",
            options: [
                "Hyper Text Markup Language",
                "High Text Machine Language",
                "Hyper Transfer Markup Language",
                "Home Tool Markup Language"
            ],
            answer: 0
        },
        {
            question: "Which tag creates a paragraph?",
            options: ["<h1>", "<p>", "<div>", "<br>"],
            answer: 1
        },
        {
            question: "Which tag creates a hyperlink?",
            options: ["<img>", "<link>", "<a>", "<href>"],
            answer: 2
        }
    ],

    CSS: [
        {
            question: "What does CSS stand for?",
            options: [
                "Computer Style Sheets",
                "Cascading Style Sheets",
                "Creative Style System",
                "Colorful Style Sheets"
            ],
            answer: 1
        },
        {
            question: "Which property changes text color?",
            options: [
                "background",
                "font-style",
                "color",
                "text-size"
            ],
            answer: 2
        },
        {
            question: "Which property changes background color?",
            options: [
                "background-color",
                "font-color",
                "text-background",
                "color-background"
            ],
            answer: 0
        }
    ],

    JavaScript: [
        {
            question: "Which keyword declares a variable?",
            options: ["int", "let", "define", "string"],
            answer: 1
        },
        {
            question: "Which method displays a message in the console?",
            options: [
                "print()",
                "display()",
                "console.log()",
                "show()"
            ],
            answer: 2
        },
        {
            question: "Which symbol is used for strict equality?",
            options: ["=", "==", "===", "!="],
            answer: 2
        }
    ],

    Python: [
        {
            question: "Which symbol starts a comment in Python?",
            options: ["//", "#", "/*", "<!--"],
            answer: 1
        },
        {
            question: "Which function displays output in Python?",
            options: ["echo()", "show()", "print()", "display()"],
            answer: 2
        },
        {
            question: "Which data type stores True or False?",
            options: ["String", "Boolean", "List", "Integer"],
            answer: 1
        }
    ]

};


// ======================================
// QUIZ GENERATOR
// ======================================

const generateQuizButton =
    document.getElementById("generateQuiz");

const quizArea =
    document.getElementById("quizArea");

const quizResult =
    document.getElementById("quizResult");


generateQuizButton.addEventListener("click", function () {

    const topic =
        document.getElementById("quizTopic").value;

    const questions = questionBank[topic];

    quizResult.innerHTML = "";

    quizArea.innerHTML = "";

    const heading = document.createElement("h3");
    heading.textContent = topic + " Quiz";

    quizArea.appendChild(heading);


    questions.forEach(function (question, index) {

        const card = document.createElement("div");

        card.className = "question-card";


        const title = document.createElement("h3");

        title.textContent =
            (index + 1) + ". " + question.question;

        card.appendChild(title);


        question.options.forEach(function (option, optionIndex) {

            const label = document.createElement("label");

            label.className = "option-label";


            const radio = document.createElement("input");

            radio.type = "radio";

            radio.name = "question" + index;

            radio.value = optionIndex;


            const text = document.createElement("span");

            text.textContent = option;


            label.appendChild(radio);

            label.appendChild(text);

            card.appendChild(label);

        });


        quizArea.appendChild(card);

    });


    const submitButton = document.createElement("button");

    submitButton.textContent = "Submit Quiz";

    submitButton.className = "primary-btn";


    submitButton.addEventListener("click", function () {

        let score = 0;

        let unanswered = 0;


        questions.forEach(function (question, index) {

            const selected = document.querySelector(
                'input[name="question' + index + '"]:checked'
            );


            if (!selected) {

                unanswered++;

            } else if (
                Number(selected.value) === question.answer
            ) {

                score++;

            }

        });


        if (unanswered > 0) {

            quizResult.className = "";

            quizResult.textContent =
                "Please answer all " +
                questions.length +
                " questions before submitting.";

            return;

        }


        // Prevent repeated submissions.

        submitButton.disabled = true;

        submitButton.textContent = "Quiz Submitted";


        // Save result.

        saveScore(topic, score, questions.length);


        quizResult.className = "result-message";

        quizResult.textContent =
            "Your score: " +
            score +
            " out of " +
            questions.length +
            " (" +
            Math.round(score / questions.length * 100) +
            "%)";


        // Disable answers after submission.

        quizArea.querySelectorAll("input").forEach(function (input) {

            input.disabled = true;

        });


        // Update scoreboard.

        displayScores();

    });


    quizArea.appendChild(submitButton);

});


// ======================================
// SCOREBOARD
// ======================================

function saveScore(topic, score, total) {

    let scores = JSON.parse(
        localStorage.getItem("learningScores")
    ) || [];


    const result = {

        topic: topic,

        score: score,

        total: total,

        date: new Date().toLocaleDateString()

    };


    scores.push(result);


    localStorage.setItem(
        "learningScores",
        JSON.stringify(scores)
    );

}


function displayScores() {

    const scores = JSON.parse(
        localStorage.getItem("learningScores")
    ) || [];


    const table = document.getElementById("scoreTable");

    const summary = document.getElementById("scoreSummary");


    table.innerHTML = "";

    summary.textContent = "";


    if (scores.length === 0) {

        summary.textContent = "No quiz attempts yet.";

        const row = document.createElement("tr");

        const cell = document.createElement("td");

        cell.colSpan = 4;

        cell.className = "empty-message";

        cell.textContent =
            "Complete a quiz to see your scores here.";

        row.appendChild(cell);

        table.appendChild(row);

        return;

    }


    let totalScore = 0;

    let totalQuestions = 0;


    scores.forEach(function (item) {

        totalScore += item.score;

        totalQuestions += item.total;


        const row = document.createElement("tr");


        const topicCell = document.createElement("td");

        topicCell.textContent = item.topic;


        const scoreCell = document.createElement("td");

        scoreCell.textContent = item.score;


        const totalCell = document.createElement("td");

        totalCell.textContent = item.total;


        const dateCell = document.createElement("td");

        dateCell.textContent = item.date;


        row.appendChild(topicCell);

        row.appendChild(scoreCell);

        row.appendChild(totalCell);

        row.appendChild(dateCell);


        table.appendChild(row);

    });


    const percentage = totalQuestions > 0
        ? Math.round(totalScore / totalQuestions * 100)
        : 0;


    summary.textContent =
        "Quiz Attempts: " +
        scores.length +
        " | Total Correct Answers: " +
        totalScore +
        " | Overall Accuracy: " +
        percentage +
        "%";

}


// Clear saved scores.

document.getElementById("clearScores").addEventListener(
    "click",
    function () {

        const confirmed = confirm(
            "Are you sure you want to clear all quiz scores?"
        );


        if (confirmed) {

            localStorage.removeItem("learningScores");

            displayScores();

        }

    }
);


// ======================================
// MIND MAP MAKER
// ======================================

document.getElementById("generateMindMap").addEventListener(
    "click",
    function () {

        const topicInput =
            document.getElementById("mindTopic").value.trim();

        const subtopicInput =
            document.getElementById("subTopics").value.trim();

        const mindMapArea =
            document.getElementById("mindMapArea");


        mindMapArea.innerHTML = "";


        if (!topicInput) {

            alert("Please enter a main topic.");

            return;

        }


        const root = document.createElement("div");

        root.className = "mindmap-root";

        root.textContent = topicInput;


        mindMapArea.appendChild(root);


        const topics = subtopicInput
            .split(",")
            .map(function (item) {
                return item.trim();
            })
            .filter(function (item) {
                return item.length > 0;
            });


        if (topics.length === 0) {

            const message = document.createElement("p");

            message.textContent =
                "Add subtopics separated by commas to create branches.";

            message.style.marginTop = "20px";

            mindMapArea.appendChild(message);

            return;

        }


        const branches = document.createElement("div");

        branches.className = "mindmap-branches";


        topics.forEach(function (topic) {

            const node = document.createElement("div");

            node.className = "mindmap-node";

            node.textContent = topic;


            branches.appendChild(node);

        });


        mindMapArea.appendChild(branches);

    }
);


// ======================================
// INITIALIZE WEBSITE
// ======================================

// Show saved scores when the website opens.

displayScores();