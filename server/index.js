const cfenv = require('cfenv');
const express = require('express');
const path = require('path');
const helmet = require('helmet');

const appEnv = cfenv.getAppEnv();
const PORT = appEnv.isLocal ? 3000 : appEnv.port;
const app = express();
const distPath = path.join(__dirname, '../dist/');
const indexHtmlPath = path.join(distPath, 'index.html');

app.use(helmet());
app.use(express.static(distPath));

app.get('/*', (req, res) => {
  res.sendFile(indexHtmlPath);
});

app.listen(PORT, () => console.log('App listening on port ' + PORT));
