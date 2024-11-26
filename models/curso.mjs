import { DataTypes } from "sequelize";
import { conn } from '../db/conn.mjs';

export const Curso = conn.define('Curso', {
    nome:{
        type: DataTypes.STRING,
        required: true
    },
    descricao:{
        type: DataTypes.STRING,
        required: true,
    },
})