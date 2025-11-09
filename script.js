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

    // === AI Understanding Keywords === //
    const askAbout = ["tell me about", "who is", "about shridhar", "about him", "explain about", "who are you talking about"];
    const askExperience = ["experience", "work experience", "years", "how many years", "working since", "career", "professional background"];
    const askEducation = ["education", "study", "qualification", "degree", "what did he study", "college"];
    const askSkills = ["skills", "tech stack", "what he knows", "technical", "programming", "languages"];
    const askProjects = ["project", "projects he did", "work done", "portfolio projects", "explain project"];
    const askCertifications = ["certification", "courses", "completed course", "extra qualification"];
    const askContact = ["contact", "email", "call", "phone"];
    const askStrengths = ["strength", "strong point", "why hire", "best thing"];
    const askWeakness = ["weakness", "improve", "weak point"];
    const askPersonality = ["personality", "behavior", "how is he", "how is shridhar"];
    const askFuture = ["future", "goal", "aim", "dream", "career goal"];
    const askWorkStyle = ["work style", "work approach", "working style", "team", "communication"];
    const askSummary = ["summary", "overall", "brief", "full details", "full info"];
    const askTechExplain = ["explain spring", "explain java", "what is spring", "spring mvc explain", "backend explain"];

    // Helper
    function includesAny(list) {
        return list.some(q => msg.includes(q));
    }

    // === 1. Full Profile Summary ===
    if (includesAny(askAbout) || includesAny(askSummary)) {
        reply =
        `Sure! Here's a complete summary of **Shridhar Varadkar**:\n\n` +
        `✨ A passionate **Java Developer** with **2 years of hands-on professional experience**.\n` +
        `✨ Currently working at **Velox Solutions**, delivering backend logic and secure APIs.\n` +
        `✨ Strong in **Java, Spring MVC, MySQL, JSP, Servlets, HTML, CSS, JavaScript, Elasticsearch**.\n` +
        `✨ Built major projects: **SIEM**, **SOAR**, **Booth Management App**, **E-Learning System**.\n` +
        `✨ Completed **BCA (CGPA 8.69)** and pursuing **MCA**.\n` +
        `✨ Certified in Java, MySQL, AWS, and Full Stack Development.\n\n` +
        `Let me know if you'd like experience, skills, education, or a specific project. 😊`;
        return addMessage("bot", reply);
    }

    // === 2. Experience ===
    if (includesAny(askExperience)) {
        reply =
        `Shridhar has **2 years of strong professional experience** as a Java Developer.\n` +
        `At **Velox Solutions**, he works on backend development, SIEM systems, automation flows, and secure API design.\n` +
        `He also collaborates with teams, handles debugging, performance tuning, and writes clean backend logic.`;
        return addMessage("bot", reply);
    }

    // === 3. Education ===
    if (includesAny(askEducation)) {
        reply =
        `Shridhar completed his **Bachelor of Computer Applications (BCA)** with **8.69 CGPA**.\n` +
        `He is currently pursuing **MCA from Bharati Vidyapeeth**, focusing on backend engineering and full-stack development.`;
        return addMessage("bot", reply);
    }

    // === 4. Skills ===
    if (includesAny(askSkills)) {
        reply =
        `Shridhar’s main skillset:\n\n` +
        `💻 **Backend:** Java, Spring MVC, Hibernate, Servlets, JSP\n` +
        `🗄️ **Database:** MySQL, SQL, Elasticsearch\n` +
        `🌐 **Frontend:** HTML5, CSS3, JS, Bootstrap, jQuery\n` +
        `🛠️ **Tools:** Git, Postman, STS, Eclipse, Kibana\n\n` +
        `He is strong in both backend logic and full-stack development.`;
        return addMessage("bot", reply);
    }

    // === 5. Projects ===
    if (includesAny(askProjects)) {
        reply =
        `Shridhar has worked on major projects:\n\n` +
        `1️⃣ **SIEM (Security Information & Event Management)** – Log analytics, threat detection.\n` +
        `2️⃣ **SOAR (Security Automation)** – Playbooks, incident automation.\n` +
        `3️⃣ **Booth Management App** – Backend APIs for election booth monitoring.\n` +
        `4️⃣ **E-Learning System** – Full-stack academic platform.\n\n` +
        `Want an explanation of any single project?`;
        return addMessage("bot", reply);
    }

    // === 6. Certifications ===
    if (includesAny(askCertifications)) {
        reply =
        `${resumeData.name} holds:\n` +
        `✔ IBM Java Certification\n✔ AWS Cloud Certification\n✔ MySQL Certification\n✔ Full Stack Certification (ITVedant)\n\n` +
        `He keeps upgrading his skills regularly.`;
        return addMessage("bot", reply);
    }

    // === 7. Strengths ===
    if (includesAny(askStrengths)) {
        reply =
        `Shridhar’s strengths:\n` +
        `• Strong problem-solving mindset\n` +
        `• Very good in backend and API development\n` +
        `• Quick learner & adaptive\n` +
        `• Writes clean, structured code\n` +
        `• Good communication & teamwork`;
        return addMessage("bot", reply);
    }

    // === 8. Weakness (polite version) ===
    if (includesAny(askWeakness)) {
        reply =
        `Like every growing developer, Shridhar is still improving in:\n` +
        `• Advanced system design\n` +
        `• Handling large-scale distributed systems\n` +
        `But he is actively learning and progressing fast.`;
        return addMessage("bot", reply);
    }

    // === 9. Personality ===
    if (includesAny(askPersonality)) {
        reply =
        `Shridhar is calm, focused, friendly, and hardworking.\n` +
        `He likes solving problems and enjoys working with teams.\n` +
        `People appreciate his patience and willingness to help others.`;
        return addMessage("bot", reply);
    }

    // === 10. Future Goals ===
    if (includesAny(askFuture)) {
        reply =
        `Shridhar's goal is to become a highly skilled Backend Engineer and eventually a Full Stack Architect.\n` +
        `He aims to master Spring Boot, Microservices, Cloud, and distributed systems.`;
        return addMessage("bot", reply);
    }

    // === 11. Work Style ===
    if (includesAny(askWorkStyle)) {
        reply =
        `Shridhar works in a structured, logical, and clean-coded manner.\n` +
        `He prefers planning tasks, breaking them into modules, and delivering with quality.\n` +
        `He communicates clearly and works well in team environments.`;
        return addMessage("bot", reply);
    }

    // === 12. Technical Explanations (Java / Spring) ===
    if (includesAny(askTechExplain)) {
        reply =
        `Sure! Shridhar can explain technologies simply:\n\n` +
        `**Spring MVC** → Framework for building web apps using Model-View-Controller.\n` +
        `**Java** → Object-oriented programming language used for backend logic.\n\n` +
        `If you want, I can give full examples, diagrams, or simple explanations.`;
        return addMessage("bot", reply);
    }

    // === 13. Contact ===
    if (includesAny(askContact)) {
        reply =
            `You can reach Shridhar at: **${resumeData.contact.email}**\n` +
            `He will get back to you soon! 😊`;
        return addMessage("bot", reply);
    }

    // === 14. Interview Scheduling ===
    if (msg.includes("interview") || msg.includes("schedule")) {
        startSchedulingFlow();
        return;
    }

    // === 15. Friendly Greeting ===
    if (msg.includes("hi") || msg.includes("hello") || msg.includes("hey")) {
        reply = `Hey! 😊 I'm Shrii Assistant. Ask me anything about Shridhar — skills, projects, experience, anything!`;
        return addMessage("bot", reply);
    }

    // === 16. Thanks ===
    if (msg.includes("thank")) {
        reply = `You're welcome! Happy to help anytime 😊`;
        return addMessage("bot", reply);
    }

    // === 17. Smart Fallback ===
    reply =
        `That's interesting! 😊  
I can tell you about Shridhar's skills, experience, projects, education, personality, or help you schedule an interview.`;

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
