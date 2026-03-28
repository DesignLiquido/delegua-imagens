import { ImagemPBM, abrirPBM } from './pbm';
import { ImagemPGM, abrirPGM } from './pgm';
import { ImagemPPM, abrirPPM } from './ppm';

const propriedadesImagem = {
    largura: { tipo: 'número' },
    altura: { tipo: 'número' },
    pixelsMaximos: { tipo: 'número' },
    pixels: { tipo: 'vetor' }
};

const metodosImagemBase = {
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
};

export const DeleguaModuloImagens = {
    // Classes
    ImagemPPM: {
        implementacao: ImagemPPM,
        propriedades: {
            ...propriedadesImagem,
            pixelsRGB: { tipo: 'vetor' }
        },
        metodos: {
            ...metodosImagemBase,
            obterPixelRGB: {
                tipoRetorno: 'dicionário',
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
            }
        }
    },
    ImagemPGM: {
        implementacao: ImagemPGM,
        propriedades: propriedadesImagem,
        metodos: metodosImagemBase
    },
    ImagemPBM: {
        implementacao: ImagemPBM,
        propriedades: {
            largura: { tipo: 'número' },
            altura: { tipo: 'número' },
            pixels: { tipo: 'vetor' }
        },
        metodos: metodosImagemBase
    },
    // Funções
    abrirPPM: {
        tipoRetorno: 'ImagemPPM',
        funcao: abrirPPM,
        argumentos: [
            { nome: 'caminhoArquivo', tipo: 'texto' }
        ]
    },
    abrirPGM: {
        tipoRetorno: 'ImagemPGM',
        funcao: abrirPGM,
        argumentos: [
            { nome: 'caminhoArquivo', tipo: 'texto' }
        ]
    },
    abrirPBM: {
        tipoRetorno: 'ImagemPBM',
        funcao: abrirPBM,
        argumentos: [
            { nome: 'caminhoArquivo', tipo: 'texto' }
        ]
    }
};
