import { Imagem } from './imagem';
import { lerConteudoImagem } from './leitor-imagem';

/**
 * Classe para manipular imagens no formato PGM (Portable Graymap).
 * Representa imagens em escala de cinza com um único canal.
 */
export class ImagemPGM extends Imagem {
    constructor(largura: number, altura: number, pixelsMaximos: number = 255) {
        super(largura, altura, pixelsMaximos);
    }

    /**
     * Exporta a imagem para formato PGM (texto)
     */
    exportarTexto(): string {
        let resultado = `P2\n`;
        resultado += `${this.largura} ${this.altura}\n`;
        resultado += `${this.pixelsMaximos}\n`;

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
     * Exporta a imagem para formato PGM (binário)
     */
    exportarBinario(): Buffer {
        const partes: Buffer[] = [];

        // Cabeçalho PGM binário
        partes.push(Buffer.from('P5\n'));
        partes.push(Buffer.from(`${this.largura} ${this.altura}\n`));
        partes.push(Buffer.from(`${this.pixelsMaximos}\n`));

        // Dados dos pixels
        const pixelBuffer = Buffer.alloc(this.largura * this.altura);
        let idx = 0;
        for (let y = 0; y < this.altura; y++) {
            for (let x = 0; x < this.largura; x++) {
                pixelBuffer[idx++] = this.pixels[y][x];
            }
        }
        partes.push(pixelBuffer);

        return Buffer.concat(partes);
    }

    paraTexto(): string {
        return `Imagem PGM ${this.largura}x${this.altura} (máximo de cor: ${this.pixelsMaximos})`;
    }
}

/**
 * Abre um arquivo PGM
 */
export async function abrirPGM(
    interpretador: { diretorioBase: string },
    caminhoArquivo: string
): Promise<ImagemPGM> {
    const conteudo = await lerConteudoImagem(interpretador, caminhoArquivo);
    return parserPGM(conteudo);
}

/**
 * Parser para formatos PGM
 */
function parserPGM(conteudo: string): ImagemPGM {
    const linhas = conteudo.split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('#'));

    if (!linhas[0].match(/P[25]/)) {
        throw new Error('Arquivo não é um PGM válido. Deve começar com P2 ou P5.');
    }

    const [largura, altura] = linhas[1].split(/\s+/).map(Number);
    const pixelsMaximos = Number(linhas[2]);

    const imagem = new ImagemPGM(largura, altura, pixelsMaximos);

    // Parser simplificado para P2 (texto)
    if (linhas[0] === 'P2') {
        const valores = linhas.slice(3).join(' ').split(/\s+/).map(Number);
        let idx = 0;
        for (let y = 0; y < altura; y++) {
            for (let x = 0; x < largura; x++) {
                imagem.definirPixel(x, y, valores[idx++]);
            }
        }
    }

    return imagem;
}
