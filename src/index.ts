import express, {Express} from "express";
import dotenv from "dotenv";
import UserRouter from "./routes/users.router";
import AuthRouter from "./routes/auth.router";
import CategoryRouter from "./routes/category.router";
import DocumentRouter from "./routes/document.router";
import FilesRouter from "./routes/files.router";
import QrCodeRouter from "./routes/qrcode.router";
import StatsRouter from "./routes/stats.router";
import os from "os";

dotenv.config();
import "./database/connection";
import JwtUtil from "./utils/jwt.util";
const app: Express = express();
const port = process.env.PORT || 3000;
const apiRoot = process.env.ROOT || "/api/v1";
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

app.set("view engine", "pug");
app.set("views", "public/views");

app.use(`/`, QrCodeRouter);
app.use(`${apiRoot}/auth`, AuthRouter);

app.use(JwtUtil.middleware);
app.use(`${apiRoot}/user`, UserRouter);
app.use(`${apiRoot}/category`, CategoryRouter);
app.use(`${apiRoot}/document`, DocumentRouter);
app.use(`${apiRoot}/files`, FilesRouter);
app.use(`${apiRoot}/statistic`, StatsRouter);

app.listen(port, () => {
    const hostname = os.hostname();
    console.log(`Server is running on http://${hostname}:${port}`);
});
