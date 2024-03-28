import express from "express";
import cors from "cors";
import 'dotenv/config';

const server = express();

server.use(cors());
server.use(express.json());

import home from "./routes/home.js";
// import server from "./config/server.js";
import { authLogin } from "./routes/auth-login-routes.js";
import { usuarioRoutes } from "./routes/usuario-routes.js";
import { linksRoutes } from "./routes/links-routes.js";

server.use(home);
server.use(authLogin);
server.use(usuarioRoutes);
server.use(linksRoutes);

server.listen(3000, () => {
    console.log("Servidor está rodando");
  });