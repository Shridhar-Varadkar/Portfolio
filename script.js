
let words = document.querySelectorAll(".word");
words.forEach((word) => {
    let letters = word.textContent.split("");
    word.textContent = "";
    letters.forEach((letter) => {
        let span = document.createElement("span");
        span.textContent = letter;
        span.className = "letter";
        word.append(span);
    });
});
let currentWordIndex = 0;
let maxWordIndex = words.length - 1;
words[currentWordIndex].style.opacity = "1";

let changeText = () => {
    let currentWord = words[currentWordIndex];
    let nextWord = currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];

    Array.from(currentWord.children).forEach((letter, i) => {
        setTimeout(() => {
            letter.className = "letter out";
        }, i * 80);
    });
    nextWord.style.opacity = "1";
    Array.from(nextWord.children).forEach((letter, i) => {
        letter.className = "letter behind";
        setTimeout(() => {
            letter.className = "letter in";
        }, 340 + i * 80);
    });
    currentWordIndex = currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
};

changeText();
setInterval(changeText, 3000)
const circles = document.querySelectorAll('.circle');
circles.forEach(elem => {
    var dots = parseInt(elem.getAttribute("data-dots"));
    var marked = parseInt(elem.getAttribute("data-percent"));
    var percent = Math.floor(dots * marked / 100);
    var points = "";
    var rotate = 360 / dots;

    for (let i = 0; i < dots; i++) {
        points += `<div class="points" style="--i: ${i}; --rot: ${rotate}deg;"></div>`;
    }
    elem.innerHTML = points;
    const pointsMarked = elem.querySelectorAll('.points');
    for (let i = 0; i < percent; i++) {
        pointsMarked[i].classList.add('marked');
    }
})

var mixer = mixitup('.portfolio-gallery');

// active menu
let menuLi = document.querySelectorAll('header ul li a');
let section = document.querySelectorAll('section');
function activeMenu() {
    let len = section.length;
    while (--len && window.scrollY + 97 < section[len].offsetTop) {}
    menuLi.forEach(sec => sec.classList.remove("active"));
    menuLi[len].classList.add("active");
}
activeMenu();
window.addEventListener("scroll", activeMenu);


// sticky navbar
const header = document.querySelector("header");
window.addEventListener("scroll", function() {
    header.classList.toggle("sticky", window.scrollY > 50)
})

let menuIcon = document.querySelector("#menu-icon");
let navlist = document.querySelector(".navlist");
menuIcon.onclick = () => {
    menuIcon.classList.toggle("bx-x");
    navlist.classList.toggle("open");
}

window.onscroll = () => {
    menuIcon.classList.remove("bx-x");
    navlist.classList.remove("open");
}
// paral lax
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show-items");
        } else {
            entry.target.classList.remove("show-items");
        }
    });
});

const scrollScale = document.querySelectorAll(".scroll-scale");
scrollScale.forEach((el) => observer.observe(el));

const scrollBottom = document.querySelectorAll(".scroll-bottom");
scrollBottom.forEach((el) => observer.observe(el));

const scrollTop = document.querySelectorAll(".scroll-top");
scrollTop.forEach((el) => observer.observe(el));


// 🌐 Shrii Assistant Chatbot Logic
document.addEventListener('DOMContentLoaded', () => {
  const chatToggle = document.getElementById('chatToggle');
  const closeChat = document.getElementById('closeChat');
  const chatbot = document.getElementById('chatbot');
  const sendMessage = document.getElementById('sendMessage');
  const userMessage = document.getElementById('userMessage');
  const chatMessages = document.getElementById('chatMessages');
  const voiceInput = document.getElementById('voiceInput');

  // Toggle chatbot visibility
  chatToggle.addEventListener('click', () => chatbot.classList.toggle('active'));
  closeChat.addEventListener('click', () => chatbot.classList.remove('active'));

  // Add message to chat
  function addMessage(sender, text) {
    const msg = document.createElement('div');
    msg.classList.add('message', sender);
    msg.innerHTML = `<div class="message-content"><p>${text}</p><span class="timestamp">Just now</span></div>`;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    if (sender === 'bot') speakMessage(text);
  }

  // Send user message
  sendMessage.addEventListener('click', () => handleMessage());
  userMessage.addEventListener('keypress', e => { if (e.key === 'Enter') handleMessage(); });

  function handleMessage() {
    const msg = userMessage.value.trim();
    if (!msg) return;
    addMessage('user', msg);
    userMessage.value = '';
    setTimeout(() => processMessage(msg.toLowerCase()), 600);
  }

  // Process bot logic
  function processMessage(msg) {
    if (msg.includes('hello') || msg.includes('hi')) addMessage('bot', 'Hello! I’m Shrii Assistant 😊');
    else if (msg.includes('resume')) addMessage('bot', 'Here’s my resume link: <a href="https://drive.google.com/file/d/1nOn2pn7YnNeUzzDeBj5sNmwBzy3VojBy/view?usp=drive_link" target="_blank">View Resume</a>');
    else if (msg.includes('call')) addMessage('bot', 'You can reach Shridhar at 📞 +91 9834504986.');
    else if (msg.includes('schedule')) addMessage('bot', 'Sure! I can schedule an interview for you. Please share your email.');
    else if (msg.includes('thank')) addMessage('bot', 'You’re welcome! 😄');
    else addMessage('bot', 'I can tell you about Shridhar’s skills, projects, or schedule an interview. What would you like to do?');
  }

  // Voice input
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;
  if (recognition) {
    voiceInput.addEventListener('click', () => {
      recognition.start();
      voiceInput.classList.add('listening');
    });
    recognition.onresult = e => {
      userMessage.value = e.results[0][0].transcript;
      voiceInput.classList.remove('listening');
    };
  }

  // Voice reply
  function speakMessage(text) {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(text.replace(/<[^>]*>/g, ''));
      speech.lang = 'en-US';
      speech.rate = 1;
      window.speechSynthesis.speak(speech);
    }
  }
});



    

