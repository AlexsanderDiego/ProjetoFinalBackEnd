import { Router } from "express";
import { prisma } from "../config/db.js";

const linksRoutes = Router();

const selectFields = {
  id: true,
  url: true,
  titulo: true,
  usuariosId: true,
};

//Retornando todos os links
linksRoutes.get("/links", async (req, res) => {
  const links = await prisma.links.findMany({
    select: selectFields,
  });
  console.log(links);
  res.send(links);
});

//Retornando um único link pelo ID
linksRoutes.get("/link/:id", async (req, res) => {
  const id = Number(req.params.id);

  const link = await prisma.links.findUnique({
    where: {
      id: id,
    },
    select: selectFields,
  });

  res.send(link);
});

//Retornando os links de um usuario pelo usuariosId do usuario
linksRoutes.get("/links/usuarios/:usuariosId", async (req, res) => {
  const usuariosId = Number(req.params.usuariosId);
  const links = await prisma.links.findMany({
    where: {
      usuariosId: usuariosId,
    },
    select: selectFields,
  });

  res.send(links);
});

//Retornando os links de um unico usuario pelo nome de usuario do usuario
linksRoutes.get("/links/:user", async (req, res) => {
  const usuario = req.params.user;
  const usuarioComLinks = await prisma.usuarios.findUnique({
    where: { usuario: usuario },
        select: {
            id: true,
          nome: true,
          usuario: true,
          email: true,
          Links: {
            select: {
              url: true,
              titulo: true,
            },
          },
        },
    });

    res.send(usuarioComLinks);
  });


//Adicionando Link
linksRoutes.post("/cadastrarlinks", async (req, res) => {
  const link = req.body;

  const linkCadastrado = await prisma.links.create({
    data: link,
  });

  res.status(201).send(`Link created successfully, ${linkCadastrado}`);

  console.log(linkCadastrado);
});

//Atualizando Link
linksRoutes.put("/links/:id", async (req, res) => {
  const id = Number(req.params.id);
  const link = req.body;

  const linkAtualizado = await prisma.links.update({
    where: {
      id: id,
    },
    data: link,
  });

  res.send(linkAtualizado);
});

//Deletando Link
linksRoutes.delete("/links/:id", async (req, res) => {
  const id = Number(req.params.id);

  const linkDeletado = await prisma.links.delete({
    where: {
      id: id,
    },
  });

  res.send(linkDeletado);
});

export { linksRoutes };
