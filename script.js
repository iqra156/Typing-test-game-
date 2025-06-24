const paragraphs = [
    "Consistency is the foundation of meaningful progress. Small efforts, when repeated regularly, lead to significant achievements over time. Mistakes are not failures but valuable lessons that shape future success. Every moment of struggle holds within it an opportunity to grow. When you dedicate yourself to practicing consistently, even in the face of challenges or slow progress, you build resilience that propels you forward. Success is not reserved for those who never stumble but for those who rise again with renewed determination. Every hour you invest, no matter how ordinary it may seem, becomes a building block for your skills and understanding. The journey may test your patience, but it rewards your persistence. Remind yourself that each setback is temporary, and the lessons learned along the way are permanent tools for future success. Progress may be invisible at times, but with unwavering focus, your abilities expand, and confidence naturally follows.",

    "Every skill you develop opens new doors and possibilities. The key is to approach learning with curiosity and patience, understanding that mastery takes time. The early stages may feel overwhelming, filled with uncertainty and self-doubt, but those moments are essential stepping stones. With each attempt, your understanding deepens, and what once felt impossible slowly becomes manageable. Growth isn't always visible in the beginning, but the foundation you lay during these moments determines your future success. Remember that every expert was once a beginner who embraced the discomfort of not knowing. Their persistence, fueled by curiosity and a willingness to face mistakes, turned uncertainty into expertise. The process is not about perfection but about consistent effort and the courage to keep going. When you nurture your passion with patience and humility, success becomes inevitable.",

    "Progress is never linear, but persistence makes all the difference. Even when improvement feels slow, every small step counts toward your larger goals. It is easy to become discouraged when immediate results aren't visible, but real growth happens beneath the surface long before it becomes evident to others. Like a seed growing underground, your efforts may seem invisible, yet they are essential to the blossoming that follows. The moments of frustration are not signs of failure but necessary parts of the process. Embracing these moments with patience and trust in the process builds mental strength. Your willingness to continue, even when faced with setbacks or doubts, sets you apart. Remember that the most significant transformations often happen when you feel like giving up, yet choose to persist. Over time, consistency outshines bursts of motivation, and discipline paves the way to lasting success.",

    "Confidence grows from repeated effort and the willingness to embrace challenges. With time, what once seemed difficult becomes second nature. No skill, no matter how complex, is beyond your reach when you approach it with patience, consistency, and a growth mindset. Fear and self-doubt are natural companions on the learning journey, but they lose their power when confronted with action. Each small success builds momentum, proving to yourself that you are capable. Overcoming even the smallest obstacle plants the seeds of resilience, making you better equipped for the challenges ahead. It's important to focus on progress, not perfection. Mastery isn't born overnight but through steady, intentional practice. As your experience grows, so does your confidence, and what was once intimidating transforms into familiar territory.",

    "Learning something new often requires stepping out of your comfort zone. It's in these moments of discomfort that true growth occurs. Familiarity may feel safe, but it rarely fosters advancement. The real magic happens when you dare to venture into unfamiliar territory, confronting the unknown with curiosity and courage. The fear of failure is natural, but allowing it to hold you back stifles your potential. Instead, see each challenge as an invitation to stretch your abilities and expand your perspective. Every mistake made along the way is a valuable teacher, revealing areas for improvement and building resilience. With time and consistent effort, discomfort fades, replaced by competence and confidence. The boundaries of your comfort zone shift, making room for new opportunities and greater achievements.",

    "Each setback carries the potential for growth, provided you choose to reflect rather than retreat. Mistakes, frustrations, and temporary failures often disguise the very lessons you need to progress. It is only through experiencing difficulty that you develop the resilience, patience, and understanding required for mastery. Every time you rise after a setback, you chip away at self-doubt and replace it with quiet confidence. Progress is often slow, invisible, and discouraging at times, yet those who stay consistent eventually reap the rewards. When you allow yourself to embrace the process without demanding immediate perfection, you open the door to extraordinary growth. Each small effort, no matter how insignificant it feels, compounds into significant transformation over time.",

    "The pursuit of excellence is rarely comfortable, but it is always worthwhile. True learning stretches the mind, challenges old habits, and invites temporary uncertainty. This discomfort signals that you are expanding your abilities and stepping beyond the limits of your current skill set. The fear of making mistakes is natural, but it should never outweigh the excitement of discovering new capabilities. The most successful individuals are not those who never stumble, but those who persist with humility, curiosity, and determination. Every new lesson, no matter how small, adds to your growing foundation of knowledge and skill. Over time, these lessons shape both your mindset and your abilities, paving the way to greater achievements.",

    "Dedication and patience are powerful allies on the journey to mastering any skill. While shortcuts may promise quick results, true mastery is earned through consistent effort and mindful practice. Frustration and setbacks are inevitable companions along the way, but they are not signs to stop. Instead, they offer valuable insights, teaching you where to focus your attention and how to adapt your approach. The journey of growth is not measured solely by speed but by depth of understanding and the resilience you cultivate. Every hour of practice, every lesson learned, and every challenge faced becomes part of your evolving skill set. With unwavering dedication and a patient mindset, your goals gradually come within reach.",

    "Success isn't defined by how quickly you learn but by your commitment to keep going, even when the process feels slow or uncertain. The temptation to compare your progress to others is strong, but each individual's path is unique. What matters most is that you consistently show up, make an effort, and learn from every experience. Small improvements, often invisible in the short term, build a strong foundation over time. The journey may be filled with obstacles, but each one you overcome reinforces your resilience and deepens your expertise. In the end, the most meaningful accomplishments come from steady, determined progress, not fleeting bursts of effort. Stay committed, trust the process, and growth will follow.",

    "Technology evolves rapidly, but the mindset of curiosity and resilience remains timeless. The tools may change, but the fundamental principles of learning, adaptation, and persistence are constant. Embracing new technologies or unfamiliar subjects may feel overwhelming at first, but with consistent practice, understanding grows. The ability to navigate change with confidence is built not through avoiding challenges but by engaging with them directly. Curiosity transforms uncertainty into opportunity, while resilience helps you persevere through inevitable setbacks. When you approach both learning and change with an open mind and determined spirit, you cultivate the skills necessary to thrive in any environment. In this way, every new challenge becomes a stepping stone toward greater competence and confidence."
];


const typingText = document.getElementById("text");
const inputField = document.getElementById("typing-input");
const timeLeftDisplay = document.getElementById("time-left");
const mistakeDisplay = document.getElementById("mistakes");
const wpmDisplay = document.getElementById("wpm");
const cpmDisplay = document.getElementById("cpm");
const restartBtn = document.getElementById("restart");
const timeSelect = document.getElementById("timeSelect");
const popup = document.getElementById("popup");
const closePopup = document.getElementById("close-popup");
const finalWpm = document.getElementById("final-wpm");

let timer;
let timeLeft = 60;
let isTyping = false;
let charIndex = 0;
let mistakes = 0;
let wpm = 0;
let cpm = 0;
let pauseTimeout;

function loadNewText() {
    const randomIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerText = paragraphs[randomIndex];
}

function startTyping(e) {
    clearTimeout(pauseTimeout);
    pauseTimeout = setTimeout(pauseGame, 5000);

    if (!isTyping) {
        isTyping = true;
        timer = setInterval(updateTimer, 1000);
    }

    let typedChar = e.key;
    if (charIndex < typingText.innerText.length && timeLeft > 0) {
        if (typedChar === typingText.innerText[charIndex]) {
            charIndex++;
        } else {
            mistakes++;
        }
        mistakeDisplay.innerText = mistakes;
    }
    updateStats();
}

function updateStats() {
    cpm = charIndex;
    wpm = timeLeft < 60 ? Math.round((charIndex / 5) / ((60 - timeLeft) / 60)) : 0;
    wpmDisplay.innerText = wpm > 0 ? wpm : 0;
    cpmDisplay.innerText = cpm;
}

function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeLeftDisplay.innerText = `${timeLeft} sec`;
    } else {
        endGame();
    }
}

function endGame() {
    clearInterval(timer);
    popup.classList.remove("hidden");
    finalWpm.innerText = wpm;
}

function pauseGame() {
    clearInterval(timer);
    isTyping = false;
}

function resetGame() {
    clearInterval(timer);
    isTyping = false;
    timeLeft = parseInt(timeSelect.value);
    charIndex = 0;
    mistakes = 0;
    wpm = 0;
    cpm = 0;

    timeLeftDisplay.innerText = `${timeLeft} sec`;
    mistakeDisplay.innerText = 0;
    wpmDisplay.innerText = 0;
    cpmDisplay.innerText = 0;
    loadNewText();
    inputField.value = "";
    inputField.focus();
    popup.classList.add("hidden");
}

document.addEventListener("DOMContentLoaded", () => {
    loadNewText();
    inputField.addEventListener("keydown", startTyping);
    restartBtn.addEventListener("click", resetGame);
    closePopup.addEventListener("click", () => popup.classList.add("hidden"));
    timeSelect.addEventListener("change", resetGame);
    inputField.focus();
});


function endGame() {
    clearInterval(timer);
    popup.classList.remove("hidden");
    finalWpm.innerText = wpm;
    inputField.disabled = true; // Disable input when time ends
    
    // Show message below input
    const message = document.createElement("p");
    message.id = "time-over-message";
    message.innerText = "Time over! Want to practice more? Click 'Try Again'.";
    message.style.color = "red";
    message.style.fontWeight = "bold";
    message.style.marginTop = "10px";

    // Remove any existing message before adding a new one
    const existingMessage = document.getElementById("time-over-message");
    if (existingMessage) {
        existingMessage.remove();
    }

    inputField.parentNode.appendChild(message);
}

function resetGame() {
    clearInterval(timer);
    isTyping = false;
    timeLeft = parseInt(timeSelect.value);
    charIndex = 0;
    mistakes = 0;
    wpm = 0;
    cpm = 0;

    timeLeftDisplay.innerText = `${timeLeft} sec`;
    mistakeDisplay.innerText = 0;
    wpmDisplay.innerText = 0;
    cpmDisplay.innerText = 0;
    loadNewText();
    inputField.value = "";
    inputField.focus();
    inputField.disabled = false; // Enable input on reset

    // Remove the "Time over" message if it exists
    const existingMessage = document.getElementById("time-over-message");
    if (existingMessage) {
        existingMessage.remove();
    }
}
