const express = require( "express" );
const app = express();
const port = 3010;

app.use(express.static(__dirname + '/public'));

app.get( "/", ( req, res ) => {
    res.sendFile( __dirname + "/start.html" );
} );

app.get( "/ai", ( req, res ) => {
    res.sendFile( __dirname + "/AIPages/ai.html" );
} );

app.get( "/creators", ( req, res ) => {
    res.sendFile( __dirname + "/creatorsPages/creators.html" );
} );

app.get( "/games", ( req, res ) => {
    res.sendFile( __dirname + "/gamePages/games.html" );
} );

app.get( "/platforms", ( req, res ) => {
    res.sendFile( __dirname + "/platformPages/platforms.html" );
} );

app.get( "/signin", ( req, res ) => {
    res.sendFile( __dirname + "/signInPages/signIn.html" );
} );

app.get( "/vault", ( req, res ) => {
    res.sendFile( __dirname + "/vaultPages/vault.html" );
} );

app.get( "/vault/view", ( req, res ) => {
    res.sendFile( __dirname + "/vaultPages/view.html");
})

app.listen( port, () => {
    console.log(`App server listening on ${port}. (Go to http://localhost:${port})`);
} );

const fetch = require('node-fetch');

const getGameData = async() =>{
    const gamePromise = await fetch(`https://api.rawg.io/api/games?key=b4bacdc459564e0baa08905a2eb534d0`);
    const gameArray = await gamePromise.json();
    console.log(gameArray);
};

getGameData();