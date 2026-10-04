const passwordOutput = document.getElementById("passwordOutput");
const passwordLength = document.getElementById("passwordLength");
const lengthValue = document.getElementById("lengthValue");

const uppercaseCheckbox = document.getElementById("uppercase");
const lowercaseCheckbox = document.getElementById("lowercase");
const numbersCheckbox = document.getElementById("numbers");
const symbolsCheckbox = document.getElementById("symbols");

const generateButton = document.getElementById("generateButton");
const copyButton = document.getElementById("copyButton");

const errorMessage = document.getElementById("errorMessage");

const strengthText = document.getElementById("strengthText");
const strengthIndicator = document.getElementById("strengthIndicator");


const characterSets = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%&*"
};


// Update displayed password length
passwordLength.addEventListener("input", () => {
    lengthValue.textContent = passwordLength.value;

    updateStrength();
});


// Get a cryptographically stronger random number
function getSecureRandomNumber(max) {
    const randomArray = new Uint32Array(1);

    crypto.getRandomValues(randomArray);

    return randomArray[0] % max;
}


// Get a random character from a string
function getRandomCharacter(characterSet) {
    const randomIndex = getSecureRandomNumber(characterSet.length);

    return characterSet[randomIndex];
}


// Shuffle an array using secure random values
function shuffleArray(array) {

    for (let i = array.length - 1; i > 0; i--) {

        const randomIndex = getSecureRandomNumber(i + 1);

        [array[i], array[randomIndex]] =
            [array[randomIndex], array[i]];
    }

    return array;
}


// Get the character sets selected by the user
function getSelectedCharacterSets() {

    const selectedSets = [];

    if (uppercaseCheckbox.checked) {
        selectedSets.push(characterSets.uppercase);
    }

    if (lowercaseCheckbox.checked) {
        selectedSets.push(characterSets.lowercase);
    }

    if (numbersCheckbox.checked) {
        selectedSets.push(characterSets.numbers);
    }

    if (symbolsCheckbox.checked) {
        selectedSets.push(characterSets.symbols);
    }

    return selectedSets;
}


// Generate the password
function generatePassword() {

    errorMessage.textContent = "";

    const selectedSets = getSelectedCharacterSets();

    const length = Number(passwordLength.value);

    if (selectedSets.length === 0) {

        passwordOutput.textContent =
            "Select at least one option";

        errorMessage.textContent =
            "Please select at least one character type.";

        return;
    }

    if (length < selectedSets.length) {

        passwordOutput.textContent =
            "Increase password length";

        errorMessage.textContent =
            "Password length must be at least the number of selected character types.";

        return;
    }


    const passwordCharacters = [];


    // Guarantee at least one character from every selected category
    selectedSets.forEach((set) => {

        passwordCharacters.push(
            getRandomCharacter(set)
        );

    });


    // Combine all selected character sets
    const combinedCharacterSet =
        selectedSets.join("");


    // Fill the remaining password length
    while (passwordCharacters.length < length) {

        passwordCharacters.push(
            getRandomCharacter(combinedCharacterSet)
        );

    }


    // Shuffle characters so the guaranteed characters
    // aren't always at the beginning
    shuffleArray(passwordCharacters);


    const password = passwordCharacters.join("");

    passwordOutput.textContent = password;

    updateStrength();
}


// Calculate an approximate strength score
function calculateStrength() {

    const length = Number(passwordLength.value);

    const selectedSets = getSelectedCharacterSets();

    let score = 0;

    if (length >= 12) {
        score++;
    }

    if (length >= 16) {
        score++;
    }

    if (selectedSets.length >= 2) {
        score++;
    }

    if (selectedSets.length >= 3) {
        score++;
    }

    if (selectedSets.length === 4) {
        score++;
    }

    return score;
}


// Update password strength indicator
function updateStrength() {

    const score = calculateStrength();

    let width = "20%";
    let text = "Weak";

    if (score >= 5) {

        width = "100%";
        text = "Very Strong";

    } else if (score >= 4) {

        width = "80%";
        text = "Strong";

    } else if (score >= 3) {

        width = "60%";
        text = "Good";

    } else if (score >= 2) {

        width = "40%";
        text = "Fair";
    }


    strengthIndicator.style.width = width;

    strengthText.textContent = text;
}


// Copy generated password
async function copyPassword() {

    const password = passwordOutput.textContent;

    if (
        !password ||
        password === "Your password will appear here" ||
        password === "Select at least one option" ||
        password === "Increase password length"
    ) {
        errorMessage.textContent =
            "Generate a password before copying.";

        return;
    }


    try {

        await navigator.clipboard.writeText(password);

        copyButton.textContent = "Copied!";

        setTimeout(() => {
            copyButton.textContent = "Copy";
        }, 1500);

    } catch (error) {

        errorMessage.textContent =
            "Unable to copy password. Please copy it manually.";

        console.error("Copy failed:", error);
    }
}


// Generate password when button is clicked
generateButton.addEventListener(
    "click",
    generatePassword
);


// Copy password when copy button is clicked
copyButton.addEventListener(
    "click",
    copyPassword
);


// Update strength when options change
const checkboxes = [
    uppercaseCheckbox,
    lowercaseCheckbox,
    numbersCheckbox,
    symbolsCheckbox
];

checkboxes.forEach((checkbox) => {

    checkbox.addEventListener(
        "change",
        updateStrength
    );

});


// Generate a password immediately when the page loads
generatePassword();
generateHTML()
