//services are special function anybody can use anywhere

exports.isAuth = (req, res, done) => {
  if (req.user) done();
  else res.send(401);
};

//only sends useful info and removes all extra such as password and salt
exports.sanitizeUser = (user) => {
  return { id: user.id, role: user.role };
};
