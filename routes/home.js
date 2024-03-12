import { Router } from "express";

const home = Router();

home.get("/", (req, res) => {
  res.send("<h1>Home</h1>"
  + "<p>Olá, seja bem-vindo ao meu servidor!</p>"
  + "<p>Para acessar a página de Login, vá para <a href='/auth/login'><button>Login</button></a></p>"
  );
});

export default home;
