const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

// toggle button
function toggleButton() {
    button.disable= !button.disable;
}


// passing our jokes to voiceRSS API
function tellMe (joke){
    VoiceRSS.speech({
        key: '8debc243a28141a1a4c9824f8dd87695',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get jokes from joke API
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Any';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = data.setup + " ... " + data.delivery;
        } else {
            joke = data.joke;
        }
        // text-to-speech
        tellMe(joke);
        //disable button
        toggleButton();
    } catch (e) {
        console.log('wtff fetch failed : ' + e);
    }
}

// event listeners
button.addEventListener("click",getJokes);
audioElement.addEventListener("ended",toggleButton);