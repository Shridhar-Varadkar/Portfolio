
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
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("chatbotToggle");
  const chatbotBox = document.querySelector(".chatbot-box");
  const closeBtn = document.getElementById("closeChatbot");
  const sendBtn = document.getElementById("chatbotSend");
  const input = document.getElementById("chatbotInput");
  const messages = document.getElementById("chatbotMessages");
  const voiceBtn = document.getElementById("chatbotVoice");

  toggleBtn.addEventListener("click", () => chatbotBox.style.display = "flex");
  closeBtn.addEventListener("click", () => chatbotBox.style.display = "none");

  sendBtn.addEventListener("click", sendMessage);
  input.addEventListener("keypress", e => e.key === "Enter" && sendMessage());

  function sendMessage() {
    const msg = input.value.trim();
    if (!msg) return;
    addMessage("user", msg);
    input.value = "";
    setTimeout(() => botReply(msg), 500);
  }

  function addMessage(sender, text) {
    const div = document.createElement("div");
    div.className = `message ${sender}`;
    div.innerHTML = `<div class="message-content">${text}</div>`;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function botReply(userText) {
    const text = userText.toLowerCase();
    let reply = "";

    if (text.includes("hello") || text.includes("hi")) reply = "Hello 👋, I'm Shrii Assistant. How can I help you today?";
    else if (text.includes("resume")) reply = "You can view Shridhar’s resume <a href='Resume (2) (1).pdf' target='_blank'>here</a> 📄.";
    else if (text.includes("call")) reply = "You can call Shridhar directly at <a href='tel:+919834504986'>+91 9834504986</a> 📞.";
    else if (text.includes("schedule") || text.includes("interview")) {
      reply = "Sure! Please provide your name, email, and preferred date/time — I’ll send a mail to schedule your interview.";
      sendInterviewMailPrompt();
    }
    else if (text.includes("skill")) reply = "Shridhar is skilled in Java, Spring MVC, MySQL, JSP, HTML, CSS, JS, and Elasticsearch 💻.";
    else reply = "I can help you with Shridhar’s profile, skills, projects, or schedule an interview 📅.";

    addMessage("bot", reply);
    speak(reply);
  }

  // 🔊 Voice output (text-to-speech)
  function speak(text) {
    if ('speechSynthesis' in window) {
      const msg = new SpeechSynthesisUtterance(text.replace(/<[^>]*>/g, ""));
      msg.pitch = 1;
      msg.rate = 1;
      speechSynthesis.speak(msg);
    }
  }

  // 🎙️ Voice input
  if ('webkitSpeechRecognition' in window) {
    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;

    voiceBtn.addEventListener("click", () => {
      recognition.start();
    });

    recognition.onresult = (e) => {
      input.value = e.results[0][0].transcript;
      sendMessage();
    };
  }

  // 📧 Send interview schedule email via backend
  async function sendInterviewMailPrompt() {
    // Example: this can be triggered after collecting user info
    await fetch("/api/sendMail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Candidate",
        email: "candidate@example.com",
        subject: "Interview Request with Shridhar",
        message: "A user has requested an interview via Shrii Assistant chatbot."
      })
    });
  }
});

    

