
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

// === SHRIDHAR VARADKAR CHATBOT LOGIC — FINAL HUMAN VERSION === //
document.addEventListener("DOMContentLoaded", function () {
  const chatToggle = document.getElementById("chatToggle");
  const closeChat = document.getElementById("closeChat");
  const chatbot = document.getElementById("chatbotBox");
  const sendMessage = document.getElementById("sendMessage");
  const userMessage = document.getElementById("userMessage");
  const chatMessages = document.getElementById("chatMessages");
  const voiceButton = document.getElementById("voiceInput");

  // Resume info (knowledge base)
  const resumeData = {
    name: "Shridhar Varadkar",
    role: "Java Developer",
    company: "Velox Solutions",
    education: "BCA with CGPA 8.69 and currently pursuing MCA from Bharati Vidyapeeth.",
    summary:
      "Shridhar Varadkar is a dedicated Java Developer at Velox Solutions. He focuses on backend development using Java, Spring MVC, and MySQL, along with frontend technologies like HTML, CSS, and JavaScript. He’s worked on major projects like a Security Information and Event Management (SIEM) system and a Booth Management mobile app. He’s certified in Java, MySQL, AWS, and Full Stack Web Development.",
    skills: [
      "Java", "Spring MVC", "Hibernate", "MySQL", "JSP & Servlets",
      "HTML", "CSS", "JavaScript", "Bootstrap", "Elasticsearch",
      "Git", "Postman", "STS", "NetBeans", "Tomcat"
    ],
    projects: [
      "Security Information and Event Management (SIEM)",
      "Security Orchestration Automation and Response (SOAR)",
      "Booth Management System (Mobile App)",
      "E-Learning Management System"
    ],
    certifications: [
      "IBM Java Certification", "AWS Certification",
      "MySQL Certification", "Full Stack Java Development - ITVedant"
    ],
    contact: {
      email: "hemantvaradkar2000@gmail.com",
      phone: "Your Contact Number Here"
    }
  };

  // === CHAT WINDOW TOGGLE ===
  chatToggle?.addEventListener("click", () => {
    chatbot.classList.toggle("active");
    if (chatbot.classList.contains("active")) {
      speakBotMessage("Hey there! I’m Shrii Assistant, your virtual buddy. How can I help you today?");
    }
  });
  closeChat?.addEventListener("click", () => chatbot.classList.remove("active"));

  // === SEND MESSAGE ===
  sendMessage?.addEventListener("click", sendUserMessage);
  userMessage?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendUserMessage();
  });

  function sendUserMessage() {
    const message = userMessage.value.trim();
    if (!message) return;
    addMessage("user", message);
    userMessage.value = "";
    setTimeout(() => processMessage(message), 600);
  }

  // === ADD MESSAGE TO CHAT ===
  function addMessage(sender, text) {
    const msgDiv = document.createElement("div");
    msgDiv.className = `message ${sender}`;
    msgDiv.innerHTML = `
      <div class="message-content">
        <p>${text}</p>
        <span class="timestamp">Just now</span>
      </div>`;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    if (sender === "bot") speakBotMessage(text);
  }

  // === CORE INTELLIGENCE ===
  function processMessage(rawMsg) {
    const msg = rawMsg.toLowerCase();
    let reply = "";

    // Handle question words (who, what, why, when, where, how)
    if (msg.includes("who")) {
      reply = `Shridhar Varadkar is a passionate Java Developer working at Velox Solutions, known for his backend expertise and innovative project work.`;
    } else if (msg.includes("what")) {
      if (msg.includes("skill")) {
        reply = `Shridhar’s top skills include ${resumeData.skills.join(", ")} — he’s especially strong in Java and Spring MVC.`;
      } else if (msg.includes("project")) {
        reply = `He has worked on major projects like ${resumeData.projects.join(", ")}.`;
      } else {
        reply = `That’s a nice question! Shridhar mainly focuses on software development and backend logic using Java and Spring.`;
      }
    } else if (msg.includes("why")) {
      reply = `Shridhar chose Java because he enjoys solving real-world problems with clean, structured code. He loves backend engineering where logic meets creativity.`;
    } else if (msg.includes("when")) {
      reply = `Shridhar started his professional journey around two years ago and is currently gaining solid experience at Velox Solutions.`;
    } else if (msg.includes("where")) {
      reply = `Shridhar is based in Mumbai, India, and is pursuing his MCA from Bharati Vidyapeeth.`;
    } else if (msg.includes("how")) {
      reply = `He keeps improving his skills by working on real-time projects, contributing to systems like SIEM, and exploring AI tools and modern Java frameworks.`;
    }
    // Normal greetings
    else if (msg.includes("hi") || msg.includes("hello") || msg.includes("hey")) {
      reply = `Hey there! 😊 I’m Shrii Assistant — I can tell you about Shridhar’s experience, skills, and projects.`;
    }
    // Education
    else if (msg.includes("study") || msg.includes("education")) {
      reply = `${resumeData.name} completed ${resumeData.education}`;
    }
    // Certifications
    else if (msg.includes("certification") || msg.includes("course")) {
      reply = `${resumeData.name} holds certifications in ${resumeData.certifications.join(", ")}.`;
    }
    // Contact
    else if (msg.includes("contact") || msg.includes("email") || msg.includes("call")) {
      reply = `You can contact ${resumeData.name} at ${resumeData.contact.email}.`;
    }
    // Schedule
    else if (msg.includes("schedule") || msg.includes("interview")) {
      startSchedulingFlow();
      return;
    }
    // Thanks
    else if (msg.includes("thank")) {
      reply = `You’re most welcome! It’s always great chatting with you. 😊`;
    }
    // Fallback
    else {
      reply = `Hmm, that’s interesting! You can ask me about Shridhar’s projects, skills, certifications, or even schedule an interview with him.`;
    }

    addMessage("bot", reply);
  }

  // === VOICE INPUT ===
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

  // === FEMALE VOICE OUTPUT ===
  function speakBotMessage(text) {
    if (!("speechSynthesis" in window)) return;
    const speech = new SpeechSynthesisUtterance(text);
    speech.rate = 1.0;
    speech.pitch = 1.0;
    const voices = speechSynthesis.getVoices();
    speech.voice =
      voices.find(v =>
        v.name.toLowerCase().includes("female") ||
        v.name.toLowerCase().includes("zira") ||
        v.name.toLowerCase().includes("susan") ||
        v.name.toLowerCase().includes("english")) || voices[0];
    window.speechSynthesis.speak(speech);
  }

  // === SCHEDULING FLOW ===
  let schedulingStep = 0;
  let schedulingData = {};

  function startSchedulingFlow() {
    schedulingStep = 1;
    schedulingData = {};
    addMessage("bot", "Awesome! Let's set up your interview. Can you tell me your full name?");
  }

  function handleSchedulingResponse(message) {
    switch (schedulingStep) {
      case 1:
        schedulingData.name = message;
        schedulingStep++;
        addMessage("bot", "Great! Please share your email address so Shridhar can reach you.");
        break;
      case 2:
        schedulingData.email = message;
        schedulingStep++;
        addMessage("bot", "Perfect. What date suits you best? (DD/MM/YYYY)");
        break;
      case 3:
        schedulingData.date = message;
        schedulingStep++;
        addMessage("bot", "Got it! What time works best for you?");
        break;
      case 4:
        schedulingData.time = message;
        schedulingStep = 0;
        sendScheduleMail();
        addMessage("bot", "All set! Shridhar will confirm your interview soon via email. 😊");
        break;
    }
  }

  function sendScheduleMail() {
    fetch("/api/schedule-call", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(schedulingData)
    }).catch((err) => console.error("Mail send error:", err));
  }
});
