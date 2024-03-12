import express from "express";
import cors from "cors";

const server = express();

server.use(cors());
server.use(express.json());

server.listen(3000, () => {
  console.log("Servidor está rodando em http://localhost:3000/");
});

export default server;
