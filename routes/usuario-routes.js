import { Router } from "express";
import bcrypt from "bcrypt"; // Adicionando o encript de senha
import { prisma } from "../config/db.js";

const usuarioRoutes = Router();

const selectFields = {
  id: true,
  email: true,
  usuario: true,
  nome: true,
};

//Retornando todos os usuários
usuarioRoutes.get("/usuarios", async (req, res) => {
  const usuarios = await prisma.usuarios.findMany({
    select: selectFields,
  });

  res.send(usuarios);
});

//Retornando um único usuário pelo ID
usuarioRoutes.get("/usuarios/:id", async (req, res) => {
  const id = Number(req.params.id);

  const usuario = await prisma.usuarios.findUnique({
    where: {
      id: id,
    },
    select: selectFields,
  });

  res.send(usuario);
});

//Retornando um único usuário pelo usuario
usuarioRoutes.get("/:usuario", async (req, res) => {
  const usuario = req.params.usuario;
  const usuarios = await prisma.usuarios.findUnique({
    where: {
      usuario: usuario,
    },
    select: selectFields,
  });

  res.send(usuarios);
});

//Adicionando Usuario
usuarioRoutes.post("/cadastrarusuarios", async (req, res) => {
  try {
    const user = req.body;

    const senhaEncriptada = await bcrypt.hash(user.senha, 10);
    user.senha = senhaEncriptada;
    const usuario = await prisma.usuarios.create({
      data: user,
    });

    res.status(201).send("User created successfully");
    console.log(usuario);
  } catch (error) {
    res.status(400).send({ error: error.sqlMessage });
  }
});

//Atualizando Usuario
usuarioRoutes.put("/atualizarusuarios/:id", async (req, res) => {
  const id = Number(req.params.id);
  const usuario = req.body;
  delete usuario.senha;
  const usuarioAtualizado = await prisma.usuarios.update({
    where: {
      id: id,
    },
    data: usuario,
  });

  res.send(usuarioAtualizado);
});

//Atualizando Senha
usuarioRoutes.put("/atualizarsenha/:id", async (req, res) => {
  const id = Number(req.params.id);
  const senha = req.body;

  const senhaEncriptada = await bcrypt.hash(senha.senha, 10);
  senha.senha = senhaEncriptada;

  const senhaAtualizada = await prisma.usuarios.update({
    where: {
      id: id,
    },
    data: senha,
  });

  res.send(senhaAtualizada);
});

//Deletando Usuario
usuarioRoutes.delete("/apagarusuario/:id", async (req, res) => {
  const id = Number(req.params.id);

  const usuarioDeletado = await prisma.usuarios.delete({
    where: {
      id: id,
    },
  });

  res.send(usuarioDeletado);
});

export { usuarioRoutes };
