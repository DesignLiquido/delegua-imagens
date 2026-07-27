import { promises as sistemaArquivos } from 'fs';
import * as caminho from 'path';

import { SistemaArquivosInterface } from '../interfaces/sistema-arquivos-interface';

/**
 * Implementação padrão de `SistemaArquivosInterface`, baseada nas APIs assíncronas do Node.js.
 */
export class SistemaArquivosNode implements SistemaArquivosInterface {
    async lerArquivoTexto(caminhoArquivo: string): Promise<string> {
        return sistemaArquivos.readFile(caminhoArquivo, 'utf-8');
    }

    resolverCaminho(diretorioBase: string, caminhoOuArquivo: string): string {
        if (caminhoOuArquivo.startsWith('.')) {
            return caminho.join(diretorioBase, caminhoOuArquivo);
        }
        return caminhoOuArquivo;
    }
}
