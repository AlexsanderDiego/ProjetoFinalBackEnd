import { prisma } from '../config/db.js';
import { Router } from "express";
import bcrypt from "bcrypt"; // Adicionando o encript de senha

const authLogin = Router();

authLogin.post("/auth/login", async (req, res) => {
    const { usuario, senha } = req.body;
    console.log('username', usuario);
    console.log('password', senha);

    const user = await prisma.usuarios.findUnique({
        where: {
            usuario: usuario,
        },
    });
    if (!user) {
        return res.json({ error: 'Usuário não encontrado' });
    }
    const passwordMatch = await bcrypt.compare(senha, user.senha);
    if (!passwordMatch) {
        return res.json({ error: 'Senha incorreta' });
    }
    // if (senha !== user.senha) {
    //     return res.json({ error: 'Senha incorreta' });
    // }
    res.json(user);

    delete user.senha;
    // res.json(user);
    console.log(user);
    console.log('Usuário logado com sucesso');
});

export { authLogin };
