import cors from "cors";
import "dotenv/config";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { INIT_TABLES, db } from "./db/index.js";
import session from "./middleware/session.js";
import routes from "./routes/index.js";
import { init as initSocket } from "./socket/index.js";
const corsConfig = {
    origin: 'https://degen-arcade-client-git-main-degenvsdegens-projects.vercel.app',
    credentials: true,
};
const app = express();
const server = createServer(app);
// database
await db.connect();
db.query(INIT_TABLES, (err) => {
    if (err) {
        console.error(err);
    }
    else {
        console.log("Tables initialized");
    }
});
// middleware
app.use(cors(corsConfig));
app.use(express.json());
app.set("trust proxy", 1);
app.use(session);
app.use("/v1", routes);
// socket.io
export const io = new Server(server, { cors: corsConfig, pingInterval: 30000, pingTimeout: 50000 });
io.use((socket, next) => {
    session(socket.request, {}, next);
});
io.use((socket, next) => {
    const session = socket.request.session;
    if (session && session.user) {
        next();
    }
    else {
        console.log("io.use: no session");
        socket.disconnect();
    }
});
initSocket();
const port = process.env.PORT || 3001;
server.listen(port, () => {
    console.log('cors issue fixef', corsConfig);
});
