const cfenv = require('cfenv');
const express = require('express');
const session = require('express-session');
const path = require('path');
const helmet = require('helmet');
const passport = require('passport');
const WebAppStrategy = require('ibmcloud-appid').WebAppStrategy;

const vars = require('./vars');

const appEnv = cfenv.getAppEnv();

const PORT = appEnv.isLocal ? vars.port : appEnv.port;
const CALLBACK_URL = '/auth/callback';
const LANDING_PAGE_URL = '/';

const app = express();
const distPath = path.join(__dirname, '../dist/');
const indexHtmlPath = path.join(distPath, 'index.html');

app.use(
  session({
    secret: vars.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(express.static(distPath));

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new WebAppStrategy({
    tenantId: vars.APP_ID.TENTANT_ID,
    clientId: vars.APP_ID.CLIENT_ID,
    secret: vars.APP_ID.SECRET,
    oauthServerUrl: vars.APP_ID.OAUTH_SERVER_URL,
    redirectUri: vars.FRONTEND_URL + CALLBACK_URL,
  })
);

passport.serializeUser(function (user, cb) {
  cb(null, user);
});
passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

app.get(
  '/login',
  passport.authenticate(WebAppStrategy.STRATEGY_NAME, {
    successRedirect: LANDING_PAGE_URL,
    forceLogin: true,
  })
);

app.get(CALLBACK_URL, passport.authenticate(WebAppStrategy.STRATEGY_NAME));

app.get('/auth/me', (req, res) => {
  if (vars.DISABLE_LOGIN == 1) {
    res
      .status(200)
      .json({
        accessToken: null,
      })
      .end();
    return;
  }

  if (
    !req.session ||
    !req.session[WebAppStrategy.AUTH_CONTEXT] ||
    !req.session[WebAppStrategy.AUTH_CONTEXT].accessToken
  ) {
    res.status(401).end();
    return;
  }

  res
    .status(200)
    .json({
      accessToken: req.session[WebAppStrategy.AUTH_CONTEXT].accessToken,
    })
    .end();
});

app.get('/logout', function (req, res) {
  WebAppStrategy.logout(req);
  res.redirect(LANDING_PAGE_URL);
});

app.get('/*', (req, res) => {
  res.sendFile(indexHtmlPath);
});

app.listen(PORT, () => console.log('App listening on port ' + PORT));
