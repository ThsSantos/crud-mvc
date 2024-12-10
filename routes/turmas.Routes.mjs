import express from 'express';
import { TurmaController } from '../controllers/Turma.Controller.mjs';


export const turmaRoutes = express.Router();

turmaRoutes.get('/lista', TurmaController.lista_turmas);
turmaRoutes.get('/form_turmas', TurmaController.form_turma);
turmaRoutes.post('/cadastro_turma', TurmaController.cadastro_turma);
turmaRoutes.get('/turma_alunos/:id', TurmaController.lista_turmaAlunos);
turmaRoutes.get('/FormUpdate_turma/:id', TurmaController.FormUpdate_turma);
turmaRoutes.post('/update_turma', TurmaController.update_turma);