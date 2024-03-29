import PGSimple from "connect-pg-simple";
import session from "express-session";
import { nanoid } from "nanoid";
import { db } from "../db/index.js";
const PGSession = PGSimple(session);
const sessionMiddleware = session({
    store: new PGSession({ pool: db, createTableIfMissing: true }),
    secret: process.env.SESSION_SECRET || "degenvsdegen",
    resave: false,
    saveUninitialized: false,
    name: "degen",
    proxy: true,
    cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        secure: 'auto',
        httpOnly: false,
        sameSite: "none"
    },
    genid: function () {
        return nanoid(21);
    }
});
export default sessionMiddleware;
