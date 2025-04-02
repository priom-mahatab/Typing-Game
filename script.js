const quotes = [
    'when you have eliminated the impossible whatever remains however improbable must be the truth',
    'there is nothing more deceptive than an obvious fact',
    'i ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation',
    'i never make exceptions an exception disproves the rule',
    'what one man can invent another can discover',
    'nothing clears up a case so much as stating it to another person',
    'education never ends watson it is a series of lessons with the greatest for the last',
];

let words = [];
let wordIndex = 0;

let startTime = Date.now();

const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('typed-value');
const wpmElement = document.getElementById('wpm');
const btnElement = document.getElementById('start');

// setting up the UI
document.getElementById('start').addEventListener('click', () => {
    const quoteIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[quoteIndex];

    typedValueElement.style.display = 'block';
    btnElement.innerText = 'Restart';

    words = quote.split(' ');
    wordIndex = 0;

    const spanWords = words.map(function(word) {return `<span>${word} </span>`});
    quoteElement.innerHTML = spanWords.join('');

    quoteElement.childNodes[wordIndex].className = 'highlight';
    messageElement.innerText = '';
    wpmElement.innerText = '';
    typedValueElement.value = '';

    typedValueElement.focus();

    startTime = new Date().getTime();

})

// handling typing
typedValueElement.addEventListener('input', () => {
    const currentWord = words[wordIndex];
    const typedValue = typedValueElement.value;

    if (typedValue === currentWord && wordIndex === words.length-1) {
        const endTime = new Date().getTime();
        const timeTaken = Math.floor((endTime - startTime) / 1000);
        const message = `Congratulations! You did it! Time taken: <b>${timeTaken} seconds</b>.`;
        const typingSpeed = Math.floor(words.length / (timeTaken / 60));
        const wpm = `Your typing speed is <b>${typingSpeed} wpm</b>.`
        messageElement.innerHTML = message;
        wpmElement.innerHTML = wpm;


    } else if(typedValue.endsWith(" ") && typedValue.trim() === currentWord) {
        typedValueElement.value = '';
        wordIndex++;
        for (const wordElement of quoteElement.childNodes) {
            wordElement.className = '';
        }
        quoteElement.childNodes[wordIndex].className = 'highlight';
    } else if(currentWord.startsWith(typedValue)) {
        typedValueElement.className = '';
    } else {
        typedValueElement.className = 'error';
    }  
});

