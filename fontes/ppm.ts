import * as sistemaArquivos from 'fs';
import * as caminho from 'path';
import { Imagem } from './imagem';

/**
 * Classe para manipular imagens no formato PPM (Portable Pixmap).
 * Suporta imagens coloridas com 3 canais (RGB).
 */
export class ImagemPPM extends Imagem {
    pixelsRGB: Array<Array<{ r: number; g: number; b: number }>>;

    constructor(largura: number, altura: number, pixelsMaximos: number = 255) {
        super(largura, altura, pixelsMaximos);
        this.pixelsRGB = Array(altura).fill(null).map(() => 
            Array(largura).fill(null).map(() => ({ r: 0, g: 0, b: 0 }))
        );
    }

    /**
     * Obtém um pixel RGB em coordenadas (x, y)
     */
    obterPixelRGB(x: number, y: number): { r: number; g: number; b: number } {
        if (x < 0 || x >= this.largura || y < 0 || y >= this.altura) {
            throw new Error(`Coordenadas inválidas: (${x}, ${y})`);
        }
        return this.pixelsRGB[y][x];
    }

    /**
     * Define um pixel RGB em coordenadas (x, y)
     */
    definirPixelRGB(x: number, y: number, r: number, g: number, b: number): void {
        if (x < 0 || x >= this.largura || y < 0 || y >= this.altura) {
            throw new Error(`Coordenadas inválidas: (${x}, ${y})`);
        }
        const validaComponente = (valor: number) => {
            if (valor < 0 || valor > this.pixelsMaximos) {
                throw new Error(`Valor de componente inválido: ${valor}. Deve estar entre 0 e ${this.pixelsMaximos}`);
            }
        };
        validaComponente(r);
        validaComponente(g);
        validaComponente(b);
        
        this.pixelsRGB[y][x] = { r, g, b };
    }

    /**
     * Exporta a imagem para formato PPM (texto)
     */
    exportarTexto(): string {
        let resultado = `P3\n`;
        resultado += `${this.largura} ${this.altura}\n`;
        resultado += `${this.pixelsMaximos}\n`;

        for (let y = 0; y < this.altura; y++) {
            const linhas: string[] = [];
            for (let x = 0; x < this.largura; x++) {
                const pixel = this.pixelsRGB[y][x];
                linhas.push(`${pixel.r} ${pixel.g} ${pixel.b}`);
            }
            resultado += linhas.join(' ') + '\n';
        }

        return resultado;
    }

    /**
     * Exporta a imagem para formato PPM (binário)
     */
    exportarBinario(): Buffer {
        const partes: Buffer[] = [];

        // Cabeçalho PPM binário
        partes.push(Buffer.from('P6\n'));
        partes.push(Buffer.from(`${this.largura} ${this.altura}\n`));
        partes.push(Buffer.from(`${this.pixelsMaximos}\n`));

        // Dados dos pixels
        const pixelBuffer = Buffer.alloc(this.largura * this.altura * 3);
        let idx = 0;
        for (let y = 0; y < this.altura; y++) {
            for (let x = 0; x < this.largura; x++) {
                const pixel = this.pixelsRGB[y][x];
                pixelBuffer[idx++] = pixel.r;
                pixelBuffer[idx++] = pixel.g;
                pixelBuffer[idx++] = pixel.b;
            }
        }
        partes.push(pixelBuffer);

        return Buffer.concat(partes);
    }

    paraTexto(): string {
        return `Imagem PPM ${this.largura}x${this.altura} (máximo de cor: ${this.pixelsMaximos})`;
    }
}

/**
 * Abre um arquivo PPM
 */
export function abrirPPM(
    interpretador: { diretorioBase: string },
    caminhoArquivo: string
): ImagemPPM {
    const caminhoResolvido = resolveCaminhoComBaseInterpretador(
        interpretador.diretorioBase,
        caminhoArquivo
    );

    const conteudo = sistemaArquivos.readFileSync(caminhoResolvido, 'utf-8');
    return parserPPM(conteudo);
}

/**
 * Parser para formatos PPM
 */
function parserPPM(conteudo: string): ImagemPPM {
    const linhas = conteudo.split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('#'));

    if (!linhas[0].match(/P[36]/)) {
        throw new Error('Arquivo não é um PPM válido. Deve começar com P3 ou P6.');
    }

    const [largura, altura] = linhas[1].split(/\s+/).map(Number);
    const pixelsMaximos = Number(linhas[2]);

    const imagem = new ImagemPPM(largura, altura, pixelsMaximos);

    // Parser simplificado para P3 (texto)
    if (linhas[0] === 'P3') {
        const valores = linhas.slice(3).join(' ').split(/\s+/).map(Number);
        let idx = 0;
        for (let y = 0; y < altura; y++) {
            for (let x = 0; x < largura; x++) {
                const r = valores[idx++];
                const g = valores[idx++];
                const b = valores[idx++];
                imagem.definirPixelRGB(x, y, r, g, b);
            }
        }
    }

    return imagem;
}

function resolveCaminhoComBaseInterpretador(
    diretorioBase: string,
    caminhoOuArquivo: string
): string {
    if (caminhoOuArquivo.startsWith('.')) {
        return caminho.join(diretorioBase, caminhoOuArquivo);
    }
    return caminhoOuArquivo;
}
