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
    const msg = rawMsg.toLowerCase().trim();
    let reply = "";

    function includesAny(list) {
        return list.some(q => msg.includes(q));
    }

    const askAbout = ["tell me about", "who is shridhar", "about shridhar", "about him", "explain about", "who is he"];
    const askSummary = ["summary", "overall", "brief", "full details", "full info", "full profile"];
    const askExperience = ["experience", "work experience", "years", "how many years", "working since", "career"];
    const askEducation = ["education", "study", "qualification", "degree", "college"];
    const askSkills = ["skills", "tech stack", "what he knows", "technical", "programming"];
    const askProjects = ["project", "projects he did", "work done", "portfolio projects"];
    const askCertifications = ["certification", "courses", "completed course", "extra qualification"];
    const askContact = ["contact", "email", "call", "phone"];
    const askStrengths = ["strength", "strong point", "why hire", "best thing"];
    const askWeakness = ["weakness", "weak point", "improve"];
    const askPersonality = ["personality", "behavior", "how is he", "how is shridhar"];
    const askFuture = ["future", "goal", "aim", "dream", "career goal"];
    const askWorkStyle = ["work style", "work approach", "team", "communication"];
    const askTechExplain = ["explain spring", "explain java", "spring mvc explain", "backend explain"];

    // 1. Full profile summary
    if (includesAny(askAbout) || includesAny(askSummary)) {
        reply =
        "Here is a complete summary about Shridhar Varadkar:\n\n" +
        "• A passionate Java Developer with 2 years of professional experience.\n" +
        "• Currently working at Velox Solutions.\n" +
        "• Skilled in Java, Spring MVC, MySQL, JSP, Servlets, HTML, CSS, JavaScript and Elasticsearch.\n" +
        "• Worked on SIEM, SOAR, Booth Management App and E-Learning System.\n" +
        "• Completed BCA with 8.69 CGPA and pursuing MCA.\n" +
        "• Certified in Java, MySQL, AWS and Full Stack Development.\n\n" +
        "Ask me if you want more information on skills, projects, or experience.";
        return addMessage("bot", reply);
    }

    // 2. Experience
    if (includesAny(askExperience)) {
        reply =
        "Shridhar has 2 years of solid professional experience as a Java Developer.\n" +
        "He works at Velox Solutions focusing on backend development, API building, and security systems.";
        return addMessage("bot", reply);
    }

    // 3. Education
    if (includesAny(askEducation)) {
        reply =
        "Shridhar completed BCA with 8.69 CGPA and he is currently pursuing MCA from Bharati Vidyapeeth.";
        return addMessage("bot", reply);
    }

    // 4. Skills
    if (includesAny(askSkills))) {
        reply =
        "Shridhar's main skills are:\n" +
        "Java, Spring MVC, Hibernate, MySQL, JSP, Servlets, HTML, CSS, JavaScript, Bootstrap and Elasticsearch.\n" +
        "He is strong in backend and full-stack development.";
        return addMessage("bot", reply);
    }

    // 5. Projects
    if (includesAny(askProjects)) {
        reply =
        "Shridhar has worked on these major projects:\n" +
        "1. SIEM - Security Information and Event Management\n" +
        "2. SOAR - Security Automation Response\n" +
        "3. Booth Management App\n" +
        "4. E-Learning Management System\n\n" +
        "Ask me if you want details about any specific project.";
        return addMessage("bot", reply);
    }

    // 6. Certifications
    if (includesAny(askCertifications)) {
        reply =
        "Shridhar is certified in Java, AWS, MySQL and Full Stack Development.";
        return addMessage("bot", reply);
    }

    // 7. Strengths
    if (includesAny(askStrengths)) {
        reply =
        "Shridhar's strengths are problem solving, backend development, quick learning, clean coding and teamwork.";
        return addMessage("bot", reply);
    }

    // 8. Weakness
    if (includesAny(askWeakness)) {
        reply =
        "Shridhar is improving his knowledge in advanced system design and large-scale architecture.";
        return addMessage("bot", reply);
    }

    // 9. Personality
    if (includesAny(askPersonality)) {
        reply =
        "Shridhar is friendly, calm, focused and hardworking. He communicates well and enjoys helping others.";
        return addMessage("bot", reply);
    }

    // 10. Future goals
    if (includesAny(askFuture)) {
        reply =
        "Shridhar aims to become a strong backend engineer and later a full stack architect. He wants to master Spring Boot, Microservices and Cloud.";
        return addMessage("bot", reply);
    }

    // 11. Work style
    if (includesAny(askWorkStyle)) {
        reply =
        "Shridhar follows a structured and clean coding approach. He likes planning tasks, working in teams and communicating clearly.";
        return addMessage("bot", reply);
    }

    // 12. Technical explanations
    if (includesAny(askTechExplain)) {
        reply =
        "Sure. Here is a simple explanation:\n\n" +
        "Spring MVC is a framework used to build web applications using the Model View Controller pattern.\n" +
        "Java is an object-oriented programming language widely used for backend systems.\n\n" +
        "If you want, I can explain any technology in detail.";
        return addMessage("bot", reply);
    }

    // 13. Contact
    if (includesAny(askContact)) {
        reply = 
        "You can contact Shridhar at: " + resumeData.contact.email;
        return addMessage("bot", reply);
    }

    // 14. Scheduling
    if (msg.includes("schedule") || msg.includes("interview")) {
        startSchedulingFlow();
        return;
    }

    // 15. Greeting
    if (msg.includes("hi") || msg.includes("hello") || msg.includes("hey")) {
        reply = "Hello! I am Shrii Assistant. How can I help you today?";
        return addMessage("bot", reply);
    }

    // 16. Thanks
    if (msg.includes("thank")) {
        reply = "You're welcome! Happy to help.";
        return addMessage("bot", reply);
    }

    // 17. Fallback
    reply =
    "I can help you with Shridhar's skills, projects, experience, education or interview scheduling. Ask me anything!";
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
