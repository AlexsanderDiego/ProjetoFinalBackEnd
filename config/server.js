import express from "express";
import cors from "cors";
import "dotenv/config";

const server = express();

server.use(
  cors({
    origin: "https://links.alexdiego.com.br",
  })
);
server.use(express.json());

server.listen(3000, () => {
  console.log("Servidor está rodando");
});

export default server;
