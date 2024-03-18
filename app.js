import home from "./routes/home.js";
import server from "./config/server.js";
import cors from "cors";
import { authLogin } from "./routes/auth-login-routes.js";
import { usuarioRoutes } from "./routes/usuario-routes.js";
import { linksRoutes } from "./routes/links-routes.js";

server.use(cors)
server.use(home);
server.use(authLogin);
server.use(usuarioRoutes);
server.use(linksRoutes);