import { Aluno } from '../models/aluno.mjs';
import { Turma } from '../models/turma.mjs';
import { Curso } from '../models/curso.mjs';
import { col } from 'sequelize';

export class AlunoController {


    static async lista_alunos(req,res){
        const alunos = await Aluno.findAll({attributes: [
            'id',
            'nome',
            'sobrenome'
        ],
    include: [
        {
            model: Turma,
            attributes:[],
        },
        {
            model: Curso,
            attributes: ['nome']
        }
    ],
    group: [col('id'),col('nome'),col('sobrenome')],
    raw: true
});
    console.log(alunos);
        res.render('alunos/lista_alunos');
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
}