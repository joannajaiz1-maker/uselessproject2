function getRandomLetters(length) {
  const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  return result;
}

function getRandomYears(start = 1400, end = 2025) {
  const years = [];
  for (let y = start; y <= end; y++) {
    years.push(y);
  }
  return years.sort(() => Math.random() - 0.5);
}

function populateYearScroll() {
  const container = document.getElementById("year-scroll");
  const years = getRandomYears();

  years.forEach(year => {
    const div = document.createElement("div");
    div.className = "year-option";
    div.innerText = year;
    div.onclick = () => {
      document.querySelectorAll(".year-option").forEach(opt => opt.classList.remove("selected"));
      div.classList.add("selected");
    };
    container.appendChild(div);
  });
}

function setupNameEnterKey() {
  const nameInput = document.getElementById("name-input");
  let attemptCount = 0;
  let originalName = "";

  nameInput.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      e.preventDefault();
      attemptCount++;

      if (attemptCount === 1) {
        originalName = nameInput.value;
      }

      if (attemptCount <= 2) {
        const randomName = getRandomLetters(Math.floor(Math.random() * 5) + 6);
        nameInput.value = randomName;
        
        
      }
    }
  });
}

function makeButtonDodge() {
  const button = document.getElementById("submit-btn");
  const form = document.getElementById("random-form");

  button.addEventListener("mouseenter", () => {
    const maxX = form.clientWidth - button.offsetWidth;
    const maxY = form.clientHeight - button.offsetHeight - 50;
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    button.style.position = 'relative';
    button.style.left = `${randomX - maxX / 2}px`;
    button.style.top = `${randomY - maxY / 2}px`;
  });

  button.addEventListener("click", e => {
    e.preventDefault();
    alert("You can't click me 😈");
  });
}


function setupBioAutoClear() {
  const bio = document.getElementById("bio-input");
  let timeout = null;

  function resetTimer() {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      bio.value = "";
      console.log("Bio cleared due to inactivity.");
    }, 5000); // 5 seconds
  }

  bio.addEventListener("input", resetTimer);
  bio.addEventListener("keydown", resetTimer);
}

document.addEventListener("DOMContentLoaded", () => {
  populateYearScroll();
  setupNameEnterKey();
  setupBioAutoClear();
  makeButtonDodge();
});

