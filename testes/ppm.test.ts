import { ImagemPPM } from "../fontes/ppm";

describe('Classe ImagemPPM', () => {
    let imagem: ImagemPPM;

    beforeEach(() => {
        imagem = new ImagemPPM(10, 10);
    });

    describe('Criação de imagem', () => {
        it('Cria uma imagem com dimensões corretas', () => {
            expect(imagem.largura).toBe(10);
            expect(imagem.altura).toBe(10);
            expect(imagem.pixelsMaximos).toBe(255);
        });

        it('Inicializa todos os pixels com preto (0,0,0)', () => {
            const pixel = imagem.obterPixelRGB(0, 0);
            expect(pixel.r).toBe(0);
            expect(pixel.g).toBe(0);
            expect(pixel.b).toBe(0);
        });
    });

    describe('Manipulação de pixels', () => {
        it('Define e obtém um pixel RGB', () => {
            imagem.definirPixelRGB(5, 5, 255, 128, 64);
            const pixel = imagem.obterPixelRGB(5, 5);
            
            expect(pixel.r).toBe(255);
            expect(pixel.g).toBe(128);
            expect(pixel.b).toBe(64);
        });

        it('Lança erro ao tentar acessar coordenadas inválidas', () => {
            expect(() => imagem.obterPixelRGB(-1, 0)).toThrow();
            expect(() => imagem.obterPixelRGB(10, 10)).toThrow();
        });

        it('Lança erro ao definir valores de pixel inválidos', () => {
            expect(() => imagem.definirPixelRGB(5, 5, 256, 0, 0)).toThrow();
            expect(() => imagem.definirPixelRGB(5, 5, -1, 0, 0)).toThrow();
        });
    });

    describe('Exportação', () => {
        it('Exporta para texto no formato PPM (P3)', () => {
            imagem.definirPixelRGB(0, 0, 255, 0, 0);
            const texto = imagem.exportarTexto();
            
            expect(texto).toContain('P3');
            expect(texto).toContain('10 10');
            expect(texto).toContain('255');
            expect(texto).toContain('255 0 0');
        });

        it('Exporta para binário no formato PPM (P6)', () => {
            imagem.definirPixelRGB(0, 0, 255, 0, 0);
            const binario = imagem.exportarBinario();
            
            expect(binario).toBeInstanceOf(Buffer);
            expect(binario.toString('utf-8', 0, 2)).toBe('P6');
        });
    });

    describe('Método paraTexto', () => {
        it('Retorna representação em texto', () => {
            const texto = imagem.paraTexto();
            expect(texto).toContain('PPM');
            expect(texto).toContain('10x10');
        });
    });
});
