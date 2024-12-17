import express from 'express';
import { AlunoController } from '../controllers/Aluno.Controller.mjs';

export const alunosRoutes = express.Router();

alunosRoutes.get('/lista', AlunoController.lista_alunos);
alunosRoutes.get('/formAluno', AlunoController.form_aluno);
alunosRoutes.post('/cadastroAluno', AlunoController.cadastro_aluno);
alunosRoutes.get('/detalhes/:id', AlunoController.detalhes_aluno);
alunosRoutes.get('/formUpdate/:id', AlunoController.formUpdate_aluno);
alunosRoutes.post('/alunoUpdate', AlunoController.update_aluno);
alunosRoutes.get('/deleteAluno/:id', AlunoController.remove_aluno);

