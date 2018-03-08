module.exports = (req, res, next) => {
  if (req.session.token||req.user) {
    return next();
  } else {
    return res.status(401).send({ error: 'You must log in!' });
  }
};
