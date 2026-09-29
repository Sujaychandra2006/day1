function vote() {
    const name = document.getElementById("name").value.trim();
    const ageValue = document.getElementById("age").value.trim();
    const country = document.getElementById("country").value;
    const answer = document.getElementById("Answer");

    answer.className = "";

    if (name === "" || ageValue === "" || country === "") {
        answer.textContent = "⚠️ Please fill in all the fields.";
        answer.classList.add("warning");
        return;
    }

    const age = Number(ageValue);

    if (!Number.isInteger(age) || age <= 0 || age > 120) {
        answer.textContent = "⚠️ Please enter a valid age.";
        answer.classList.add("warning");
        return;
    }

    if (country !== "India") {
        answer.textContent = `❌ Sorry ${name}, only Indian citizens can vote in Indian elections.`;
        answer.classList.add("error");
        return;
    }

    if (age >= 18) {
        answer.textContent = `✅ Congratulations ${name}! You are eligible to vote.`;
        answer.classList.add("success");
    } else {
        const yearsLeft = 18 - age;
        answer.textContent = `❌ Sorry ${name}, you can vote in ${yearsLeft} more year${yearsLeft > 1 ? "s" : ""}.`;
        answer.classList.add("error");
    }
}