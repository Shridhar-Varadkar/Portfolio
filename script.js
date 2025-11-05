
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
// === SHRIDHAR VARADKAR CHATBOT LOGIC === //
document.addEventListener("DOMContentLoaded", function () {
  const chatToggle = document.getElementById("chatToggle");
  const closeChat = document.getElementById("closeChat");
  const chatbot = document.getElementById("chatbot");
  const sendMessage = document.getElementById("sendMessage");
  const userMessage = document.getElementById("userMessage");
  const chatMessages = document.getElementById("chatMessages");
  const voiceButton = document.getElementById("voiceInput");

  // Resume Knowledge Data (Shrii Assistant)
  const resumeData = {
    name: "Shridhar Varadkar",
    role: "Java Developer",
    company: "Velox Solutions",
    education: "BCA with CGPA 8.69 and pursuing MCA from Bharati Vidyapeeth.",
    summary:
      "Shridhar Varadkar is currently working as a Java Developer at Velox Solutions, focusing on backend development using Java, Spring MVC, MySQL, and front-end technologies like HTML, CSS, and JavaScript. He has worked on projects such as a Security Information and Event Management (SIEM) system and a Booth Management mobile app. He has completed Full Stack Development training and holds certifications in Java, MySQL, and AWS.",
    skills: [
      "Java",
      "Spring MVC",
      "Hibernate",
      "MySQL",
      "JSP & Servlets",
      "HTML, CSS, JavaScript",
      "Bootstrap",
      "Elasticsearch",
      "Git, Postman, STS, NetBeans, Tomcat"
    ],
    projects: [
      "Security Information and Event Management (SIEM)",
      "Security Orchestration Automation and Response (SOAR)",
      "Booth Management System (Mobile App)",
      "E-Learning Management System"
    ],
    certifications: [
      "IBM Java Certification",
      "AWS Certification",
      "MySQL Certification",
      "Full Stack Java Development - ITVedant"
    ],
    contact: {
      email: "hemantvaradkar2000@gmail.com",
      phone: "Your Contact Number Here"
    }
  };

  // Toggle Chatbot
  chatToggle?.addEventListener("click", () => chatbot.classList.toggle("active"));
  closeChat?.addEventListener("click", () => chatbot.classList.remove("active"));

  // Send user message
  sendMessage?.addEventListener("click", sendUserMessage);
  userMessage?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendUserMessage();
  });

  function sendUserMessage() {
    const message = userMessage.value.trim();
    if (!message) return;
    addMessage("user", message);
    userMessage.value = "";
    setTimeout(() => processMessage(message), 500);
  }

  // Add message to chat window
  function addMessage(sender, text) {
    const msgDiv = document.createElement("div");
    msgDiv.className = `message ${sender}`;
    msgDiv.innerHTML = `<div class="message-content"><p>${text}</p><span class="timestamp">Just now</span></div>`;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    if (sender === "bot") speakBotMessage(text);
  }

  // Process user input
  function processMessage(msg) {
    const message = msg.toLowerCase();
    let reply = "";

    // Greetings
    if (message.includes("hi") || message.includes("hello")) {
      reply = `Hello! I'm Shrii Assistant — I can tell you about ${resumeData.name}, his skills, experience, and projects.`;
    }
    // About
    else if (message.includes("who") || message.includes("yourself")) {
      reply = resumeData.summary;
    }
    // Experience
    else if (message.includes("experience")) {
      reply = `${resumeData.name} is working as a ${resumeData.role} at ${resumeData.company}, mainly focusing on Java backend development and system integration.`;
    }
    // Projects
    else if (message.includes("project")) {
      reply = `${resumeData.name} has contributed to projects like ${resumeData.projects.join(", ")}.`;
    }
    // Skills
    else if (message.includes("skill")) {
      reply = `${resumeData.name}'s technical skills include ${resumeData.skills.join(", ")}.`;
    }
    // Education
    else if (message.includes("education") || message.includes("study")) {
      reply = `${resumeData.name} completed ${resumeData.education}`;
    }
    // Certifications
    else if (message.includes("certification") || message.includes("course")) {
      reply = `${resumeData.name} holds certifications in ${resumeData.certifications.join(", ")}.`;
    }
    // Contact info
    else if (message.includes("contact") || message.includes("email") || message.includes("call")) {
      reply = `You can contact ${resumeData.name} at ${resumeData.contact.email}.`;
    }
    // Schedule interview
    else if (message.includes("schedule") || message.includes("interview")) {
      startSchedulingFlow();
      return;
    }
    // Thanks
    else if (message.includes("thank")) {
      reply = `You're most welcome! 😊`;
    }
    // Default
    else {
      reply = `I'm here to assist you with information about ${resumeData.name}. You can ask about his projects, skills, education, or work experience.`;
    }

    addMessage("bot", reply);
  }

  // Voice input
  const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition;
  if (speechRecognition) {
    recognition = new speechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.onresult = (e) => {
      userMessage.value = e.results[0][0].transcript;
      sendUserMessage();
    };
  }
  voiceButton?.addEventListener("click", () => recognition?.start());

  // Female voice output
  function speakBotMessage(text) {
    if (!("speechSynthesis" in window)) return;
    const speech = new SpeechSynthesisUtterance(text);
    speech.rate = 1;
    speech.pitch = 1;
    speech.volume = 1;
    const voices = speechSynthesis.getVoices();
    speech.voice = voices.find(v => v.name.toLowerCase().includes("female") || v.name.toLowerCase().includes("zira")) || voices[0];
    window.speechSynthesis.speak(speech);
  }

  // Scheduling Flow
  let schedulingStep = 0;
  let schedulingData = {};

  function startSchedulingFlow() {
    schedulingStep = 1;
    schedulingData = {};
    addMessage("bot", "Sure! Let's schedule your interview. May I know your full name?");
  }

  function handleSchedulingResponse(message) {
    switch (schedulingStep) {
      case 1:
        schedulingData.name = message;
        schedulingStep++;
        addMessage("bot", "Please share your email address.");
        break;
      case 2:
        schedulingData.email = message;
        schedulingStep++;
        addMessage("bot", "What date would you prefer for the interview? (DD/MM/YYYY)");
        break;
      case 3:
        schedulingData.date = message;
        schedulingStep++;
        addMessage("bot", "At what time would you like to schedule it?");
        break;
      case 4:
        schedulingData.time = message;
        schedulingStep++;
        sendScheduleMail();
        addMessage("bot", "Your interview request has been noted! You'll receive a confirmation via email shortly.");
        break;
    }
  }

  function sendScheduleMail() {
    fetch("/api/schedule-call", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(schedulingData)
    }).catch((err) => console.error("Error sending schedule:", err));
  }
});
