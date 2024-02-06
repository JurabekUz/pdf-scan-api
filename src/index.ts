import express, {Express, Request, Response} from "express";
import dotenv from "dotenv";
import UserRouter from "./routes/users.router";
import AuthRouter from "./routes/auth.router";
import CategoryRouter from "./routes/category.router";
import DocumentRouter from "./routes/document.router";
import FilesRouter from "./routes/files.router";
import QrCodeRouter from "./routes/qrcode.router";

dotenv.config();
import "./database/connection";
import JwtUtil from "./utils/jwt.util";
import QrcodeController from "./controllers/qrcode.controller";
import path from "node:path";

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

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
