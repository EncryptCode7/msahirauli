// index.js - tiny static server for Cloud Run / Node buildpack
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// Serve static files from repository root (index.html + static/)
app.use(express.static(path.join(__dirname)));

// For SPA-style routing, return index.html for any unknown path
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
