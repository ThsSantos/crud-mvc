import { Curso } from '../models/curso.mjs';

export class TurmaController{
    static lista_turmas(req,res){
        res.render('turmas/lista_turmas');
    }

    static async form_turma(req,res){
        
        const cursos = await Curso.findAll({raw:true});

        res.render('turmas/form_turmas', {cursos});
    }
}