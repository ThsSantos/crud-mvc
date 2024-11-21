import express from 'express';
import exhbs from 'express-handlebars';
import { alunosRoutes } from './routes/alunos.Routes.mjs';

const app = express();

app.engine('handlebars', exhbs.engine());
app.set('view engine', 'handlebars');


app.use('/', alunosRoutes);

app.listen(3000);
