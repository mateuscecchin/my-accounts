import passport from "passport";
import { app } from "../../libs/express";
import { Strategy } from "passport-google-oauth2";
import { prisma } from "../../libs/prisma";

require("dotenv").config();

passport.use(
  new Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      callbackURL: "http://localhost:8081/auth/google/callback",
      passReqToCallback: true,
    },
    async function (
      request: any,
      accessToken: any,
      refreshToken: any,
      profile: any,
      done: any
    ) {
      const user = await prisma.user.findFirst({
        where: {
          google_id: profile.id,
        },
      });
      if (!user) {
        await prisma.user.create({
          data: {
            username: profile.displayName,
            avatar_url: profile.picture,
            email: profile.email,
            google_id: profile.id,
          },
        });
      }
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user: any, done) => {
  done(null, user);
});

app.use(
  require("express-session")({
    secret: "mysecret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/auth/protected",
    failureRedirect: "/auth/google/failure",
  })
);

app.get("/auth/protected", (req: any, res) => {
  res.redirect(`http://localhost:3000?userId=${req.user.id}`);
});

app.get("/auth/google/failure", (req, res) => {
  res.redirect("`http://localhost:3000/login");
});
