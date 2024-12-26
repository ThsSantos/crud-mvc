import { Aluno } from "../models/aluno.mjs";
import { Turma } from "../models/turma.mjs";
import { Curso } from "../models/curso.mjs";
import { Op } from "sequelize";

export class AlunoController {
  static async lista_alunos(req, res) {
    const alunos = await Aluno.findAll({ raw: true });
    const turmas = await Turma.findAll({
      raw: true,
      include: { model: Curso, attributes: ["nome"], required: true },
    });

    alunos.forEach((dados) => {
      turmas.forEach((info) => {
        if (dados.TurmaId == info.id) {
          dados.Curso = info["Curso.nome"];
        }
      });
    });

    res.render("alunos/lista_alunos", { alunos });
  }

  static async detalhes_aluno(req, res) {
    const id = req.params.id;

    const aluno = await Aluno.findOne({ raw: true, where: { id: id } });

    const turmas = await Turma.findAll({
      raw: true,
      include: { model: Curso, attributes: ["nome"], required: true },
    });

    turmas.forEach((info) => {
      if (aluno.TurmaId == info.id) {
        aluno.Curso = info["Curso.nome"];
      }
    });


    res.render("alunos/detalhes_alunos", { aluno });
  }

  static async form_aluno(req, res) {
    const turma = await Turma.findAll({
      raw: true,
      include: { model: Curso, attributes: ["nome"], required: true },
    });
    res.render("alunos/form_aluno", { turma });
  }

  static async cadastro_aluno(req, res) {
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
      TurmaId,
    };

    const turma = await Turma.findAll({
      raw: true,
      include: { model: Curso, attributes: ["nome"], required: true },
    });
    const turmaCount = await Aluno.count({ where: { TurmaId: TurmaId } });
    const turmaLimite = await Turma.findOne({
      raw: true,
      where: { id: TurmaId },
    });
    const buscaAluno = await Aluno.count({
      where: {
        [Op.and]: [{ TurmaId: TurmaId }, { cpf: cpf }],
      },
    });

    let status = false;
    let mensagem = "";


    if (turmaLimite.qtd_max == turmaCount) {
      status = true;
      mensagem = "Limite da Turma excedido";
      res.render("alunos/form_aluno", { status, mensagem, turma });
    } else if (buscaAluno > 0) {
      status = true;
      mensagem = "Aluno já cadastrado no curso";
      res.render("alunos/form_aluno", { status, mensagem, turma });
    } else {
      await Aluno.create(aluno);

      res.redirect(`/turmas/turma_alunos/${TurmaId}`);
    }
  }

  static async formUpdate_aluno(req, res) {
    const id = req.params.id;
    const turma = await Turma.findAll({
      raw: true,
      include: { model: Curso, attributes: ["nome"], required: true },
    });
    const aluno = await Aluno.findOne({ raw: true, where: { id: id } });

    turma.forEach((dados) => {
      if (aluno.TurmaId == dados.id) {
        aluno.curso = dados["Curso.nome"];
      }
    });

    let filterTurma = turma.filter((array) => array.id != aluno.TurmaId);
    

    res.render("alunos/formUpdate_aluno", { aluno, filterTurma });
  }

  static async update_aluno(req, res) {
    const id = req.body.id;
    const aluno = {
      id: req.body.id,
      nome: req.body.nome,
      sobrenome: req.body.sobrenome,
      cpf: req.body.cpf,
      dataNas: req.body.dataNas,
      celular: req.body.celular,
      email: req.body.email,
      TurmaId: req.body.curso,
    };

    await Aluno.update(aluno, { where: { id: id } });

    res.redirect(`/alunos/detalhes/${id}`);
  }

  static async remove_aluno(req, res) {
    const id = req.params.id;

    await Aluno.destroy({ where: { id: id } });
    res.redirect("/alunos/lista");
  }

  static async busca_aluno(req, res) {
    const texto = req.body.texto;
    const campo = req.body.busca;


    if (campo == "nome") {
      const alunos = await Aluno.findAll({ raw: true, where: { nome: texto } });
      const turmas = await Turma.findAll({
        raw: true,
        include: { model: Curso, attributes: ["nome"], required: true },
      });

      alunos.forEach((dados) => {
        turmas.forEach((info) => {
          if (dados.TurmaId == info.id) {
            dados.Curso = info["Curso.nome"];
          }
        });
      });


      res.render("alunos/busca", { alunos });
    } else if (campo == "id") {
      const alunos = await Aluno.findAll({ raw: true, where: { id: texto } });
      const turmas = await Turma.findAll({
        raw: true,
        include: { model: Curso, attributes: ["nome"], required: true },
      });

      alunos.forEach((dados) => {
        turmas.forEach((info) => {
          if (dados.TurmaId == info.id) {
            dados.Curso = info["Curso.nome"];
          }
        });
      });

      res.render("alunos/busca", { alunos });
    }
  }
}
