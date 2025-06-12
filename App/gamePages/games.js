let gamesList = document.querySelector(".listOfGame");

const getGameData = async() =>{
        const pages = 5;
        for(let k = 1; k<=pages; k++){
            const gamePromise = await fetch(`https://api.rawg.io/api/games?key=b4bacdc459564e0baa08905a2eb534d0&page=${k}`);
            const gameArray = await gamePromise.json();
            console.log(gameArray);
            for(let i = 0; i<gameArray.results.length; i++){
                const elementPromise = await fetch(`https://api.rawg.io/api/games/${gameArray.results[i].id}?key=b4bacdc459564e0baa08905a2eb534d0`);
                const elementArray = await elementPromise.json();

                let genre = "Unknown";
                if(gameArray.results[i].genres?.[0]?.name){
                    genre = gameArray.results[i].genres[0].name;
                }

                let rating = "Unknown";
                if(gameArray.results[i].esrb_rating?.name){
                    rating = gameArray.results[i].esrb_rating.name;
                }

                gamesList.innerHTML+=`<div class="game-item">
                        <img src="${gameArray.results[i].background_image}" alt="">
                        <div class="game-text">
                            <h1>${gameArray.results[i].name}</h1>
                            <hr>
                            <h2>Genre: ${genre}</h2>
                            <hr>
                            <h2>Publisher: ${elementArray.publishers[0].name}</h2>
                            <hr>
                            <h2>Date Released: ${gameArray.results[i].released}</h2>
                            <hr>
                            <h2>Platform: N/A</h2>
                            <hr>
                            <h2>Hours Played: N/A</h2>
                            <hr>
                            <h2>ESRB Rating: ${rating}</h2>
                        </div>
                    </div>`;
            }
        }
};

getGameData();