import express from 'express';
import exhbs from 'express-handlebars';

const app = express();

app.engine('handlebars', exhbs.engine());
app.set('views', 'handlebars');
