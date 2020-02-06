const express = require('express');

const app = express();

const port = process.env.PORT || 3000;
const cakesRoutes = require('./routes/cakes');

// Midelware
app.use(express.json());

// First route
app.get('/', (req, res) => {
    res.send('Welcome, to cakes shop ;)');
});

app.use('/api/cakes', cakesRoutes);

app.listen(port, () => {
    console.log(`Listening on port ${port} for cake API`);
})