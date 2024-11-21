
export class AlunoController {

    static home(req,res){
        res.render('alunos/home');
    }

    static lista_alunos(req,res){
        res.render('alunos/lista_alunos');
    }
}