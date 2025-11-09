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
   ⭐ SHRI ASSISTANT — FULL CHATBOT LOGIC
*******************************************/
document.addEventListener("DOMContentLoaded", function () {

    const chatToggle = document.getElementById("chatToggle");
    const closeChat = document.getElementById("closeChat");
    const chatbot = document.getElementById("chatbot");
    const sendMessage = document.getElementById("sendMessage");
    const userMessage = document.getElementById("userMessage");
    const chatMessages = document.getElementById("chatMessages");
    const voiceButton = document.getElementById("voiceInput");

    /***************************************
       KNOWLEDGE BASE
    ****************************************/
    const resumeData = {
        name: "Shridhar Varadkar",
        role: "Java Developer",
        company: "Velox Solutions",
        education: "BCA with CGPA 8.69 and currently pursuing MCA from Bharati Vidyapeeth.",
        summary:
            "Shridhar Varadkar is a dedicated Java Developer at Velox Solutions. He focuses on backend development using Java, Spring MVC, and MySQL, along with frontend technologies like HTML, CSS, and JavaScript.",
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


    /***************************************
       CHAT BOX TOGGLE
    ****************************************/
    chatToggle?.addEventListener("click", () => {
        chatbot.classList.toggle("active");

        if (chatbot.classList.contains("active")) {
            speakBotMessage("Hey there! I’m Shrii Assistant, your virtual buddy. How can I help you today?");
        }
    });

    closeChat?.addEventListener("click", () => chatbot.classList.remove("active"));


    /***************************************
       SENDING USER MESSAGE
    ****************************************/
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


    /***************************************
       ADD MESSAGE TO UI
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
       INTELLIGENCE + QUESTION ANSWERING
    ****************************************/
    let schedulingStep = 0;
    let schedulingData = {};

    function processMessage(rawMsg) {
        const msg = rawMsg.toLowerCase();
        let reply = "";

        /************** ✔ SCHEDULING MODE  **************/
        if (schedulingStep > 0) {
            handleSchedulingResponse(rawMsg);
            return;
        }

        /************** ✔ WH QUESTIONS **************/
        if (msg.includes("who")) {
            reply = `Shridhar Varadkar is a passionate Java Developer working at Velox Solutions.`;
        }
        else if (msg.includes("what")) {
            if (msg.includes("skill")) {
                reply = `Shridhar’s skills are: ${resumeData.skills.join(", ")}.`;
            } else if (msg.includes("project")) {
                reply = `He has worked on: ${resumeData.projects.join(", ")}.`;
            } else {
                reply = `Shridhar mainly focuses on Java backend, Spring MVC, and building secure systems.`;
            }
        }
        else if (msg.includes("why")) {
            reply = `Shridhar chose Java because he enjoys structured, logical backend problem solving.`;
        }
        else if (msg.includes("when")) {
            reply = `He started his Java professional journey around 2 years ago.`;
        }
        else if (msg.includes("where")) {
            reply = `He is based in Mumbai, India.`;
        }
        else if (msg.includes("how")) {
            reply = `He improves by working on SIEM, SOAR, large systems and exploring modern Java frameworks.`;
        }

        /************** ✔ Greetings **************/
        else if (msg.includes("hi") || msg.includes("hello") || msg.includes("hey")) {
            reply = `Hey! 😊 I’m Shrii Assistant. Ask me anything about Shridhar!`;
        }

        /************** ✔ Education **************/
        else if (msg.includes("study") || msg.includes("education")) {
            reply = `${resumeData.name} completed ${resumeData.education}`;
        }

        /************** ✔ Certifications **************/
        else if (msg.includes("certification") || msg.includes("course")) {
            reply = `${resumeData.name} has completed certifications in ${resumeData.certifications.join(", ")}.`;
        }

        /************** ✔ Contact **************/
        else if (msg.includes("contact") || msg.includes("email") || msg.includes("call")) {
            reply = `You can contact him at ${resumeData.contact.email}`;
        }

        /************** ✔ Interview Schedule **************/
        else if (msg.includes("schedule") || msg.includes("interview")) {
            startSchedulingFlow();
            return;
        }

        /************** ✔ Thanks **************/
        else if (msg.includes("thank")) {
            reply = `You're welcome 😊 Always here to help!`;
        }

        /************** ✔ Default **************/
        else {
            reply = `Interesting! You can ask me about skills, projects, experience or schedule a meeting.`;
        }

        addMessage("bot", reply);
    }


    /***************************************
       SCHEDULING INTERVIEW FLOW
    ****************************************/
    function startSchedulingFlow() {
        schedulingStep = 1;
        schedulingData = {};
        addMessage("bot", "Great! What is your full name?");
    }

    function handleSchedulingResponse(message) {
        switch (schedulingStep) {
            case 1:
                schedulingData.name = message;
                schedulingStep++;
                addMessage("bot", "Nice! Please share your email address.");
                break;

            case 2:
                schedulingData.email = message;
                schedulingStep++;
                addMessage("bot", "Perfect! What date suits you? (DD/MM/YYYY)");
                break;

            case 3:
                schedulingData.date = message;
                schedulingStep++;
                addMessage("bot", "What time would you prefer?");
                break;

            case 4:
                schedulingData.time = message;
                schedulingStep = 0;
                sendScheduleMail();
                addMessage("bot", "All set! Shridhar will confirm soon 😊");
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


    /***************************************
       VOICE INPUT
    ****************************************/
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


    /***************************************
       FEMALE VOICE OUTPUT
    ****************************************/
    window.speechSynthesis.onvoiceschanged = () => {};

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
