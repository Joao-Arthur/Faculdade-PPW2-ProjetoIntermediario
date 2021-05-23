import express from 'express';
import parser from 'node-html-parser';
import fetch from 'node-fetch';
const router = express.Router();

router.get('/healthcheck', (req, res) => {
    res.sendStatus(200);
});

router.get('/cursosgraduacao', (req, res) => {
    const curso = req.query.curso?.toString();
    if (!curso) return res.send([]);

    fetch('http://matriculas.unesc.net/graduacao')
        .then(resposta => resposta.text())
        .then(resposta => {
            const divCursos = parser(resposta).querySelectorAll('.curso__item');
            const timestamp = Date.now();

            const cursos = divCursos
                .map(curso => ({
                    nome: curso['_attrs']['data-title'],
                    tipo: curso['_attrs']['data-type'],
                    timestamp
                }))
                .filter(({ nome }) =>
                    nome.toLowerCase().includes(curso.toLowerCase())
                );

            res.send(cursos);
        });
});

export default router;
