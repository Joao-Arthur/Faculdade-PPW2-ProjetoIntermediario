import express from 'express';
//const express = require('express');
const axios = require('axios').default;
const parser = require('node-html-parser').parse;
const app = express();

//app.get('/', (req, res) => {
//    const query = req.query.consulta;
//    const cursos = [];
//    axios.get('http://matriculas.unesc.net/graduacao').then(resposta => {
//        const root = parser(resposta.data);
//        const divCursos = root.querySelectorAll('.curso__item');
//
//        divCursos.forEach(curso => {
//            const c = {
//                nome: curso['_attrs']['data-title'],
//                tipo: curso['_attrs']['data-type'],
//                timestamp: Date.now()
//            };
//
//            if (c.nome.toUpperCase().includes(query.toUpperCase()))
//                cursos.push(c);
//        });
//
//        res.json(cursos);
//    });
//});

app.get('*', (req, res) => {
    res.send([1, 2, 3, 4, 6, 7, 8, Date.now()]);
    //res.redirect('http://professor.venson.net.br');
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});
