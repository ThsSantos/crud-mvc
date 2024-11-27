import { DataTypes } from "sequelize";
import { conn } from "../db/conn.mjs";
import { Curso } from "./curso.mjs";

export const Turma = conn.define('Turma', {
    qtd_max:{
        type: DataTypes.INTEGER,
        required: true
    },
    dataInicio: {
        type: DataTypes.DATEONLY,
        required: true
    },
    dataFim:{
        type: DataTypes.DATEONLY,
        required: true
    },
})

Curso.hasMany(Turma);
Turma.belongsTo(Curso);