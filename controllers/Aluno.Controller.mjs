import { Aluno } from '../models/aluno.mjs';
import { Turma } from '../models/turma.mjs';
import { Curso } from '../models/curso.mjs';

export class AlunoController {


    static lista_alunos(req,res){
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