import { prisma } from "../config/db.js";
import { Router } from "express";
import bcrypt from "bcrypt"; // Adicionando o encript de senha

const authLogin = Router();

authLogin.post("/auth/login", async (req, res) => {
  const { email, senha } = req.body;
  console.log("email", email);
  console.log("password", senha);

  const emailUser = await prisma.usuarios.findUnique({
    where: {
      email: email,
    },
  });
  if (!emailUser) {
    return res.json({ error: "Usuário não encontrado" });
  }
  const passwordMatch = await bcrypt.compare(senha, emailUser.senha);
  if (!passwordMatch) {
    return res.json({ error: "Senha incorreta" });
  }

  delete emailUser.senha;
  res.json(emailUser);
  console.log("Usuário logado com sucesso");
});

export { authLogin };
