const paragraphs = [
    "The quick brown fox jumps over the lazy dog is one of the most famous pangrams in the English language, meaning it contains every letter of the alphabet at least once. This sentence is commonly used for testing fonts, keyboards, and typing skills. It helps typists practice finger placement and accuracy, ensuring that all letters are covered efficiently. Over time, it has become a standard phrase in typewriter testing and design applications. The imagery it evokes—a swift, agile fox leaping over a relaxed, slow-moving dog—creates a striking contrast between energy and stillness. It symbolizes speed, dexterity, and efficiency, making it a fitting metaphor for typing practice. The sentence’s balanced structure allows for smooth transitions between letters, helping users develop muscle memory. Whether used in typing tests or design previews, this classic phrase remains an essential tool for improving language skills, typing accuracy, and keyboard proficiency.",
    "Typing quickly and accurately is a skill that takes time, patience, and consistent practice to develop. It is not just about speed but also about hitting the right keys without making errors. Professional typists train for years to improve their typing speed while minimizing mistakes, as accuracy is just as crucial as speed in effective communication. Various online platforms offer typing tests and exercises to help users enhance their proficiency. Touch typing—where fingers instinctively reach for the correct keys without looking at the keyboard—is the most effective method for improving speed. Daily practice can significantly boost efficiency, making it easier to complete tasks that require extensive text input. Good posture, hand positioning, and proper finger placement also play essential roles in developing fast typing skills. Whether for personal or professional use, mastering this ability increases productivity, allowing individuals to work more efficiently in today’s fast-paced digital world.",
    "JavaScript is one of the most powerful programming languages used in web development, enabling websites to be interactive and dynamic. Unlike static HTML and CSS, JavaScript allows developers to create engaging user experiences by adding animations, pop-ups, sliders, and other real-time interactions. Modern websites rely heavily on JavaScript to enhance functionality, from handling form validations to fetching and displaying data asynchronously. It powers interactive elements such as dropdown menus, live chat features, and responsive navigation bars. With the introduction of frameworks and libraries like React, Vue, and Angular, JavaScript development has become more efficient and scalable. This language is also widely used in game development, mobile apps, and backend services with technologies like Node.js. As one of the core building blocks of web applications, JavaScript continues to evolve, offering new possibilities for developers. Learning JavaScript is essential for anyone looking to create modern, user-friendly, and dynamic websites.",
    "Frontend development is a perfect blend of creativity and technical skills, requiring developers to design visually appealing and functional web interfaces. It involves HTML, CSS, and JavaScript to create layouts, animations, and interactive elements that users engage with. A good frontend developer needs a keen eye for design, ensuring that websites are user-friendly, responsive, and aesthetically pleasing across all devices. The creative aspect involves choosing colors, typography, and layouts that enhance user experience, while the technical side includes coding, debugging, and optimizing performance. Modern frontend frameworks like React, Vue, and Angular have made development more efficient by providing reusable components and state management features. In today’s digital world, businesses rely on frontend developers to create seamless, engaging websites that leave a lasting impression. As technology advances, staying updated with the latest trends and tools is crucial for frontend developers to remain competitive in the industry.",
    "Participating in coding challenges is one of the best ways to improve problem-solving skills and logical thinking. These challenges test a developer’s ability to write efficient, clean, and optimized code within given constraints. They often require knowledge of algorithms, data structures, and programming concepts to solve problems effectively. Competitive programming platforms like LeetCode, Codeforces, and HackerRank provide a variety of problems ranging from beginner to expert levels. Engaging in such challenges enhances a developer’s ability to think critically and break down complex tasks into manageable steps. Coding competitions also foster creativity, encouraging participants to explore multiple approaches to a problem. In addition to improving technical skills, these challenges build confidence and prepare programmers for real-world development and job interviews. Many tech companies assess candidates through coding tests, making it essential for aspiring developers to practice regularly. Consistently solving coding challenges sharpens the mind, boosts efficiency, and strengthens programming expertise."
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
