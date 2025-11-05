
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

// Resume details for smart replies
const resumeData = {
  name: "Shridhar Varadkar",
  role: "Java Developer",
  location: "Mumbai, India",
  email: "hemantvaradkar2000@gmail.com",
  phone: "+91 9834504986",
  objective: "Aspiring to leverage experience as a Java Developer in a growth-focused role. Committed to continuous learning and delivering efficient software solutions.",
  experience: {
    current: {
      company: "Velox Solutions",
      title: "Java Developer",
      period: "Dec 2023 – Present",
      highlights: [
        "Developed and maintained scalable backend systems using Java, Spring MVC, and Hibernate.",
        "Integrated Elasticsearch for real-time data indexing and search optimization.",
        "Built responsive JSP-based dashboards using HTML, CSS, Bootstrap, and jQuery."
      ]
    },
    total_years: "2 years (approx.)"
  },
  projects: [
    {
      id: "siem",
      title: "Security Information and Event Management (SIEM)",
      desc: "Developed core modules for a SIEM platform enabling log monitoring, alert correlation, and visualization with Elasticsearch and Kibana."
    },
    {
      id: "booth",
      title: "Booth Management System (Mobile App)",
      desc: "Created backend APIs and integrated MySQL database to manage election booth data efficiently."
    }
  ],
  education: {
    degree: "MCA (Pursuing, 2024)",
    institute: "Bharati Vidyapeeth"
  },
  certifications: [
    "IBM Java Fundamentals",
    "AWS Cloud",
    "MySQL Database Concepts",
    "Full Stack Development — ITVedant"
  ],
  resumeLink: "Resume (2) (1).pdf"
};

// UI element bindings
const chatToggle = document.getElementById('chatToggle');
const closeChat = document.getElementById('closeChat');
const chatbot = document.getElementById('chatbot');
const sendBtn = document.getElementById('sendMessage');
const userInput = document.getElementById('userMessage');
const chatMessages = document.getElementById('chatMessages');
const voiceBtn = document.getElementById('voiceInput');

// Chat state
let schedulingMode = false;
let schedulingStep = 0;
let schedulingData = { name:'', email:'', phone:'', date:'', time:'', purpose:'' };

// ===== Voice setup =====
let preferredVoice = null;
function loadVoices() {
  const voices = window.speechSynthesis.getVoices();
  const female = voices.filter(v => /female|zira|susan|samantha|victoria|google uk|google us/i.test(v.name));
  preferredVoice = female[0] || voices.find(v => v.lang.startsWith('en')) || voices[0];
}
window.speechSynthesis.onvoiceschanged = loadVoices;
loadVoices();

function speak(text) {
  const msg = new SpeechSynthesisUtterance(text.replace(/<[^>]*>/g,''));
  msg.voice = preferredVoice;
  msg.lang = 'en-US';
  msg.rate = 1;
  msg.pitch = 1;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(msg);
}

// ===== Helper Functions =====
function addMessage(sender, text) {
  const div = document.createElement('div');
  div.className = `message ${sender}`;
  div.innerHTML = `<div class="message-content">${text}<span class="timestamp">Just now</span></div>`;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  if (sender === 'bot') speak(text);
}

function validateEmail(e){return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(e);}
function validateDate(d){return /^\\d{1,2}\\/\\d{1,2}\\/\\d{4}$/.test(d);}
function capitalize(s){return s.charAt(0).toUpperCase()+s.slice(1);}

// ===== Chat logic =====
if (chatToggle) chatToggle.onclick = ()=>chatbot.classList.toggle('active');
if (closeChat) closeChat.onclick = ()=>chatbot.classList.remove('active');

if (sendBtn) sendBtn.onclick = handleSend;
if (userInput) userInput.onkeypress = (e)=>{if(e.key==='Enter') handleSend();};

function handleSend(){
  const msg = userInput.value.trim();
  if(!msg) return;
  addMessage('user', msg);
  userInput.value='';
  setTimeout(()=>processMessage(msg.toLowerCase()), 400);
}

// Voice Input
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
if (SR) {
  const rec = new SR();
  rec.lang = 'en-US';
  rec.continuous = false;
  rec.onresult = (e)=>{
    userInput.value = e.results[0][0].transcript;
    handleSend();
  };
  voiceBtn.onclick = ()=>rec.start();
}

// ===== Process Message =====
function processMessage(msg){
  if (schedulingMode) return handleSchedule(msg);

  if (msg.includes('hi') || msg.includes('hello')){
    addMessage('bot', `Hello! I’m Shrii Assistant. How can I help you know more about ${resumeData.name}?`);
  }
  else if (msg.includes('skills')){
    addMessage('bot', `${resumeData.name} is skilled in Java, Spring MVC, MySQL, HTML, CSS, JavaScript, and Elasticsearch.`);
  }
  else if (msg.includes('project')){
    addMessage('bot', `He has worked on: <br>1️⃣ ${resumeData.projects[0].title} — ${resumeData.projects[0].desc}<br>2️⃣ ${resumeData.projects[1].title} — ${resumeData.projects[1].desc}`);
  }
  else if (msg.includes('experience')){
    addMessage('bot', `${resumeData.name} is currently working as a ${resumeData.experience.current.title} at ${resumeData.experience.current.company}.`);
  }
  else if (msg.includes('education')){
    addMessage('bot', `${resumeData.name} is pursuing ${resumeData.education.degree} from ${resumeData.education.institute}.`);
  }
  else if (msg.includes('certification')){
    addMessage('bot', `${resumeData.name} holds certifications in ${resumeData.certifications.join(', ')}.`);
  }
  else if (msg.includes('resume')){
    addMessage('bot', `You can download ${resumeData.name}’s resume <a href="${resumeData.resumeLink}" target="_blank">here</a>.`);
  }
  else if (msg.includes('schedule') || msg.includes('interview')){
    schedulingMode = true;
    schedulingStep = 1;
    addMessage('bot', `Sure, let's schedule an interview with ${resumeData.name}. Please tell me your full name.`);
  }
  else {
    addMessage('bot', `I can tell you about ${resumeData.name}'s skills, projects, or help schedule a meeting. What would you like to know?`);
  }
}

// ===== Scheduling Flow =====
function handleSchedule(msg){
  switch(schedulingStep){
    case 1: schedulingData.name = msg; schedulingStep=2;
      addMessage('bot', `Thanks ${capitalize(msg)}. What’s your email address?`); break;
    case 2:
      if(!validateEmail(msg)){ addMessage('bot','Please enter a valid email.'); return; }
      schedulingData.email = msg; schedulingStep=3;
      addMessage('bot','Got it! Your phone number please?'); break;
    case 3: schedulingData.phone = msg; schedulingStep=4;
      addMessage('bot','Preferred date? (DD/MM/YYYY)'); break;
    case 4:
      if(!validateDate(msg)){ addMessage('bot','Please use DD/MM/YYYY format.'); return; }
      schedulingData.date = msg; schedulingStep=5;
      addMessage('bot','Preferred time? (e.g. 11:00 AM)'); break;
    case 5: schedulingData.time = msg; schedulingStep=6;
      addMessage('bot','What’s the purpose of the meeting/interview?'); break;
    case 6:
      schedulingData.purpose = msg; schedulingMode=false; schedulingStep=0;
      sendSchedule();
      break;
  }
}

async function sendSchedule(){
  addMessage('bot','Sending your request...');
  try{
    const res = await fetch('/api/schedule-call',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(schedulingData)
    });
    const data = await res.json();
    if(res.ok) addMessage('bot',`✅ Request sent! ${resumeData.name} will contact you soon. Confirmation sent to ${schedulingData.email}.`);
    else addMessage('bot','⚠️ Failed to send email. Check server configuration.');
  }catch(err){ addMessage('bot','⚠️ Could not connect to server.'); }
}

// ===== Personalized Introduction =====
addMessage('bot', `
👋 Hello! I’m Shrii Assistant — here to tell you about <strong>${resumeData.name}</strong>.<br><br>
${resumeData.name} is currently working as a <strong>Java Developer</strong> at Velox Solutions, where he’s involved in backend development using Java, Spring MVC, MySQL, and web technologies like HTML, CSS, and JavaScript.<br><br>
He has worked on projects such as a <strong>Security Information and Event Management (SIEM)</strong> system and a <strong>Booth Management mobile app</strong>.<br><br>
He has completed his <strong>BCA</strong> with a CGPA of 8.69 and is pursuing <strong>MCA</strong> from Bharati Vidyapeeth. He also holds certifications in <strong>Java, MySQL, and AWS</strong>.<br><br>
He’s passionate about learning and improving his skills through real-time projects.<br><br>
Ask me about ${resumeData.name}’s <strong>skills</strong>, <strong>projects</strong>, <strong>education</strong>, or <strong>schedule an interview</strong>.
`);

