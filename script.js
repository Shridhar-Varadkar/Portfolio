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
   SHRI ASSISTANT — FULL CHATBOT LOGIC (UPGRADED)
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
            "Shridhar Varadkar is a dedicated Java Developer skilled in Java, Spring MVC, MySQL, and frontend technologies like HTML, CSS, JavaScript.",
        skills: [
            "Java", "Spring MVC", "Hibernate", "MySQL", "JSP", "Servlets",
            "HTML", "CSS", "JavaScript", "Bootstrap", "Elasticsearch",
            "Git", "Postman", "STS", "NetBeans", "Tomcat"
        ],
        projects: [
            "SIEM (Security Information and Event Management)",
            "SOAR (Security Automation Response)",
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
        }
    };

    /***************************************
       OPEN/CLOSE CHAT
    ****************************************/
    chatToggle?.addEventListener("click", () => {
        chatbot.classList.toggle("active");

        if (chatbot.classList.contains("active")) {
            speakBotMessage("Hi! I'm Shrii’s virtual assistant. How can I help you today?");
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

        // If in scheduling mode
        if (schedulingStep > 0) {
            handleSchedulingResponse(message);
            return;
        }

        setTimeout(() => processMessage(message), 500);
    }


    /***************************************
       PRINT MESSAGE IN CHAT BOX
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


    /*******************************************
     SPELL CORRECTION + SMART MATCH ENGINE
    *******************************************/
    const dictionary = [
        "skill", "skills", "experience", "education", "project", "projects",
        "shridhar", "developer", "java", "spring", "mvc", "work", "college",
        "degree", "summary", "certifications", "interview", "schedule"
    ];

    function autoCorrect(word) {
        let bestMatch = word;
        let bestScore = Infinity;

        dictionary.forEach(dictWord => {
            const dist = levenshtein(word.toLowerCase(), dictWord.toLowerCase());
            if (dist < bestScore && dist <= 2) {  
                bestScore = dist;
                bestMatch = dictWord;
            }
        });

        return bestMatch;
    }

    function correctMessage(message) {
        return message
            .split(" ")
            .map(w => autoCorrect(w))
            .join(" ");
    }

    // Levenshtein Distance Function
    function levenshtein(a, b) {
        const matrix = Array(b.length + 1).fill(null).map(() =>
            Array(a.length + 1).fill(null)
        );

        for (let i = 0; i <= a.length; i++) matrix[0][i] = i;
        for (let j = 0; j <= b.length; j++) matrix[j][0] = j;

        for (let j = 1; j <= b.length; j++) {
            for (let i = 1; i <= a.length; i++) {
                const cost = a[i - 1] === b[j - 1] ? 0 : 1;
                matrix[j][i] = Math.min(
                    matrix[j][i - 1] + 1,
                    matrix[j - 1][i] + 1,
                    matrix[j - 1][i - 1] + cost
                );
            }
        }
        return matrix[b.length][a.length];
    }


    /*******************************************
       CHATBOT — BRAIN / INTELLIGENCE
    *******************************************/
    let schedulingStep = 0;
    let schedulingData = {};

    function includesAny(msg, list) {
        return list.some(q => msg.includes(q));
    }

    function processMessage(rawMsg) {
        const corrected = correctMessage(rawMsg);
        const msg = corrected.toLowerCase().trim();
        let reply = "";

        const about = ["tell me about", "who is shridhar", "about shridhar", "explain"];
        const exp = ["experience", "year", "work experience"];
        const education = ["education", "qualification", "degree"];
        const skills = ["skills", "tech stack"];
        const projects = ["project", "projects"];
        const certs = ["certification", "course"];
        const personality = ["personality", "behavior"];
        const strength = ["strength", "strong point"];
        const weakness = ["weakness", "improve"];
        const goals = ["goal", "future"];
        const greet = ["hi", "hello", "hey"];
        const contact = ["contact", "email", "phone"];
        
        /********** Resume Q/A **********/
        if (includesAny(msg, about)) {
            reply =
                "Shridhar is a dedicated Java Developer with 2 years of experience, working at Velox Solutions. He has expertise in Java, Spring MVC, MySQL, and has built SIEM, SOAR, Booth App, and E-Learning systems.";
            return addMessage("bot", reply);
        }

        if (includesAny(msg, exp)) {
            return addMessage("bot",
                "Shridhar has 2 years of professional Java development experience.");
        }

        if (includesAny(msg, education)) {
            return addMessage("bot",
                "He completed his BCA with 8.69 CGPA and is pursuing MCA from Bharati Vidyapeeth.");
        }

        if (includesAny(msg, skills)) {
            return addMessage("bot",
                "Shridhar's skills include Java, Spring MVC, Hibernate, MySQL, JSP, Servlets, HTML, CSS, JS, Bootstrap, Elasticsearch.");
        }

        if (includesAny(msg, projects)) {
            return addMessage("bot",
                "His major projects are:\n• SIEM\n• SOAR\n• Booth Management App\n• E-Learning Platform");
        }

        if (includesAny(msg, certs)) {
            return addMessage("bot",
                "He holds certifications in Java, AWS, MySQL, and Full Stack Development.");
        }

        if (includesAny(msg, personality)) {
            return addMessage("bot",
                "Shridhar is calm, focused, friendly and always eager to learn.");
        }

        if (includesAny(msg, strength)) {
            return addMessage("bot",
                "His strengths are problem-solving, backend logic, teamwork, and clean code.");
        }

        if (includesAny(msg, weakness)) {
            return addMessage("bot",
                "He is improving advanced architecture and system design skills.");
        }

        if (includesAny(msg, goals)) {
            return addMessage("bot",
                "His goal is to become a strong backend engineer and later a full-stack architect.");
        }

        if (includesAny(msg, contact)) {
            return addMessage("bot",
                "You can contact Shridhar at: " + resumeData.contact.email);
        }

        if (includesAny(msg, greet)) {
            return addMessage("bot",
                "Hello! I'm Jinn 😊 How can I help you?");
        }

        if (msg.includes("schedule") || msg.includes("interview")) {
            startSchedulingFlow();
            return;
        }

        if (msg.includes("thank")) {
            return addMessage("bot",
                "You're welcome! Happy to help anytime 😊");
        }

        /********** SMART SUGGESTION WHEN UNKNOWN **********/
        const suggestion = guessIntent(msg);

        reply =
            `I’m not fully sure what you meant, but here’s something related:\n\n👉 ${suggestion}\n\nYou can also ask: “skills”, “projects”, “experience”, “education”, “contact” or “schedule interview”.`;

        addMessage("bot", reply);
    }

    /*******************************************
       INTENT GUESSER — Smart fallback
    *******************************************/
    function guessIntent(msg) {
        if (msg.includes("skill") || msg.includes("technology"))
            return "Do you want to know Shridhar’s skills?";
        if (msg.includes("year") || msg.includes("experience"))
            return "Are you asking about work experience?";
        if (msg.includes("study") || msg.includes("college"))
            return "Are you asking about education?";
        if (msg.includes("project"))
            return "Want to know about his project list?";
        if (msg.includes("job") || msg.includes("hire"))
            return "Are you asking why you should hire him?";
        return "Maybe you want info about skills, projects, education or interview scheduling?";
    }


    /*******************************************
       INTERVIEW SCHEDULING FLOW
    *******************************************/
    function startSchedulingFlow() {
        schedulingStep = 1;
        schedulingData = {};
        addMessage("bot", "Sure! What's your full name?");
    }

    function handleSchedulingResponse(message) {
        switch (schedulingStep) {
            case 1:
                schedulingData.name = message;
                schedulingStep++;
                addMessage("bot", "Great! What is your email?");
                break;

            case 2:
                schedulingData.email = message;
                schedulingStep++;
                addMessage("bot", "Which date suits you? (DD/MM/YYYY)");
                break;

            case 3:
                schedulingData.date = message;
                schedulingStep++;
                addMessage("bot", "What time do you prefer?");
                break;

            case 4:
                schedulingData.time = message;
                schedulingStep = 0;
                sendScheduleMail();
                addMessage("bot", "Done! Shridhar will confirm your interview soon.");
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

    /*******************************************
       VOICE INPUT
    *******************************************/
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

    /*******************************************
       FEMALE VOICE OUTPUT (UNCHANGED)
    *******************************************/
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
