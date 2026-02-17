import { abrirPPM, ImagemPPM, abrirPGM, ImagemPGM, abrirPBM, ImagemPBM } from "./fontes";

export const DeleguaModuloImagens = {
    // Classes
    ImagemPPM: {
        implementacao: ImagemPPM,
        propriedades: {
            largura: { tipo: 'número' },
            altura: { tipo: 'número' },
            pixelsMaximos: { tipo: 'número' }
        },
        metodos: {
            obterPixelRGB: {
                tipoRetorno: 'objeto',
                argumentos: [
                    { nome: 'x', tipo: 'número' },
                    { nome: 'y', tipo: 'número' }
                ]
            },
            definirPixelRGB: {
                tipoRetorno: 'vazio',
                argumentos: [
                    { nome: 'x', tipo: 'número' },
                    { nome: 'y', tipo: 'número' },
                    { nome: 'r', tipo: 'número' },
                    { nome: 'g', tipo: 'número' },
                    { nome: 'b', tipo: 'número' }
                ]
            },
            exportarTexto: {
                tipoRetorno: 'texto',
                argumentos: []
            },
            exportarBinario: {
                tipoRetorno: 'objeto',
                argumentos: []
            },
            paraTexto: {
                tipoRetorno: 'texto',
                argumentos: []
            }
        }
    },
    ImagemPGM: {
        implementacao: ImagemPGM,
        propriedades: {
            largura: { tipo: 'número' },
            altura: { tipo: 'número' },
            pixelsMaximos: { tipo: 'número' }
        },
        metodos: {
            obterPixel: {
                tipoRetorno: 'número',
                argumentos: [
                    { nome: 'x', tipo: 'número' },
                    { nome: 'y', tipo: 'número' }
                ]
            },
            definirPixel: {
                tipoRetorno: 'vazio',
                argumentos: [
                    { nome: 'x', tipo: 'número' },
                    { nome: 'y', tipo: 'número' },
                    { nome: 'valor', tipo: 'número' }
                ]
            },
            exportarTexto: {
                tipoRetorno: 'texto',
                argumentos: []
            },
            exportarBinario: {
                tipoRetorno: 'objeto',
                argumentos: []
            },
            paraTexto: {
                tipoRetorno: 'texto',
                argumentos: []
            }
        }
    },
    ImagemPBM: {
        implementacao: ImagemPBM,
        propriedades: {
            largura: { tipo: 'número' },
            altura: { tipo: 'número' },
            pixelsMaximos: { tipo: 'número' }
        },
        metodos: {
            obterPixel: {
                tipoRetorno: 'número',
                argumentos: [
                    { nome: 'x', tipo: 'número' },
                    { nome: 'y', tipo: 'número' }
                ]
            },
            definirPixel: {
                tipoRetorno: 'vazio',
                argumentos: [
                    { nome: 'x', tipo: 'número' },
                    { nome: 'y', tipo: 'número' },
                    { nome: 'valor', tipo: 'número' }
                ]
            },
            exportarTexto: {
                tipoRetorno: 'texto',
                argumentos: []
            },
            exportarBinario: {
                tipoRetorno: 'objeto',
                argumentos: []
            },
            paraTexto: {
                tipoRetorno: 'texto',
                argumentos: []
            }
        }
    },
    // Funções
    abrirPPM: {
        tipoRetorno: 'ImagemPPM',
        funcao: abrirPPM,
        argumentos: [
            {
                nome: 'caminhoArquivo',
                tipo: 'texto'
            }
        ]
    },
    abrirPGM: {
        tipoRetorno: 'ImagemPGM',
        funcao: abrirPGM,
        argumentos: [
            {
                nome: 'caminhoArquivo',
                tipo: 'texto'
            }
        ]
    },
    abrirPBM: {
        tipoRetorno: 'ImagemPBM',
        funcao: abrirPBM,
        argumentos: [
            {
                nome: 'caminhoArquivo',
                tipo: 'texto'
            }
        ]
    }
};
