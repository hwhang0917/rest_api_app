import passport from "passport";
import Person from "./models/Person";
import dotenv from "dotenv";
import routes from "./routes";

dotenv.config();

passport.use(Person.createStrategy());

// Serialize and Deserialize user login cookie
passport.serializeUser(
  Person.serializeUser(function (user, done) {
    done(null, user);
  })
);
passport.deserializeUser(
  Person.deserializeUser(function (user, done) {
    done(null, user);
  })
);
