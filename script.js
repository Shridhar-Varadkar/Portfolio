
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
// ===== Shrii Assistant - Resume-aware chatbot with voice + scheduling =====

document.addEventListener("DOMContentLoaded", function () {
  // Resume-based profile data
  const resumeData = {
    name: "Shridhar Varadkar",
    email: "hemantvaradkar2000@gmail.com",
    phone: "+91 9834504986",
    location: "Mumbai, India",
    role: "Java Developer",
    experience: "2 years of experience at Velox Solutions",
    skills: [
      "Java",
      "Spring MVC",
      "MySQL",
      "HTML",
      "CSS",
      "JavaScript",
      "Elasticsearch",
      "Bootstrap",
      "JSP"
    ],
    projects: [
      {
        name: "Security Information and Event Management (SIEM)",
        desc: "Developed backend modules and dashboards using Java, Spring MVC, and Elasticsearch."
      },
      {
        name: "Booth Management System",
        desc: "Built mobile app backend APIs for election booth management using MySQL and REST services."
      }
    ],
    education:
      "Completed BCA with CGPA 8.69 and pursuing MCA from Bharati Vidyapeeth.",
    certifications: [
      "IBM Java Fundamentals",
      "AWS Cloud",
      "MySQL Database Concepts",
      "Full Stack Development — ITVedant"
    ],
  };

  // Get chatbot elements
  const chatToggle = document.getElementById("chatToggle");
  const closeChat = document.getElementById("closeChat");
  const chatbot = document.getElementById("chatbot");
  const sendBtn = document.getElementById("sendMessage");
  const userInput = document.getElementById("userMessage");
  const chatMessages = document.getElementById("chatMessages");
  const voiceBtn = document.getElementById("voiceInput");

  // ---- Voice setup ----
  let preferredVoice = null;
  function loadVoices() {
    const voices = window.speechSynthesis.getVoices();
    const female = voices.filter(v =>
      /female|susan|zira|samantha|victoria|google uk|google us/i.test(v.name)
    );
    preferredVoice = female[0] || voices.find(v => v.lang.startsWith("en")) || voices[0];
  }
  window.speechSynthesis.onvoiceschanged = loadVoices;
  loadVoices();

  function speak(text) {
    const msg = new SpeechSynthesisUtterance(text.replace(/<[^>]*>/g, ""));
    msg.voice = preferredVoice;
    msg.lang = "en-US";
    msg.rate = 1;
    msg.pitch = 1;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(msg);
  }

  // ---- Chatbot core ----
  let schedulingMode = false;
  let schedulingStep = 0;
  let schedulingData = { name: "", email: "", phone: "", date: "", time: "", purpose: "" };

  function addMessage(sender, text) {
    const div = document.createElement("div");
    div.className = `message ${sender}`;
    div.innerHTML = `<div class="message-content">${text}</div>`;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    if (sender === "bot") speak(text);
  }

  if (chatToggle) chatToggle.onclick = () => chatbot.classList.toggle("active");
  if (closeChat) closeChat.onclick = () => chatbot.classList.remove("active");

  if (sendBtn) sendBtn.onclick = sendUserMessage;
  if (userInput) userInput.onkeypress = e => {
    if (e.key === "Enter") sendUserMessage();
  };

  function sendUserMessage() {
    const message = userInput.value.trim();
    if (!message) return;
    addMessage("user", message);
    userInput.value = "";
    setTimeout(() => processMessage(message.toLowerCase()), 400);
  }

  // ---- Voice input ----
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SR) {
    const rec = new SR();
    rec.lang = "en-US";
    rec.continuous = false;
    rec.onresult = e => {
      userInput.value = e.results[0][0].transcript;
      sendUserMessage();
    };
    voiceBtn.onclick = () => rec.start();
  }

  // ---- Message Processing ----
  function processMessage(msg) {
    if (schedulingMode) return handleScheduling(msg);

    if (msg.includes("hi") || msg.includes("hello")) {
      addMessage("bot", `Hello! I’m Shrii Assistant — here to help you learn more about ${resumeData.name}.`);
    } else if (msg.includes("who") && msg.includes("shridhar")) {
      addMessage("bot", `${resumeData.name} is a passionate Java Developer from ${resumeData.location}, currently working at Velox Solutions with ${resumeData.experience}.`);
    } else if (msg.includes("skill")) {
      addMessage("bot", `${resumeData.name} is skilled in ${resumeData.skills.join(", ")}.`);
    } else if (msg.includes("project")) {
      addMessage("bot", `He has worked on projects like:<br>• <b>${resumeData.projects[0].name}</b> — ${resumeData.projects[0].desc}<br>• <b>${resumeData.projects[1].name}</b> — ${resumeData.projects[1].desc}`);
    } else if (msg.includes("education")) {
      addMessage("bot", `${resumeData.education}`);
    } else if (msg.includes("certification")) {
      addMessage("bot", `${resumeData.name} holds certifications in ${resumeData.certifications.join(", ")}.`);
    } else if (msg.includes("contact") || msg.includes("email")) {
      addMessage("bot", `You can reach ${resumeData.name} at <b>${resumeData.email}</b> or call at <b>${resumeData.phone}</b>.`);
    } else if (msg.includes("schedule") || msg.includes("interview")) {
      schedulingMode = true;
      schedulingStep = 1;
      addMessage("bot", "Sure! Let's schedule an interview. What’s your full name?");
    } else {
      addMessage("bot", `I can tell you about ${resumeData.name}'s skills, experience, projects, or help schedule an interview.`);
    }
  }

  // ---- Scheduling Flow ----
  function handleScheduling(msg) {
    switch (schedulingStep) {
      case 1:
        schedulingData.name = msg;
        schedulingStep = 2;
        addMessage("bot", `Thanks, ${msg}. Please provide your email address.`);
        break;
      case 2:
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(msg)) {
          addMessage("bot", "That doesn't look like a valid email. Try again.");
          return;
        }
        schedulingData.email = msg;
        schedulingStep = 3;
        addMessage("bot", "Got it. Please share your phone number.");
        break;
      case 3:
        schedulingData.phone = msg;
        schedulingStep = 4;
        addMessage("bot", "Preferred interview date? (DD/MM/YYYY)");
        break;
      case 4:
        schedulingData.date = msg;
        schedulingStep = 5;
        addMessage("bot", "What time works best for you? (e.g. 11:00 AM)");
        break;
      case 5:
        schedulingData.time = msg;
        schedulingStep = 6;
        addMessage("bot", "Lastly, what’s the purpose of this interview?");
        break;
      case 6:
        schedulingData.purpose = msg;
        schedulingStep = 0;
        schedulingMode = false;
        sendSchedule();
        break;
    }
  }

  async function sendSchedule() {
    addMessage("bot", "Sending your interview request...");
    try {
      const res = await fetch("/api/schedule-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(schedulingData),
      });
      const data = await res.json();
      if (res.ok) {
        addMessage("bot", `✅ Your interview request has been sent successfully! A confirmation email will be sent to ${schedulingData.email}.`);
      } else {
        addMessage("bot", "⚠️ Failed to send email. Please check the server.");
      }
    } catch (err) {
      addMessage("bot", "⚠️ Could not connect to the email server.");
    }
  }

  // ---- Intro message ----
  addMessage(
    "bot",
    `👋 Hi! I’m <b>Shrii Assistant</b> — your personal guide to <b>${resumeData.name}</b>.<br><br>
${resumeData.name} is a Java Developer at Velox Solutions, experienced in Spring MVC, MySQL, and front-end web technologies.<br>
He’s passionate about learning and improving through real-world projects.<br><br>
You can ask about his <b>skills</b>, <b>projects</b>, or <b>schedule an interview</b>.`
  );
});
