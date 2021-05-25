import express from 'express';
import bandas from './routes/bandas';
import cursos from './routes/cursos';
import healthcheck from './routes/healthcheck';
const PORT = process.env.PORT || 8080;
const app = express();

app.use('/healthcheck', healthcheck);
app.use('/rankingbandasderock', bandas);
app.use('/cursos', cursos);
app.use('/', (req, res) => {
    res.send({
        rotas: [
            { healthcheck: { queryParams: [] } },
            {
                rankingbandasderock: {
                    queryParams: ['ranking', 'cidade', 'regiao', 'ano']
                }
            },
            { cursos: { queryParams: ['curso'] } }
        ]
    });
});
app.use((req, res) => {
    res.sendStatus(404);
});

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});
