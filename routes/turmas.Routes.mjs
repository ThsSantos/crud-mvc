import express from 'express';
import { TurmaController } from '../controllers/Turma.Controller.mjs';


export const turmaRoutes = express.Router();

turmaRoutes.get('/lista', TurmaController.lista_turmas);