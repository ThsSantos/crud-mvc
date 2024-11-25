import express from 'express';
import { CursoController } from '../controllers/Curso.Controller.mjs';

export const cursoRoutes = express.Router();

cursoRoutes.get('/lista', CursoController.lista_curso);