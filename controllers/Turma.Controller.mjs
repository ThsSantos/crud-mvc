import { Curso } from '../models/curso.mjs';
import { Turma } from '../models/turma.mjs';
import { Aluno } from '../models/aluno.mjs';
import { fn,col } from 'sequelize';


export class TurmaController{
    static async lista_turmas(req,res){
    
        const turmas = await Turma.findAll({
           attributes: [
            'id',
            'qtd_max',
            'dataInicio',
            'dataFim',
            [fn('COUNT', col('alunos.Turmaid')), 'qtdAluno']
           ],
           include: [
            {
                model: Curso,
                attributes: ['nome'],
                required: true
            },
            {
                model: Aluno,
                attributes: []
            }
           ],
           group: [col('id'), col('qtd_max'),col('dataInicio'),col('dataFim')],
           raw:true
        });


        
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

    static async lista_turmaAlunos(req,res){
        const id = req.params.id;

        const turma = await Turma.findOne({raw: true, include:{ model: Curso, attributes: ['nome'], required:true}, where:{id:id}});
        const alunos = await Aluno.findAll({raw: true, where:{TurmaId:id}, order:[['nome', 'ASC']]});

        res.render('turmas/turma_alunos', {alunos, turma});

    }

    static async FormUpdate_turma(req,res){
        const id = req.params.id;

        const turma = await Turma.findOne({raw: true, include:{ model: Curso, attributes: ['id','nome'], required:true}, where:{id:id}});
        const cursos = await Curso.findAll({raw:true});


        res.render('turmas/formUpdate_turma', {turma, cursos});
    }

    static async update_turma(req,res){
        const id = parseInt(req.body.id);
        const qtd = parseInt(req.body.qtd);
        const dataInicio = req.body.dataInicio;
        const dataFim = req.body.dataFim;
        const curso = parseInt(req.body.curso);

        const turma = {
            id: id,
            qtd_max: qtd,
            dataInicio: dataInicio,
            dataFim: dataFim,
            CursoId: curso,
            
        }

        await Turma.update(turma,{where:{id:id}});

        res.redirect('/turmas/lista');
    }

    static async turma_warn(req,res){

        const id = req.params.id;

        const turma = await Turma.findOne({raw: true, include:{ model: Curso, attributes: ['nome'], required:true}, where:{id:id}});


        res.render('turmas/turma_warn', {turma});
    }

    static async delete_turma(req,res){

        const id = req.params.id;

        Turma.destroy({where:{id:id}});

        res.redirect('/turmas/lista');

    }
}