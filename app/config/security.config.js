exports.ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).json({message: `Vous n'êtes pas autorisé à rejoindre cette page`});
  }
}