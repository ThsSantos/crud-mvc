import express from 'express';
import { AlunoController } from '../controllers/Aluno.Controller.mjs';

export const alunosRoutes = express.Router();

alunosRoutes.get('/lista', AlunoController.lista_alunos);
alunosRoutes.get('/formAluno', AlunoController.form_aluno);
alunosRoutes.post('/cadastroAluno', AlunoController.cadastro_aluno);

