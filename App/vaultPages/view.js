const listOfGame = document.querySelector(".list");

const list = fetch('http://localhost:3020/vault/view_games')
    .then((res) => {
        return res.json()
    })
    .then((list) => {
        console.log(list)
        for (let i = 0; i < list.length; i++) {
            // console.log(list[i][0]['img_url'])
            listOfGame.innerHTML += `<div class="game-item">
                <img src="${list[i]['img_url']}" alt="">
                <div class="game-text">
                    <h1>${list[i]['name']}</h1>
                    <hr>
                    <h2>Genre: ${list[i]['genre']}</h2>
                    <hr>
                    <h2>Publisher: ${list[i]['publisher']}</h2>
                    <hr>
                    <h2>Date Released: ${list[i]['release_date']}</h2>
                    <hr>
                    <h2>Platform: ${list[i]['platform']}</h2>
                    <hr>
                    <h2>Hours Played: ${list[i]['hours']}</h2>
                    <hr>
                    <h2>Age Rating: ${list[i]['rating']}</h2>
                </div>
            </div>`
        }
    })

// console.log('hiifjasldkjf')
// console.log(list);

