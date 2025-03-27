const { User } = require("../model/User");
const crypto = require("crypto");
const { sanitizeUser } = require("../services/common");
//works on login signup related tasks

exports.createUser = async (req, res) => {
  //this user we get from API body
  const user = new User(req.body);
  try {
    //standard method to save password
    const salt = crypto.randomBytes(16); //salt is random hash password. Used to encrypt password
    crypto.pbkdf2(
      req.body.password,
      salt,
      310000,
      32,
      "sha256",
      async function (err, hashedPassword) {
        const user = new User({ ...req.body, password: hashedPassword, salt }); //in this using hashed password rather than old password
        const doc = await user.save();

        //session is not made after signup so to make it use req.login
        // first arg -> whatever we want to put in user session. second is callback for further task

        //this also called serialize user and adds to session
        req.login(sanitizeUser(doc), (err) => {
          if (err) res.status(400).json(err);
          else res.status(201).json();
        });
      }
    );
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.loginUser = async (req, res) => {
  //req.user is a special object which creates passport when user authenticated
  res.json(req.user);

  // try {
  //   const user = await User.findOne({ email: req.body.email }).exec();
  //   if (!user) {
  //     res.status(401).json({ message: "no user found" });
  //   } else if (user.password === req.body.password) {
  //     res.status(201).json({ id: user.id, role: user.role });
  //   } else res.status(401).json({ message: "invalid credential" });
  // } catch (err) {
  //   res.status(400).json(err);
  // }
};

//initially data serialized and stored in req.user then after every req we have req.user if we are authenticated
// so passport creates a session on server and we have session in req.user
exports.checkUser = async (req, res) => {
  res.json(req.user);
};
