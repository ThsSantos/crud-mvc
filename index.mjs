import express from 'express';
import exhbs from 'express-handlebars';
import { alunosRoutes } from './routes/alunos.Routes.mjs';
import { turmaRoutes } from './routes/turmas.Routes.mjs';
import { cursoRoutes } from './routes/cursos.Routes.mjs';
import { conn } from './db/conn.mjs';
import { Curso } from './models/curso.mjs';
import { Turma } from './models/turma.mjs';
import { Aluno } from './models/aluno.mjs';

const app = express();

app.engine('handlebars', exhbs.engine({
    helpers: {
        formatDate: (date)=>{
            const d = new Date(date);
            return d.getFullYear();
        },
    }
}));
app.set('view engine', 'handlebars');

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());


app.use('/alunos', alunosRoutes);
app.use('/turmas', turmaRoutes);
app.use('/cursos', cursoRoutes);



app.get('/', (req, res)=>{
    res.render('home');
})

conn.sync().then(()=>{
    app.listen(3000);
}).catch((err)=>console.log(err));
