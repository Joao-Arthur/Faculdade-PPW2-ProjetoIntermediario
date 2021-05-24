import express from 'express';
import parser from 'node-html-parser';
import fetch from 'node-fetch';
import BandaBuilder from './bandaBuilder';
const router = express.Router();

router.get('/', (req, res) => {
    const nome = req.query.nome?.toString();
    const posicaoTop100 = Number(req.query.ranking?.toString());
    const cidadeDeOrigem = req.query.cidade?.toString();
    const regiaoDeOrigem = req.query.regiao?.toString();
    const anoDeOrigem = Number(req.query.ano?.toString());

    fetch(
        'https://www.businessinsider.com/the-100-most-popular-rock-bands-of-all-time-2018-9'
    )
        .then(resposta => resposta.text())
        .then(resposta => {
            const DOMBandas =
                parser(resposta).querySelectorAll('.slide-wrapper')[0];

            const bandas = DOMBandas.querySelectorAll('.slide')
                .map((DOMBanda, i) => {
                    const nome =
                        DOMBanda.querySelector('.slide-title-text').text.split(
                            '. '
                        )[1];
                    const posicaoTop100 = 100 - i;
                    //por conta de um bug no split do node é necessário tratar o ": " depois do split
                    const [
                        origem,
                        discosVendidosNosEUA,
                        albumMaisPopular,
                        visualizacoesAnuaisNaWikipedia
                    ] = DOMBanda.querySelector('p')
                        .text.split(
                            /Formed in|All time US album sales|Most popular album|Annual Wikipedia page views/
                        )
                        .slice(1)
                        .map(propriedade => propriedade.substr(2));

                    return new BandaBuilder()
                        .setNome(nome)
                        .setPosicaoTop100(posicaoTop100)
                        .setOrigem(origem)
                        .setDiscosVendidosNosEUA(discosVendidosNosEUA)
                        .setAlbumMaisPopular(albumMaisPopular)
                        .setVisualizacoesAnuaisNaWikipedia(
                            visualizacoesAnuaisNaWikipedia
                        )
                        .build();
                })
                .filter(
                    banda =>
                        !nome ||
                        banda.nome?.toLowerCase() === nome.toLowerCase()
                )
                .filter(
                    banda =>
                        !posicaoTop100 || banda.posicaoTop100 === posicaoTop100
                )
                .filter(
                    banda =>
                        !cidadeDeOrigem ||
                        banda.cidadeDeOrigem?.toLowerCase() ===
                            cidadeDeOrigem.toLowerCase()
                )
                .filter(
                    banda =>
                        !regiaoDeOrigem ||
                        banda.regiaoDeOrigem?.toLowerCase() ===
                            regiaoDeOrigem.toLowerCase()
                )
                .filter(
                    banda => !anoDeOrigem || banda.anoDeOrigem === anoDeOrigem
                );

            res.send(bandas);
        });
});

export default router;
