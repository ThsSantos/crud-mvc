import express from 'express';
import { AlunoController } from '../controllers/Aluno.Controller.mjs';

export const alunosRoutes = express.Router();

alunosRoutes.get('/', AlunoController.home);

