import express from 'express';
import exhbs from 'express-handlebars';
import { alunosRoutes } from './routes/alunos.Routes.mjs';
import { turmaRoutes } from './routes/turmas.Routes.mjs';
import { cursoRoutes } from './routes/cursos.Routes.mjs';
import { conn } from './db/conn.mjs';

const app = express();

app.engine('handlebars', exhbs.engine());
app.set('view engine', 'handlebars');
app.use(express.static('public'));



app.use('/alunos', alunosRoutes);
app.use('/turmas', turmaRoutes);
app.use('/cursos', cursoRoutes);

app.get('/', (req, res)=>{
    res.render('home');
})

conn.sync().then(()=>{
    app.listen(3000);
}).catch((err)=>console.log(err));
