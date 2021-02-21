const secret = '23beef3e-b8cf-46ba-8cb6-73b5304f734c';
const jwt = require('jsonwebtoken');
const { findUserPerId } = require('../queries/user.queries');
const { app } = require('../../index');

const createJwtToken = (user) => {
  const jwtToken = jwt.sign({ sub: user._id.toString(), }, secret, {expiresIn: '1h'});
  return jwtToken;
}

exports.createJwtToken = createJwtToken;

const extractUserFromToken = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    try {
      const decodedToken = jwt.verify(token, secret);
      const user = await findUserPerId(decodedToken.sub);
      if (user) {
        req.user = user;
        next();
      } else {
      res.clearCookie('jwt');
      res.status(403).send('Token invalide')
      }

    } catch (error) {
      res.clearCookie('jwt');
      res.status(403).send('Token invalide')
    }
  } else {
    next();
  }
}

const addJwtFeatures = (req, res, next) => {
  req.isAuthenticated = () => !!req.user; //boolen truc et on return l'instruction
  req.logout = () => res.clearCookie('jwt') //clef du cookie en parametre
  req.login = (user) => {
    const token = createJwtToken(user);
    res.cookie('jwt', token);
  }
  next();
}

app.use(extractUserFromToken);
app.use(addJwtFeatures);