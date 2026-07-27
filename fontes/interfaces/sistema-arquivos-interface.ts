/**
 * Abstrai as operações de sistema de arquivos usadas por este módulo, para que uma
 * implementação diferente da padrão em Node.js (por exemplo, baseada na API do VSCode)
 * possa ser injetada por quem consome este pacote.
 */
export interface SistemaArquivosInterface {
    lerArquivoTexto(caminhoArquivo: string): Promise<string>;
    resolverCaminho(diretorioBase: string, caminhoOuArquivo: string): string;
}
