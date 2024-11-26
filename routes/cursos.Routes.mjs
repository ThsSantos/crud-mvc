import express from 'express';
import { CursoController } from '../controllers/Curso.Controller.mjs';

export const cursoRoutes = express.Router();

cursoRoutes.get('/lista', CursoController.lista_curso);
cursoRoutes.get('/form_cadastro', CursoController.form_curso);
cursoRoutes.post('/curso_cadastro', CursoController.cadastra_curso);