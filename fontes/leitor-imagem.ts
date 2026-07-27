import { SistemaArquivosInterface } from './interfaces/sistema-arquivos-interface';
import { SistemaArquivosNode } from './infraestruturas/sistema-arquivos-node';

export const sistemaArquivosPadrao: SistemaArquivosInterface = new SistemaArquivosNode();

/**
 * Resolve o caminho de um arquivo de imagem em relação ao diretório base do interpretador
 * e lê seu conteúdo como texto. Compartilhado por `abrirPGM`, `abrirPPM` e `abrirPBM`,
 * que antes duplicavam esta mesma lógica.
 */
export async function lerConteudoImagem(
    interpretador: { diretorioBase: string },
    caminhoArquivo: string,
    sistemaArquivos: SistemaArquivosInterface = sistemaArquivosPadrao
): Promise<string> {
    const caminhoResolvido = sistemaArquivos.resolverCaminho(interpretador.diretorioBase, caminhoArquivo);
    return sistemaArquivos.lerArquivoTexto(caminhoResolvido);
}
