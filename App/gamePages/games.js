let gamesList = document.querySelector(".listOfGame");

const getGameData = async() =>{
        const gamePromise = await fetch(`https://api.rawg.io/api/games?key=b4bacdc459564e0baa08905a2eb534d0`);
        const gameArray = await gamePromise.json();
        console.log(gameArray);
        for(let i = 0; i<gameArray.results.length; i++){
            const elementPromise = await fetch(`https://api.rawg.io/api/games/${gameArray.results[i].id}?key=b4bacdc459564e0baa08905a2eb534d0`);
            const elementArray = await elementPromise.json();
            gamesList.innerHTML+=`<div class="game-item">
                    <img src="${gameArray.results[i].background_image}" alt="">
                    <div class="game-text">
                        <h1>${gameArray.results[i].name}</h1>
                        <hr>
                        <h2>Genre: ${gameArray.results[i].genres[0].name}</h2>
                        <hr>
                        <h2>Publisher: ${elementArray.publishers[0].name}</h2>
                        <hr>
                        <h2>Date Released: ${gameArray.results[i].released}</h2>
                        <hr>
                        <h2>Platform: N/A</h2>
                        <hr>
                        <h2>Hours Played: N/A</h2>
                        <hr>
                        <h2>ESRB Rating: ${gameArray.results[i].esrb_rating.name}</h2>
                    </div>
                </div>`;
        }
};

getGameData();