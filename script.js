// Project4Kentucky — School Project JavaScript

document.addEventListener('DOMContentLoaded', function () {

  // ── Active navigation link ──────────────────────────────────────────────
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach(function (link) {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });

  // ── Simple Kentucky trivia quiz ─────────────────────────────────────────
  var questions = [
    {
      question: 'What is the capital city of Kentucky?',
      options: ['Louisville', 'Lexington', 'Frankfort', 'Bowling Green'],
      answer: 'Frankfort'
    },
    {
      question: 'Which famous horse race is held annually in Louisville?',
      options: ['Preakness Stakes', 'The Belmont Stakes', 'The Kentucky Derby', 'Breeders\u2019 Cup'],
      answer: 'The Kentucky Derby'
    },
    {
      question: 'What nickname does Kentucky officially carry?',
      options: ['The Bluegrass State', 'The Peach State', 'The Volunteer State', 'The Lone Star State'],
      answer: 'The Bluegrass State'
    }
  ];

  var currentQuestion = 0;

  function loadQuestion() {
    var q = questions[currentQuestion];
    document.getElementById('quiz-question').textContent =
      'Question ' + (currentQuestion + 1) + ' of ' + questions.length + ': ' + q.question;

    var container = document.getElementById('quiz-options');
    container.innerHTML = '';

    q.options.forEach(function (option) {
      var label = document.createElement('label');
      var radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = option;
      label.appendChild(radio);
      label.appendChild(document.createTextNode(' ' + option));
      container.appendChild(label);
    });

    document.getElementById('quiz-result').textContent = '';
    document.getElementById('quiz-result').className = '';
  }

  var submitBtn = document.getElementById('quiz-submit');
  if (submitBtn) {
    loadQuestion();

    submitBtn.addEventListener('click', function () {
      var selected = document.querySelector('input[name="quiz"]:checked');
      var resultEl = document.getElementById('quiz-result');

      if (!selected) {
        resultEl.textContent = 'Please select an answer.';
        resultEl.className = 'incorrect';
        return;
      }

      if (selected.value === questions[currentQuestion].answer) {
        resultEl.textContent = '✓ Correct! Great job!';
        resultEl.className = 'correct';
      } else {
        resultEl.textContent =
          '✗ Not quite. The correct answer is: ' + questions[currentQuestion].answer;
        resultEl.className = 'incorrect';
      }

      setTimeout(function () {
        currentQuestion = (currentQuestion + 1) % questions.length;
        loadQuestion();
      }, 2000);
    });
  }

  // ── Smooth scroll for the hero "Learn More" button ─────────────────────
  var learnMore = document.getElementById('learn-more-btn');
  if (learnMore) {
    learnMore.addEventListener('click', function (e) {
      e.preventDefault();
      var target = document.getElementById('about');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
});
