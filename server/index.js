// Global node imports
const path = require('path');
const express = require('express');
const opn = require('opn');

// Create an Express server
const app = express();

// Map the dist directory to be the one which is rendered via Express routing
app.use(express.static(path.join(__dirname.replace('server', ''), 'dist')));

app.use('*', ({ res }) => {
  res.sendFile(path.join(__dirname.replace('server', ''), 'dist', 'index.html'));
});

// What's the exact URL to use?
const port = process.env.PORT ? parseInt(process.env.PORT) : 3001;
const host = process.env.HOST ? process.env.HOST : '127.0.0.1';
const protocol = 'http';
const url = `${protocol}://${host}:${port}`;

// Listen for all requests on the spun up Express server
app.listen(port, host, () => {
    // Print a message when the server starts listening
    console.log(`Server listening on ${url}`);

    // Launch the website
    opn(url, {
        app: ['google chrome']
    });
});