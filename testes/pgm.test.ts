import { ImagemPGM } from "../fontes/pgm";

describe('Classe ImagemPGM', () => {
    let imagem: ImagemPGM;

    beforeEach(() => {
        imagem = new ImagemPGM(10, 10);
    });

    describe('Criação de imagem', () => {
        it('Cria uma imagem com dimensões corretas', () => {
            expect(imagem.largura).toBe(10);
            expect(imagem.altura).toBe(10);
            expect(imagem.pixelsMaximos).toBe(255);
        });

        it('Inicializa todos os pixels com preto (0)', () => {
            expect(imagem.obterPixel(0, 0)).toBe(0);
        });
    });

    describe('Manipulação de pixels', () => {
        it('Define e obtém um pixel', () => {
            imagem.definirPixel(5, 5, 128);
            expect(imagem.obterPixel(5, 5)).toBe(128);
        });

        it('Lança erro ao tentar acessar coordenadas inválidas', () => {
            expect(() => imagem.obterPixel(-1, 0)).toThrow();
            expect(() => imagem.obterPixel(10, 10)).toThrow();
        });

        it('Lança erro ao definir valores de pixel inválidos', () => {
            expect(() => imagem.definirPixel(5, 5, 256)).toThrow();
            expect(() => imagem.definirPixel(5, 5, -1)).toThrow();
        });
    });

    describe('Exportação', () => {
        it('Exporta para texto no formato PGM (P2)', () => {
            imagem.definirPixel(0, 0, 128);
            const texto = imagem.exportarTexto();
            
            expect(texto).toContain('P2');
            expect(texto).toContain('10 10');
            expect(texto).toContain('255');
            expect(texto).toContain('128');
        });

        it('Exporta para binário no formato PGM (P5)', () => {
            imagem.definirPixel(0, 0, 128);
            const binario = imagem.exportarBinario();
            
            expect(binario).toBeInstanceOf(Buffer);
            expect(binario.toString('utf-8', 0, 2)).toBe('P5');
        });
    });

    describe('Método paraTexto', () => {
        it('Retorna representação em texto', () => {
            const texto = imagem.paraTexto();
            expect(texto).toContain('PGM');
            expect(texto).toContain('10x10');
        });
    });
});
