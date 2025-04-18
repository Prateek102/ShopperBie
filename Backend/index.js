const express = require("express");
const server = express();
const mongoose = require("mongoose");
const cors = require("cors");
const { createProduct } = require("./controller/Product");
const productRouter = require("./routes/Products");
const brandRouter = require("./routes/Brands");
const categoryRouter = require("./routes/Categories");
const userRouter = require("./routes/User");
const authRouter = require("./routes/Auth");
const cartRouter = require("./routes/Cart");
const orderRouter = require("./routes/Order");
const session = require("express-session");
const passport = require("passport");
const crypto = require("crypto");
var jwt = require("jsonwebtoken");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const { User } = require("./model/User");
const { sanitizeUser, isAuth } = require("./services/common");

//JWT OPTIONS
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "SECRET_KEY"; //this should not be in code. It encrypts JWT token

//middleware

server.use(
  session({
    secret: "keyboard cat",
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
  })
);
server.use(passport.authenticate("session"));

server.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  })
);
server.use(express.json()); //to parse req.body ---> expecting json body from frontend
server.use("/products", isAuth, productRouter.router); //route middleware don't go forward until their next is called. Can also use JWT token
server.use("/brands", brandRouter.router);
server.use("/categories", categoryRouter.router);
server.use("/users", userRouter.router);
server.use("/auth", authRouter.router);
server.use("/cart", cartRouter.router);
server.use("/orders", orderRouter.router);
main().catch((err) => console.log(err));

// Passport Strategy
// done(error,value to be returned,messg)
passport.use(
  "local",
  new LocalStrategy(async function (username, password, done) {
    try {
      // by default passport uses username
      const user = await User.findOne({ email: username }).exec();
      if (!user) {
        done(null, false, { message: "invalid credential" });
      }
      crypto.pbkdf2(
        password,
        user.salt,
        310000,
        32,
        "sha256",
        async function (err, hashedPassword) {
          if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
            return done(null, false, { message: "invalid credential" });
          }
          done(null, sanitizeUser(user)); // this line sends to serialize
        }
      );
    } catch (err) {
      done(err);
    }
  })
);

passport.use(
  "jwt",
  new JwtStrategy(opts, function (jwt_payload, done) {
    User.findOne({ id: jwt_payload.sub }, function (err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
      }
    });
  })
);

//this creates session variable req.user on being called from callback
passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, { id: user.id, role: user.role });
  });
});

//this changes session variable req.user when called from authorized request
passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");
  console.log("db started");
}

// helper function. Instead JWT token used
// function isAuth(req, res, done) {
//   if (req.user) next();
//   else res.send(401);
// }

server.get("/", (req, res) => {
  res.json({ status: "success" });
});

server.post("/products", createProduct);

server.listen(8080, () => {
  console.log("server started");
});
