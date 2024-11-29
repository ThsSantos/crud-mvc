import { DataTypes } from "sequelize";
import { conn } from "../db/conn.mjs";
import { Turma } from "./turma.mjs";

export const Aluno = conn.define('Aluno', {
    nome:{
        type: DataTypes.STRING,
        required: true,
    },

    sobrenome:{
        type: DataTypes.STRING,
        required: true,
    },
    cpf:{
        type:DataTypes.STRING,
        required: true,
    },

    dataNas:{
        type: DataTypes.DATEONLY,
        required: true,
    },
    celular:{
        type: DataTypes.STRING,
        required: true,
    },
    email:{
        type: DataTypes.STRING,
        required: true,
    }
})


Turma.hasMany(Aluno);
Aluno.belongsTo(Turma);