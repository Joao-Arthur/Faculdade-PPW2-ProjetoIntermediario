export default class BandaBuilder {
    private nome?: string;
    private posicaoTop100?: number;
    private cidadeDeOrigem?: string;
    private regiaoDeOrigem?: string;
    private anoDeOrigem?: number;
    private albumMaisPopular?: string;
    private discosVendidosNosEUA?: number;
    private visualizacoesAnuaisNaWikipedia?: number;

    setNome(nome: string) {
        this.nome = nome;
        return this;
    }

    setPosicaoTop100(posicaoTop100: number) {
        this.posicaoTop100 = posicaoTop100;
        return this;
    }

    setOrigem(origem: string) {
        const [cidadeDeOrigem, regiaoDeOrigem, anoDeOrigem] = origem
            .replace('early', '')
            .split(/, | in /);
        this.cidadeDeOrigem = cidadeDeOrigem;
        this.regiaoDeOrigem = regiaoDeOrigem;
        this.anoDeOrigem = parseInt(anoDeOrigem, 10);
        return this;
    }

    setDiscosVendidosNosEUA(discosVendidosNosEUA: string) {
        this.discosVendidosNosEUA = parseFloat(discosVendidosNosEUA) * 1000000;
        return this;
    }

    setAlbumMaisPopular(albumMaisPopular: string) {
        this.albumMaisPopular = albumMaisPopular;
        return this;
    }

    setVisualizacoesAnuaisNaWikipedia(visualizacoesAnuaisNaWikipedia: string) {
        this.visualizacoesAnuaisNaWikipedia = Number(
            visualizacoesAnuaisNaWikipedia.replace(/,/g, '')
        );
        return this;
    }

    build() {
        return {
            nome: this.nome,
            posicaoTop100: this.posicaoTop100,
            cidadeDeOrigem: this.cidadeDeOrigem,
            regiaoDeOrigem: this.regiaoDeOrigem,
            anoDeOrigem: this.anoDeOrigem,
            discosVendidosNosEUA: this.discosVendidosNosEUA,
            albumMaisPopular: this.albumMaisPopular,
            visualizacoesAnuaisNaWikipedia: this.visualizacoesAnuaisNaWikipedia
        };
    }
}
