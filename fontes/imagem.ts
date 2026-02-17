/**
 * Classe base para representar imagens em diferentes formatos.
 */
export abstract class Imagem {
    largura: number;
    altura: number;
    pixelsMaximos: number;
    pixels: number[][];

    constructor(largura: number, altura: number, pixelsMaximos: number = 255) {
        this.largura = largura;
        this.altura = altura;
        this.pixelsMaximos = pixelsMaximos;
        this.pixels = Array(altura).fill(null).map(() => Array(largura).fill(0));
    }

    /**
     * Obtém um pixel em coordenadas (x, y)
     * @param x Coordenada horizontal
     * @param y Coordenada vertical
     * @returns O valor do pixel
     */
    obterPixel(x: number, y: number): number {
        if (x < 0 || x >= this.largura || y < 0 || y >= this.altura) {
            throw new Error(`Coordenadas inválidas: (${x}, ${y})`);
        }
        return this.pixels[y][x];
    }

    /**
     * Define um pixel em coordenadas (x, y)
     * @param x Coordenada horizontal
     * @param y Coordenada vertical
     * @param valor O valor do pixel
     */
    definirPixel(x: number, y: number, valor: number): void {
        if (x < 0 || x >= this.largura || y < 0 || y >= this.altura) {
            throw new Error(`Coordenadas inválidas: (${x}, ${y})`);
        }
        if (valor < 0 || valor > this.pixelsMaximos) {
            throw new Error(`Valor de pixel inválido: ${valor}. Deve estar entre 0 e ${this.pixelsMaximos}`);
        }
        this.pixels[y][x] = valor;
    }

    /**
     * Retorna a informação da imagem em formato texto
     */
    paraTexto(): string {
        return `Imagem ${this.largura}x${this.altura} (máximo de cor: ${this.pixelsMaximos})`;
    }
}
