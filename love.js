// Turns the two names into a score from 0 to 100.
// The same pair always gets the same score, whichever order they're typed in.
function getLoveScore(name1, name2) {
    const names = [name1.toLowerCase(), name2.toLowerCase()].sort();
    const combined = names.join("❤");

    let hash = 0;
    for (let i = 0; i < combined.length; i++) {
        hash = (hash * 31 + combined.charCodeAt(i)) % 1000003;
    }
    return hash % 101;
}

function getMessage(score) {
    if (score >= 90) return "💍 Made for each other! A perfect match!";
    if (score >= 75) return "😍 Amazing chemistry! Love is in the air.";
    if (score >= 60) return "💕 A great couple with lots of potential.";
    if (score >= 40) return "🙂 Good friends, maybe something more?";
    if (score >= 20) return "🤔 It'll take some effort, but who knows!";
    return "💔 Better as friends... for now!";
}

// Counts the number up from 0 to the final score
function animateNumber(element, target) {
    let current = 0;
    const timer = setInterval(() => {
        element.textContent = current + "%";
        if (current >= target) {
            clearInterval(timer);
        }
        current++;
    }, 12);
}

function predictLove() {
    const name1 = document.getElementById("name1").value.trim();
    const name2 = document.getElementById("name2").value.trim();
    const error = document.getElementById("error");
    const result = document.getElementById("result");
    const percent = document.getElementById("percent");
    const barFill = document.getElementById("barFill");
    const message = document.getElementById("message");

    error.textContent = "";

    // Check that both names are filled in
    if (name1 === "" || name2 === "") {
        error.textContent = "⚠️ Please enter both names.";
        result.classList.remove("show");
        return;
    }

    // Only letters and spaces allowed
    const validName = /^[a-zA-Z\s]+$/;
    if (!validName.test(name1) || !validName.test(name2)) {
        error.textContent = "⚠️ Names should contain only letters.";
        result.classList.remove("show");
        return;
    }

    if (name1.toLowerCase() === name2.toLowerCase()) {
        error.textContent = "😄 Self-love is 100%! Try two different names.";
        result.classList.remove("show");
        return;
    }

    const score = getLoveScore(name1, name2);

    // Show the result and animate it
    result.classList.add("show");
    barFill.style.width = "0%";
    setTimeout(() => { barFill.style.width = score + "%"; }, 50);
    animateNumber(percent, score);
    message.textContent = `${name1} & ${name2}: ${getMessage(score)}`;
}