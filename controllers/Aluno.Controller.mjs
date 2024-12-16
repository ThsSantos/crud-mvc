import { Aluno } from '../models/aluno.mjs';
import { Turma } from '../models/turma.mjs';
import { Curso } from '../models/curso.mjs';
import { where } from 'sequelize';

export class AlunoController {


    static async lista_alunos(req,res){
        const alunos = await Aluno.findAll({raw: true});
        const turmas = await Turma.findAll({raw: true, include:{ model: Curso, attributes: ['nome'], required:true}});

        alunos.forEach((dados)=>{
            
            turmas.forEach((info)=>{
                if(dados.TurmaId==info.id){
                    dados.Curso = info['Curso.nome'];
                }

                
            })
        })


  
        res.render('alunos/lista_alunos', {alunos});
    }

    static async detalhes_aluno(req,res){

        const id = req.params.id;

        const aluno = await Aluno.findOne({raw:true, where:{id:id}});

        const turmas = await Turma.findAll({raw: true, include:{ model: Curso, attributes: ['nome'], required:true}});

        
            
            turmas.forEach((info)=>{
                if(aluno.TurmaId==info.id){
                    aluno.Curso = info['Curso.nome'];
                }

                
            })


        console.log(aluno);

        res.render('alunos/detalhes_alunos', {aluno});


    }

    static async form_aluno(req,res){
        const turma = await Turma.findAll({raw: true, include:{ model: Curso, attributes: ['nome'], required:true}});
        console.log(turma);
        res.render('alunos/form_aluno', {turma});
    }

    static async cadastro_aluno(req,res){
        
        const nome = req.body.nome;
        const sobrenome = req.body.sobrenome;
        const cpf = req.body.cpf;
        const dataNas = req.body.dataNas;
        const celular = req.body.celular;
        const email = req.body.email;
        const TurmaId = req.body.curso;

        const aluno = {
            nome,
            sobrenome,
            cpf,
            dataNas,
            celular,
            email,
            TurmaId
        }

        console.log(aluno);

        await Aluno.create(aluno);

        res.redirect('/alunos/formAluno');
    }

    static async formUpdate_aluno(req,res){
        const id = req.params.id;
        const turma = await Turma.findAll({raw: true, include:{ model: Curso, attributes: ['nome'], required:true}});
        const aluno = await Aluno.findOne({raw:true, where:{id:id}});

        turma.forEach((dados)=>{
            if(aluno.TurmaId==dados.id){
                aluno.curso = dados['Curso.nome'];
            }
        })

        let filterTurma = turma.filter(array => array.id != aluno.TurmaId);
        console.log(aluno);
        console.log(filterTurma);

        res.render('alunos/formUpdate_aluno', {aluno, filterTurma});

    }

    static async update_aluno(req,res){

        const id = req.body.id;
        const aluno = {
            id : req.body.id,
            nome : req.body.nome,
            sobrenome : req.body.sobrenome,
            cpf: req.body.cpf,
            dataNas: req.body.dataNas,
            celular : req.body.celular,
            email : req.body.email,
            TurmaId : req.body.curso,
        }

    

        await Aluno.update(aluno,{where:{id:id}});

        res.redirect(`/alunos/detalhes/${id}`);
    }
}