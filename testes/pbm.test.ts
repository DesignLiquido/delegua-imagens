import { ImagemPBM } from "../fontes/pbm";

describe('Classe ImagemPBM', () => {
    let imagem: ImagemPBM;

    beforeEach(() => {
        imagem = new ImagemPBM(10, 10);
    });

    describe('Criação de imagem', () => {
        it('Cria uma imagem com dimensões corretas', () => {
            expect(imagem.largura).toBe(10);
            expect(imagem.altura).toBe(10);
            expect(imagem.pixelsMaximos).toBe(1);
        });

        it('Inicializa todos os pixels com preto (0)', () => {
            expect(imagem.obterPixel(0, 0)).toBe(0);
        });
    });

    describe('Manipulação de pixels', () => {
        it('Define e obtém um pixel', () => {
            imagem.definirPixel(5, 5, 1);
            expect(imagem.obterPixel(5, 5)).toBe(1);
        });

        it('Apenas aceita valores 0 ou 1', () => {
            imagem.definirPixel(5, 5, 1);
            expect(imagem.obterPixel(5, 5)).toBe(1);
            
            imagem.definirPixel(5, 5, 0);
            expect(imagem.obterPixel(5, 5)).toBe(0);
        });

        it('Lança erro ao tentar acessar coordenadas inválidas', () => {
            expect(() => imagem.obterPixel(-1, 0)).toThrow();
            expect(() => imagem.obterPixel(10, 10)).toThrow();
        });

        it('Lança erro ao definir valores de pixel inválidos', () => {
            expect(() => imagem.definirPixel(5, 5, 2)).toThrow();
            expect(() => imagem.definirPixel(5, 5, -1)).toThrow();
        });
    });

    describe('Exportação', () => {
        it('Exporta para texto no formato PBM (P1)', () => {
            imagem.definirPixel(0, 0, 1);
            const texto = imagem.exportarTexto();
            
            expect(texto).toContain('P1');
            expect(texto).toContain('10 10');
            expect(texto).toContain('1');
        });

        it('Exporta para binário no formato PBM (P4)', () => {
            imagem.definirPixel(0, 0, 1);
            const binario = imagem.exportarBinario();
            
            expect(binario).toBeInstanceOf(Buffer);
            expect(binario.toString('utf-8', 0, 2)).toBe('P4');
        });
    });

    describe('Método paraTexto', () => {
        it('Retorna representação em texto', () => {
            const texto = imagem.paraTexto();
            expect(texto).toContain('PBM');
            expect(texto).toContain('10x10');
        });
    });
});
