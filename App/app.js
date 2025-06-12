const express = require( "express" );
const cors = require('cors')
const db = require("./database/connection.js");
const app = express();
app.use(cors())
const port = 3020;

const DEBUG = true;


const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'http://localhost:3020',
  clientID: 'oxBqgC0XywMH3JicHh7NC9IT6kqISq6M',
  issuerBaseURL: 'https://dev-vqqxxfb4mxi0ebz2.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});



app.use( express.urlencoded({ extended: false }) );

app.use(express.static(__dirname + '/img')); // put style.css in the img folder

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

app.get( "/vault/delete", ( req, res ) => {
    res.sendFile( __dirname + "/vaultPages/delete.html");
});

app.get( "/vault/edit", ( req, res ) => {
    res.sendFile( __dirname + "/vaultPages/edit.html");
});

app.get( "/vault/view", ( req, res ) => {
    res.sendFile( __dirname + "/vaultPages/view.html");
});


const view_game_sql = `
SELECT user_id, name, genre, publisher, release_date, platform, hours, rating, img_url
FROM user_game ug
JOIN game g on g.name = ug.game_name
WHERE user_id = ?;
`

// db.execute(view_game_sql, [1], (error, results) => {
//     if (error) 
//         throw error;
//     else {
//         console.log(results);
//     }
// });

app.get('/vault/view_games', (req, res) => {
    db.execute(view_game_sql, [1], (error, results) => {
    if (error) 
        throw error;
    else {
        console.log(results);
        res.json(results);
    }
});
})

app.listen( port, () => {
    console.log(`App server listening on ${port}. (Go to http://localhost:${port})`);
} );

const create_game_sql = `
  INSERT INTO user_game(user_id, game_name, platform, hours)
  VALUES (?, ?, ?, ?);
`;

app.post("/vault/add", (req, res) => {
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
        res.redirect(`/vault/view`);
      }
    }
  );
});

const delete_game_sql = `
DELETE FROM user_game
WHERE game_name = ?
`;

app.post("/vault/delete", (req, res) => {
    console.log(req);
    db.execute(delete_game_sql, [req.body.deleteName], (error, results) => {
        if (DEBUG) console.log(error ? error : results);
        if (error) res.status(500).send(error);
        else {
            console.log(results);
            res.redirect('/vault/view');
        }
    });
});

const update_game_sql = `
UPDATE user_game
SET platform = ?, hours = ?
WHERE game_name = ?
`;

app.post("/vault/edit", (req, res) => {
    console.log(req);
    db.execute(update_game_sql, [req.body.platform, req.body.hours, req.body.name], (error, results) => {
        if (DEBUG) console.log(error ? error : results);
        if (error) res.status(500).send(error);
        else {
            console.log(results);
            res.redirect('/vault/view');
        }
    });
});