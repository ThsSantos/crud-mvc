import { Curso } from '../models/curso.mjs';
import { Turma } from '../models/turma.mjs';
import { Aluno } from '../models/aluno.mjs';

export class TurmaController{
    static async lista_turmas(req,res){
       let quantidade = await [];
        const turmas = await Turma.findAll({ raw: true, include:{ model: Curso, attributes: ['nome'], required: true}});

    //   turmas.forEach(async element => {
    //         console.log(element.id);
    //         const count = await Aluno.count({where: {TurmaId:element.id}})
    //         console.log(count);
    //         quantidade.push(count);
    //     });

        
        res.render('turmas/lista_turmas', {turmas});
    }

    static async form_turma(req,res){
        
        const cursos = await Curso.findAll({raw:true});

        res.render('turmas/form_turmas', {cursos});
    }

    static async cadastro_turma(req,res){
        let status = false;
        const qtd = parseInt(req.body.qtd);
        const dataInicio = req.body.dataInicio;
        const dataFim = req.body.dataFim;
        const curso = parseInt(req.body.curso);

        const num_row = await Turma.findAll({raw: true, where:{ dataInicio:dataInicio, CursoId:curso } });
        const cursos = await Curso.findAll({raw:true});
        // console.log(num_row.length);

        if(num_row.length==0){
            const turma = {
                qtd_max: qtd,
                dataInicio: dataInicio,
                dataFim: dataFim,
                CursoId: curso,
                
            }

            await Turma.create(turma);

            res.redirect('/turmas/form_turmas');
        }else{
            status = true;
            res.render('turmas/form_turmas', {cursos, status});
        }

        

    }
}