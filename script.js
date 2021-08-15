const mainSectionContainer = document.querySelector("#songs");
const searchButton = document.querySelector("header button");
const searchBox = document.querySelector("#searchInput");

function updateTerm() {
    const searchTerm = searchBox.value;

    if (!searchTerm || searchTerm === "") {
        alert("please enter in a search term");
    }
    else {
        
        // check to see if there are articles left over from previous search
        while (mainSectionContainer.firstChild) {
            mainSectionContainer.removeChild(mainSectionContainer.firstChild);
        }

        // fetch returns a promise and when it comes back, 
        // the fuciton inside of then() is executed
        // The response parameter is the response from the fetch function
        // The data parameter is the json data form the previous .then() fucntion

        const url = `https://itunes.apple.com/search?media=music&term=${searchTerm}&limit=9`;

        fetch(url)
        .then( response => response.json() )
        .then( (data) => {
            
            const artistList = data.results;

            return artistList.map(result => {

                const article = document.createElement("article");
                const artist = document.createElement("p");
                const song = document.createElement("p");
                const img = document.createElement("img");
                const audio = document.createElement("audio");

                // grabbing data from each song json file
                artist.innerHTML = result.artistName;
                song.innerHTML = result.trackName;
                img.src = result.artworkUrl100;
                audio.src = result.previewUrl;

                // turn on controlls for auido player
                audio.setAttribute("controls", "");

                article.appendChild(img);
                article.appendChild(artist);
                article.appendChild(song);
                article.appendChild(audio);

                mainSectionContainer.appendChild(article);

                console.log(result);
            })
        })
        .catch(error => console.log("Request failed:", error));
    }
}

// main functionality when search button is pressed
searchButton.addEventListener("click", updateTerm);

// when a audio play button is played, pause all other audio players
document.addEventListener("play", event => {

    const audioList = document.querySelectorAll("audio");

    for (let i = 0; i < audioList.length; i++) {
        if (audioList[i] != event.target) {
            audioList[i].pause();
        }
    }
}, true);

// look into event capturing and bubbling to understand the 
// meaning of this true parameter
// true executes the event during the capturing phase (false = bubbling phase)

