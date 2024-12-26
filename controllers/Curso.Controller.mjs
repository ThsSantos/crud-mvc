import { Curso } from '../models/curso.mjs';
export class CursoController{

    
    static async lista_curso(req,res){

        const cursos = await Curso.findAll({raw:true});
        let status;
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


        const registros = await Curso.count({raw: true, where: {nome:nome}});


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

    static async formAltera_curso(req,res){
        const id = req.params.id;
        const curso = await Curso.findOne({raw: true, where:{id:id}});

        res.render('cursos/formAltera_curso', {curso});
    }

    static async update_curso(req,res){
        const id = req.body.id;
        const nome = req.body.nome;
        const descricao = req.body.descricao;

        const curso = {
            nome: nome,
            descricao: descricao,
        }

        Curso.update(curso,{where:{id:id}});

        res.redirect('/cursos/lista');
    }

    static async delete_warn(req,res){
        const id = req.params.id;

        const curso = await Curso.findOne({raw: true, where:{id:id}});

        res.render('cursos/curso_warn', {curso});

    }

    static async delete(req,res){
        const id = req.params.id;

        await Curso.destroy({where:{id:id}});

        res.redirect("/cursos/lista");
    }

}