const express = require( "express" );
const db = require("./database/connection.js");
const app = express();
const port = 3000;

app.use( express.urlencoded({ extended: false }) );

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

app.get("/platforms/mobile", (req, res) => {
    res.sendFile(__dirname + "/platformPages/mobile.html");
});

app.get("/platforms/nintendo", (req, res) => {
    res.sendFile(__dirname + "/platformPages/nintendo.html");
});

app.get("/platforms/pc", (req, res) => {
    res.sendFile(__dirname + "/platformPages/pc.html");
});

app.get("/platforms/playstation", (req, res) => {
    res.sendFile(__dirname + "/platformPages/playstation.html");
});

app.get("/platforms/steam", (req, res) => {
    res.sendFile(__dirname + "/platformPages/steam.html");
});

app.get("/platforms/xbox", (req, res) => {
    res.sendFile(__dirname + "/platformPages/xbox.html");
});

app.get( "/signin", ( req, res ) => {
    res.sendFile( __dirname + "/signInPages/signIn.html" );
} );

app.get( "/vault", ( req, res ) => {
    res.sendFile( __dirname + "/vaultPages/vault.html" );
} );

app.get( "/vault/add", ( req, res ) => {
    res.sendFile( __dirname + "/vaultPages/add.html");
});

app.get( "/vault/view", ( req, res ) => {
    res.sendFile( __dirname + "/vaultPages/view.html");
});

const view_games_query = "select ";

app.listen( port, () => {
    console.log(`App server listening on ${port}. (Go to http://localhost:${port})`);
} );

const create_game_sql = `
  INSERT INTO user_game(user_id, game_name, platform, hours)
  VALUES (1, ?, ?, ?);
`;

app.post("/add", (req, res) => {
  console.log(req);
  db.execute(
    create_game_sql,
    [1, req.body.name, req.body.platform, req.body.hours],
    (error, results) => {
      if (DEBUG) console.log(error ? error : results);
      if (error) res.status(500).send(error); // Internal Server Error
      else {
        console.log(results);
        // results.insertId has the primary key (assignmentId) of the newly inserted row.
        res.redirect(`/add/${results.insertId}`);
      }
    }
  );
});




