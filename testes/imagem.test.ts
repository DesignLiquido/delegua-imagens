import { Imagem } from "../fontes/imagem";

// Classe concreta para testes
class ImagemTeste extends Imagem {
    paraTexto(): string {
        return `Imagem teste ${this.largura}x${this.altura}`;
    }
}

describe('Classe Imagem (base)', () => {
    let imagem: ImagemTeste;

    beforeEach(() => {
        imagem = new ImagemTeste(20, 20, 255);
    });

    describe('Criação', () => {
        it('Cria uma imagem com propriedades corretas', () => {
            expect(imagem.largura).toBe(20);
            expect(imagem.altura).toBe(20);
            expect(imagem.pixelsMaximos).toBe(255);
        });

        it('Inicializa matriz de pixels', () => {
            expect(imagem.pixels).toHaveLength(20);
            expect(imagem.pixels[0]).toHaveLength(20);
        });
    });

    describe('Manipulação de pixels', () => {
        it('Define e obtém um pixel corretamente', () => {
            imagem.definirPixel(10, 10, 200);
            expect(imagem.obterPixel(10, 10)).toBe(200);
        });

        it('Lança erro ao acessar fora dos limites', () => {
            expect(() => imagem.obterPixel(-1, 0)).toThrow('Coordenadas inválidas');
            expect(() => imagem.obterPixel(0, -1)).toThrow('Coordenadas inválidas');
            expect(() => imagem.obterPixel(20, 0)).toThrow('Coordenadas inválidas');
            expect(() => imagem.obterPixel(0, 20)).toThrow('Coordenadas inválidas');
        });

        it('Lança erro ao definir valor fora do intervalo permitido', () => {
            expect(() => imagem.definirPixel(0, 0, -1)).toThrow('Valor de pixel inválido');
            expect(() => imagem.definirPixel(0, 0, 256)).toThrow('Valor de pixel inválido');
        });

        it('Aceita valores no intervalo [0, pixelsMaximos]', () => {
            imagem.definirPixel(5, 5, 0);
            expect(imagem.obterPixel(5, 5)).toBe(0);
            
            imagem.definirPixel(5, 5, 255);
            expect(imagem.obterPixel(5, 5)).toBe(255);
        });
    });

    describe('Método paraTexto', () => {
        it('Retorna descrição em texto', () => {
            const texto = imagem.paraTexto();
            expect(texto).toContain('Imagem teste');
            expect(texto).toContain('20x20');
        });
    });
});
