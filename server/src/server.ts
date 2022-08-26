import express from 'express';
import cors from 'cors';
import { routes } from './routes';

const app = express();

// controle de segurança no backend para negar frontends inadequados a acessar as informações do backend
app.use(cors());

// informando ao express se existe algum formato json, para demonstrar na requisição(req) | Middleware
app.use(express.json());

// importando as rotas
app.use(routes);

// rodando o server na porta 3333 e mostrando no terminal
app.listen(3333, () =>{
    console.log('HTTP server running');
});
