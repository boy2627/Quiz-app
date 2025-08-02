const quizData = [
  {
    question: "What does JS stand for?",
    options: ["JavaScript", "JavaSource", "JustScript", "JollyScript"],
    answer: "JavaScript"
  },
  {
    question: "Which HTML tag is used to link JavaScript?",
    options: ["<js>", "<javascript>", "<script>", "<code>"],
    answer: "<script>"
  },
  {
    question: "Which method is used to print to console?",
    options: ["console.log()", "print()", "log.console()", "write.console()"],
    answer: "console.log()"
  },
  {
    question: "How do you declare a variable?",
    options: ["v name", "let name", "var = name", "variable name"],
    answer: "let name"
  }
];

let current = 0;
let score = 0;

const questionEl = document.getElementById("question");
const answerButtons = document.querySelectorAll(".answer");
const nextBtn = document.getElementById("next");
const resultEl = document.getElementById("result");

function loadQuiz() {
  resetState();
  const currentData = quizData[current];
  questionEl.textContent = currentData.question;
  answerButtons.forEach((btn, index) => {
    btn.textContent = currentData.options[index];
    btn.onclick = () => checkAnswer(btn.textContent);
  });
}

function checkAnswer(selected) {
  const correct = quizData[current].answer;
  if (selected === correct) {
    score++;
  }

  answerButtons.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correct) {
      btn.style.backgroundColor = "#28a745"; // green
    } else if (btn.textContent === selected) {
      btn.style.backgroundColor = "#dc3545"; // red
    }
  });

  nextBtn.style.display = "block";
}

function resetState() {
  nextBtn.style.display = "none";
  answerButtons.forEach(btn => {
    btn.disabled = false;
    btn.style.backgroundColor = "#f0f0f0";
  });
}

nextBtn.addEventListener("click", () => {
  current++;
  if (current < quizData.length) {
    loadQuiz();
  } else {
    showResult();
  }
});

function showResult() {
  document.getElementById("quiz").classList.add("hidden");
  resultEl.classList.remove("hidden");
  resultEl.textContent = `You scored ${score} out of ${quizData.length}! 🎉`;
}

// Handle Add Question Form
document.getElementById("questionForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const newQuestionText = document.getElementById("newQuestion").value;
  const optionInputs = document.querySelectorAll(".optionInput");
  const newOptions = Array.from(optionInputs).map(input => input.value);
  const correctAnswer = document.getElementById("correctAnswer").value;

  if (newOptions.length !== 4 || newOptions.includes("") || !newQuestionText || !correctAnswer) {
    alert("Please fill out all fields correctly.");
    return;
  }

  quizData.push({
    question: newQuestionText,
    options: newOptions,
    answer: correctAnswer
  });

  document.getElementById("questionForm").reset();
  alert("New question added successfully!");

  if (current >= quizData.length - 1) {
    document.getElementById("quiz").classList.remove("hidden");
    resultEl.classList.add("hidden");
    current = 0;
    score = 0;
    loadQuiz();
  }
});

loadQuiz();
