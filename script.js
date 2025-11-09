/*******************************
   TEXT ANIMATION — HOME PAGE
********************************/
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
if (words[0]) words[0].style.opacity = "1";

let changeText = () => {
    if (words.length === 0) return;

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
setInterval(changeText, 3000);


/*******************************
   SKILL CIRCLES
********************************/
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
});


/*******************************
   MIXITUP FILTER (PROJECTS)
********************************/
var mixer = mixitup('.portfolio-gallery');


/*******************************
   ACTIVE MENU HIGHLIGHT
********************************/
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


/*******************************
   STICKY HEADER
********************************/
const header = document.querySelector("header");
window.addEventListener("scroll", function () {
    header.classList.toggle("sticky", window.scrollY > 50)
});


/*******************************
   MOBILE MENU
********************************/
let menuIcon = document.querySelector("#menu-icon");
let navlist = document.querySelector(".navlist");

menuIcon.onclick = () => {
    menuIcon.classList.toggle("bx-x");
    navlist.classList.toggle("open");
};

window.onscroll = () => {
    menuIcon.classList.remove("bx-x");
    navlist.classList.remove("open");
};


/*******************************
   SCROLL ANIMATIONS
********************************/
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("show-items");
        else entry.target.classList.remove("show-items");
    });
});

document.querySelectorAll(".scroll-scale").forEach(el => observer.observe(el));
document.querySelectorAll(".scroll-bottom").forEach(el => observer.observe(el));
document.querySelectorAll(".scroll-top").forEach(el => observer.observe(el));


/*******************************************
   SHRI ASSISTANT — FULL INTELLIGENT JINN AI
*******************************************/
document.addEventListener("DOMContentLoaded", function () {

    const chatToggle = document.getElementById("chatToggle");
    const closeChat = document.getElementById("closeChat");
    const chatbot = document.getElementById("chatbotBox");
    const sendMessage = document.getElementById("sendMessage");
    const userMessage = document.getElementById("userMessage");
    const chatMessages = document.getElementById("chatMessages");
    const voiceButton = document.getElementById("voiceInput");

    /***************************************
       KNOWLEDGE BASE (Resume Data)
    ****************************************/
    const resumeData = {
        name: "Shridhar Varadkar",
        experience: "2 years of experience as a Java Developer",
        role: "Java Developer",
        company: "Velox Solutions",
        education: "BCA (8.69 CGPA) + MCA (Pursuing)",
        summary:
            "Shridhar is a dedicated Java Developer who works on backend development using Java, Spring MVC, MySQL, and frontend technologies like HTML, CSS, JavaScript.",
        skills: [
            "Java", "Spring MVC", "Hibernate", "MySQL", "JSP & Servlets",
            "HTML", "CSS", "JavaScript", "Bootstrap", "Elasticsearch",
            "Git", "Postman", "STS", "Tomcat"
        ],
        projects: [
            "SIEM (Security Information & Event Management)",
            "SOAR (Security Automation & Response)",
            "Booth Management App",
            "E-Learning Management System"
        ],
        certifications: [
            "IBM Java Certification",
            "AWS Certification",
            "MySQL Certification",
            "Full Stack Development - ITVedant"
        ],
        personality:
            "Shridhar is calm, friendly, hardworking, disciplined and focused on learning new things.",
        strengths:
            "Problem solving, strong backend logic, teamwork, fast learning, clean coding.",
        weakness:
            "Working on improving system design & advanced architecture.",
        goals:
            "Wants to become a senior backend engineer and later a full-stack architect.",
        contact: {
            email: "hemantvaradkar2000@gmail.com",
            phone: "Your Contact Number Here"
        }
    };

    /***************************************
       SMART AUTO-CORRECTION ENGINE
    ****************************************/
    function correctSpellings(msg) {
        const corrections = {
            "shidar": "shridhar",
            "shidarh": "shridhar",
            "expriance": "experience",
            "eduction": "education",
            "skils": "skills",
            "projets": "projects",
            "ceritification": "certification",
            "interviw": "interview",
            "schedul": "schedule",
        };

        let words = msg.split(" ");

        words = words.map(w =>
            corrections[w] ? corrections[w] : w
        );

        return words.join(" ");
    }

    /***************************************
       OPEN/CLOSE CHAT
    ****************************************/
    chatToggle?.addEventListener("click", () => {
        chatbot.classList.toggle("active");

        if (chatbot.classList.contains("active")) {
            speakBotMessage("Hi! I'm Jinn, Shrii’s friendly AI assistant. How can I help you today?");
        }
    });

    closeChat?.addEventListener("click", () => chatbot.classList.remove("active"));

    /***************************************
       SEND USER MESSAGE
    ****************************************/
    sendMessage?.addEventListener("click", sendUserMessage);

    userMessage?.addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendUserMessage();
    });

    function sendUserMessage() {
        let message = userMessage.value.trim();
        if (!message) return;

        // Correct spelling mistakes
        const corrected = correctSpellings(message.toLowerCase());
        message = corrected;

        addMessage("user", message);
        userMessage.value = "";

        if (schedulingStep > 0) {
            handleSchedulingResponse(message);
            return;
        }

        setTimeout(() => processMessage(message), 500);
    }

    /***************************************
       PRINT MESSAGE IN CHAT
    ****************************************/
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

    /***************************************
       MAIN AI LOGIC — JINN'S BRAIN
    ****************************************/
    let schedulingStep = 0;
    let schedulingData = {};

    function includesAny(msg, list) {
        return list.some(q => msg.includes(q));
    }

    function processMessage(rawMsg) {
        const msg = rawMsg.toLowerCase().trim();
        let reply = "";

        const about = ["tell me about", "who is", "about shridhar"];
        const exp = ["experience", "how many years"];
        const edu = ["education", "study", "qualification"];
        const skills = ["skills", "tech stack"];
        const projects = ["projects", "work done"];
        const certs = ["certification", "courses"];
        const personality = ["personality", "behavior"];
        const strength = ["strength", "strong point"];
        const weakness = ["weakness"];
        const goals = ["goal", "future", "aim"];
        const contact = ["email", "contact", "phone"];
        const greet = ["hi", "hello", "hey"];
        const jokes = ["joke", "fun", "laugh"];
        const motivate = ["motivate", "motivation", "inspire"];

        if (includesAny(msg, about)) {
            reply = `Here’s a quick intro about Shridhar:\n${resumeData.summary}`;
            return addMessage("bot", reply);
        }

        if (includesAny(msg, exp)) {
            return addMessage("bot", resumeData.experience);
        }

        if (includesAny(msg, edu)) {
            return addMessage("bot", resumeData.education);
        }

        if (includesAny(msg, skills)) {
            return addMessage("bot", "Shridhar's skills:\n• " + resumeData.skills.join("\n• "));
        }

        if (includesAny(msg, projects)) {
            return addMessage("bot", "He has worked on:\n• " + resumeData.projects.join("\n• "));
        }

        if (includesAny(msg, certs)) {
            return addMessage("bot", "Certifications:\n• " + resumeData.certifications.join("\n• "));
        }

        if (includesAny(msg, personality)) {
            return addMessage("bot", resumeData.personality);
        }

        if (includesAny(msg, strength)) {
            return addMessage("bot", resumeData.strengths);
        }

        if (includesAny(msg, weakness)) {
            return addMessage("bot", resumeData.weakness);
        }

        if (includesAny(msg, goals)) {
            return addMessage("bot", resumeData.goals);
        }

        if (includesAny(msg, jokes)) {
            return addMessage("bot", "Here’s a quick one 😄:\nWhy do programmers prefer dark mode?\nBecause light attracts bugs!");
        }

        if (includesAny(msg, motivate)) {
            return addMessage("bot", "Believe in yourself! Every expert was once a beginner 💪🔥");
        }

        if (includesAny(msg, contact)) {
            return addMessage("bot", "You can reach Shridhar at: " + resumeData.contact.email);
        }

        if (msg.includes("interview") || msg.includes("schedule")) {
            startSchedulingFlow();
            return;
        }

        if (includesAny(msg, greet)) {
            return addMessage("bot", "Hello! I’m Jinn 😊 How can I assist you today?");
        }

        // SMART SUGGESTIONS
        reply =
            "I didn't fully get that 😅 but I can help with:\n" +
            "• Shridhar's skills\n" +
            "• Education\n" +
            "• Experience\n" +
            "• Projects\n" +
            "• Certifications\n" +
            "• Interview scheduling\n" +
            "Try asking again in another way!";
        addMessage("bot", reply);
    }

    /***************************************
       INTERVIEW SCHEDULING FLOW
    ****************************************/
    function startSchedulingFlow() {
        schedulingStep = 1;
        schedulingData = {};
        addMessage("bot", "Sure! What is your full name?");
    }

    function handleSchedulingResponse(message) {
        switch (schedulingStep) {
            case 1:
                schedulingData.name = message;
                schedulingStep++;
                addMessage("bot", "Great! Please share your email.");
                break;

            case 2:
                schedulingData.email = message;
                schedulingStep++;
                addMessage("bot", "What date suits you for interview? (DD/MM/YYYY)");
                break;

            case 3:
                schedulingData.date = message;
                schedulingStep++;
                addMessage("bot", "What time should we schedule it?");
                break;

            case 4:
                schedulingData.time = message;
                schedulingStep = 0;
                sendScheduleMail();
                addMessage("bot", "Perfect! Interview request has been sent. Shridhar will contact you soon 👍");
                break;
        }
    }

    function sendScheduleMail() {
        fetch("/api/schedule-call", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(schedulingData)
        });
    }

    /***************************************
       VOICE INPUT
    ****************************************/
    const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition;

    if (speechRecognition) {
        recognition = new speechRecognition();
        recognition.lang = "en-US";

        recognition.onresult = (e) => {
            userMessage.value = e.results[0][0].transcript;
            sendUserMessage();
        };
    }

    voiceButton?.addEventListener("click", () => recognition?.start());

    /***************************************
       FEMALE VOICE OUTPUT
    ****************************************/
    function speakBotMessage(text) {
        if (!("speechSynthesis" in window)) return;

        const speech = new SpeechSynthesisUtterance(text);
        speech.rate = 1;
        speech.pitch = 1;

        const voices = speechSynthesis.getVoices();
        speech.voice =
            voices.find(v =>
                v.name.toLowerCase().includes("female") ||
                v.name.toLowerCase().includes("zira") ||
                v.name.toLowerCase().includes("susan")
            ) || voices[0];

        window.speechSynthesis.speak(speech);
    }
});
