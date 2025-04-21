const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('typed-value');
const wpmElement = document.getElementById('wpm');
const btnElement = document.getElementById('start');
typedValueElement.disabled = true;

let words = [];
let wordIndex = 0;
let hasStartedTyping = false;
let penaltyTime = 0;
let startTime = 0;

function startGame() {
    fetch('https://random-word-api.vercel.app/api?words=50')
        .then(response => response.json())
        .then(newWords => {
            const quote = newWords.join(' ');
            const spanWords = newWords.map(word => `<span>${word} </span>`);
            quoteElement.innerHTML = spanWords.join('');

            words = newWords;
            wordIndex = 0;
            hasStartedTyping = false;
            penaltyTime = 0;

            typedValueElement.disabled = false;

            btnElement.innerText = 'Restart';
            typedValueElement.value = '';
            typedValueElement.className = '';
            messageElement.innerText = '';
            wpmElement.innerText = '';
            typedValueElement.style.display = 'block';
            typedValueElement.focus();

            quoteElement.childNodes[wordIndex].classList.add('highlight');
        });
}

btnElement.addEventListener('click', startGame);

typedValueElement.addEventListener('input', () => {
    if (!hasStartedTyping) {
        startTime = new Date().getTime();
        hasStartedTyping = true;
    }

    const currentWord = words[wordIndex];
    const typedValue = typedValueElement.value;

    if (typedValue === currentWord && wordIndex === words.length - 1) {
        const endTime = new Date().getTime();
        const rawTime = Math.floor((endTime - startTime) / 1000);
        const timeTaken = Math.floor(rawTime + penaltyTime);
        const message = `Congratulations! You did it! Time taken: <b>${timeTaken} seconds</b>.`;
        const typingSpeed = Math.floor(words.length / (timeTaken / 60));
        const wpm = `Your typing speed is <b>${typingSpeed} wpm</b>.`;
        messageElement.innerHTML = message;
        wpmElement.innerHTML = wpm;

        typedValueElement.disabled = true;

    } else if (typedValue.endsWith(" ")) {
        if (typedValue.trim() !== currentWord) {
            penaltyTime += 0.75;
            quoteElement.childNodes[wordIndex].classList.add('skipped');
        }

        typedValueElement.value = '';
        wordIndex++;
        for (const wordElement of quoteElement.childNodes) {
            wordElement.classList.remove('highlight');
        }

        if (wordIndex < quoteElement.childNodes.length) {
            quoteElement.childNodes[wordIndex].classList.add('highlight');
        }
    } else if (currentWord.startsWith(typedValue)) {
        typedValueElement.className = '';
    } else {
        typedValueElement.className = 'error';
    }
});
