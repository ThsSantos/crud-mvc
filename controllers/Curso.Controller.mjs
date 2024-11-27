import { Curso } from '../models/curso.mjs';
export class CursoController{

    
    static async lista_curso(req,res){

        const cursos = await Curso.findAll({raw:true});
        let status;
        console.log(cursos.length);
        if(cursos.length==0){
            status = false
        }else{
           status = true;
        }

        res.render('cursos/lista_cursos', {cursos, status});
    }

    static form_curso(req,res){
        res.render('cursos/form_curso');
    }

    static async cadastra_curso(req,res){
        const nome = req.body.nome.toLowerCase();
        const descricao = req.body.descricao;

        console.log(`${nome}, ${descricao}`);

        const registros = await Curso.count({raw: true, where: {nome:nome}});

        // console.log(registros);

        if(registros==0){
            const curso = {
                nome: nome,
                descricao: descricao,
            }
            await Curso.create(curso);

            res.redirect('/cursos/form_cadastro');
        }else{
            const erro = 1;
            res.render('cursos/form_curso', {erro});
        }
        
    }

}