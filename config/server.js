import express from "express";
// import cors from "cors";
const cors = require('cors');
import 'dotenv/config';

const server = express();

server.use(cors());
server.use(express.json());

server.listen(3000, () => {
  console.log("Servidor está rodando");
});

export default server;
