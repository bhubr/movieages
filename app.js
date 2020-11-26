const express = require('express');
const movies = require('./movies-min.json');

const app = express();

app.get('/movies', (req, res) => {
  (async () => {
    try {
      const { query: { ageFrom } } = req;
      const ageNum = ageFrom ? Number(ageFrom) : undefined;
      const filteredMovies = ageNum
        ? movies.filter((m) => m.ageFrom === ageNum)
        : movies;
      res
        .json(filteredMovies);
    } catch (err) {
      res.sendStatus(500);
    }
  })();
});

const port = process.env.PORT || 5000;
app.listen(port, (err) => {
  if (err) {
    console.error(`ERROR on startup: ${err.message}`);
  } else {
    console.log(`App listening on ${port}`);
  }
});
