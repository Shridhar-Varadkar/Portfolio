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
   SHRI ASSISTANT — FULL CHATBOT LOGIC
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
        company: "Velox Solutions, Mumbai",
        education: "BCA with 8.69 CGPA, currently pursuing MCA from Bharati Vidyapeeth",
        summary:
            "Shridhar Varadkar is a dedicated Java Developer who works on backend development using Java, Spring MVC, MySQL, and frontend technologies like HTML, CSS, JavaScript.",
        skills: [
            "Java", "Spring MVC", "Hibernate", "MySQL", "JSP & Servlets",
            "HTML", "CSS", "JavaScript", "Bootstrap", "Elasticsearch",
            "Git", "Postman", "STS", "NetBeans", "Tomcat"
        ],
        projects: [
            "SIEM - Security Information and Event Management",
            "SOAR - Security Automation Response",
            "Booth Management System (Mobile App)",
            "E-Learning Management System"
        ],
        certifications: [
            "IBM Java Certification",
            "AWS Certification",
            "MySQL Certification",
            "Full Stack Development - ITVedant"
        ],
        contact: {
            email: "hemantvaradkar2000@gmail.com",
            phone: "Your Contact Number Here"
        }
    };


    /***************************************
       OPEN/CLOSE CHAT
    ****************************************/
    chatToggle?.addEventListener("click", () => {
        chatbot.classList.toggle("active");

        if (chatbot.classList.contains("active")) {
            speakBotMessage("Hi, I'm Jinn, Shrii's virtual buddy! How can I help you today?");
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
        const message = userMessage.value.trim();
        if (!message) return;

        addMessage("user", message);
        userMessage.value = "";

        // If in scheduling mode
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
       CHATBOT INTELLIGENCE
    ****************************************/
    let schedulingStep = 0;
    let schedulingData = {};

    function includesAny(msg, list) {
        return list.some(q => msg.includes(q));
    }

    function processMessage(rawMsg) {
        const msg = rawMsg.toLowerCase().trim();
        let reply = "";

        const about = ["tell me about", "who is shridhar", "about shridhar", "about him", "explain about"];
        const summary = ["summary", "full info", "profile", "details"];
        const exp = ["experience", "how many years", "year", "work experience"];
        const education = ["education", "study", "qualification", "degree", "college"];
        const skills = ["skills", "tech stack", "what he knows", "what skills"];
        const projects = ["project", "projects", "work done"];
        const certs = ["certification", "course", "completed course"];
        const contact = ["contact", "email", "call", "phone"];
        const personality = ["personality", "behavior", "how is he"];
        const strength = ["strength", "strong point", "why hire"];
        const weakness = ["weakness", "improve"];
        const goals = ["future", "goal", "aim", "career goal"];
        const workflow = ["work style", "team", "communication"];
        const greet = ["hi", "hello", "hey"];

        if (includesAny(msg, about) || includesAny(msg, summary)) {
            reply =
                "Here is a quick summary of Shridhar Varadkar:\n" +
                "• Java Developer with 2 years experience.\n" +
                "• Works at Velox Solutions.\n" +
                "• Strong in backend development using Java, Spring MVC, MySQL.\n" +
                "• Worked on SIEM, SOAR, Booth App, E-Learning.\n" +
                "• Pursuing MCA from Bharati Vidyapeeth.";
            return addMessage("bot", reply);
        }

        if (includesAny(msg, exp)) {
            reply = "Shridhar has 2 years of professional experience as a Java Developer at Velox Solutions.";
            return addMessage("bot", reply);
        }

        if (includesAny(msg, education)) {
            reply = "Shridhar completed BCA with 8.69 CGPA and is currently pursuing MCA from Bharati Vidyapeeth.";
            return addMessage("bot", reply);
        }

        if (includesAny(msg, skills)) {
            reply = 
            "Shridhar's skills include Java, Spring MVC, Hibernate, MySQL, JSP, Servlets, HTML, CSS, JavaScript, Bootstrap, Elasticsearch.";
            return addMessage("bot", reply);
        }

        if (includesAny(msg, projects)) {
            reply = 
            "Shridhar has worked on:\n" +
            "• SIEM (Security Information Management)\n" +
            "• SOAR (Security Automation)\n" +
            "• Booth Management App\n" +
            "• E-Learning Management System";
            return addMessage("bot", reply);
        }

        if (includesAny(msg, certs)) {
            reply = "Shridhar holds certifications in Java, AWS, MySQL and Full Stack Development.";
            return addMessage("bot", reply);
        }

        if (includesAny(msg, personality)) {
            reply = "Shridhar is calm, friendly, hardworking and always eager to learn.";
            return addMessage("bot", reply);
        }

        if (includesAny(msg, strength)) {
            reply = "Shridhar's strengths include problem solving, backend logic, teamwork, and clean coding.";
            return addMessage("bot", reply);
        }

        if (includesAny(msg, weakness)) {
            reply = "Shridhar is working on improving system design and advanced architecture skills.";
            return addMessage("bot", reply);
        }

        if (includesAny(msg, goals)) {
            reply = "Shridhar aims to become a strong backend engineer and later a full-stack architect.";
            return addMessage("bot", reply);
        }

        if (includesAny(msg, workflow)) {
            reply = "Shridhar works in a structured way, communicates well, and enjoys teamwork.";
            return addMessage("bot", reply);
        }

        if (includesAny(msg, contact)) {
            reply = "You can contact Shridhar at: " + resumeData.contact.email;
            return addMessage("bot", reply);
        }

        if (msg.includes("schedule") || msg.includes("interview")) {
            startSchedulingFlow();
            return;
        }

        if (includesAny(msg, greet)) {
            reply = "Hello! I'm Jinn, Shrii's virtual buddy 😊 How can I help you?";
            return addMessage("bot", reply);
        }

        if (msg.includes("thank")) {
            reply = "You’re welcome! Always happy to help.";
            return addMessage("bot", reply);
        }

        reply = "I can tell you about Shridhar's skills, projects, experience, education or schedule an interview. Ask me anything!";
        addMessage("bot", reply);
    }


    /***************************************
       INTERVIEW SCHEDULING FLOW
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
                addMessage("bot", "Please share your email address.");
                break;

            case 2:
                schedulingData.email = message;
                schedulingStep++;
                addMessage("bot", "What date suits you best? (DD/MM/YYYY)");
                break;

            case 3:
                schedulingData.date = message;
                schedulingStep++;
                addMessage("bot", "What time is comfortable for you?");
                break;

            case 4:
                schedulingData.time = message;
                schedulingStep = 0;
                sendScheduleMail();
                addMessage("bot", "All done! Shridhar will confirm your interview soon.");
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
