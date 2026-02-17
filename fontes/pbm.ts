import * as sistemaArquivos from 'fs';
import * as caminho from 'path';
import { Imagem } from './imagem';

/**
 * Classe para manipular imagens no formato PBM (Portable Bitmap).
 * Representa imagens preto e branco (1 bit por pixel).
 */
export class ImagemPBM extends Imagem {
    constructor(largura: number, altura: number) {
        super(largura, altura, 1);
    }

    /**
     * Exporta a imagem para formato PBM (texto)
     */
    exportarTexto(): string {
        let resultado = `P1\n`;
        resultado += `${this.largura} ${this.altura}\n`;

        for (let y = 0; y < this.altura; y++) {
            const linhas: string[] = [];
            for (let x = 0; x < this.largura; x++) {
                linhas.push(String(this.pixels[y][x]));
            }
            resultado += linhas.join(' ') + '\n';
        }

        return resultado;
    }

    /**
     * Exporta a imagem para formato PBM (binário)
     */
    exportarBinario(): Buffer {
        const partes: Buffer[] = [];

        // Cabeçalho PBM binário
        partes.push(Buffer.from('P4\n'));
        partes.push(Buffer.from(`${this.largura} ${this.altura}\n`));

        // Dados dos pixels (compactados em bits)
        const bytesPerRow = Math.ceil(this.largura / 8);
        const pixelBuffer = Buffer.alloc(this.altura * bytesPerRow);
        let bufferIdx = 0;

        for (let y = 0; y < this.altura; y++) {
            let byte = 0;
            let bitIdx = 0;

            for (let x = 0; x < this.largura; x++) {
                const pixel = this.pixels[y][x];
                if (pixel === 1) {
                    byte |= (1 << (7 - bitIdx));
                }
                bitIdx++;

                if (bitIdx === 8 || x === this.largura - 1) {
                    pixelBuffer[bufferIdx++] = byte;
                    byte = 0;
                    bitIdx = 0;
                }
            }
        }
        partes.push(pixelBuffer);

        return Buffer.concat(partes);
    }

    paraTexto(): string {
        return `Imagem PBM ${this.largura}x${this.altura} (preto e branco)`;
    }
}

/**
 * Abre um arquivo PBM
 */
export function abrirPBM(
    interpretador: { diretorioBase: string },
    caminhoArquivo: string
): ImagemPBM {
    const caminhoResolvido = resolveCaminhoComBaseInterpretador(
        interpretador.diretorioBase,
        caminhoArquivo
    );

    const conteudo = sistemaArquivos.readFileSync(caminhoResolvido, 'utf-8');
    return parserPBM(conteudo);
}

/**
 * Parser para formatos PBM
 */
function parserPBM(conteudo: string): ImagemPBM {
    const linhas = conteudo.split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('#'));

    if (!linhas[0].match(/P[14]/)) {
        throw new Error('Arquivo não é um PBM válido. Deve começar com P1 ou P4.');
    }

    const [largura, altura] = linhas[1].split(/\s+/).map(Number);

    const imagem = new ImagemPBM(largura, altura);

    // Parser simplificado para P1 (texto)
    if (linhas[0] === 'P1') {
        const valores = linhas.slice(2).join(' ').split(/\s+/).map(Number);
        let idx = 0;
        for (let y = 0; y < altura; y++) {
            for (let x = 0; x < largura; x++) {
                imagem.definirPixel(x, y, valores[idx++]);
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
