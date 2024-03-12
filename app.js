import home from "./routes/home.js";
import server from "./config/server.js";
import { authLogin } from "./routes/auth-login-routes.js";
import { usuarioRoutes } from "./routes/usuario-routes.js";

server.use(home);
server.use(authLogin);
server.use(usuarioRoutes);