# delegua-imagens

Biblioteca para manipular imagens em diferentes formatos (PPM, PGM, PBM).

## Sobre

delegua-imagens é uma biblioteca TypeScript para Delégua que permite trabalhar com imagens em formatos Netpbm:
- **PPM** (Portable Pixmap) - imagens coloridas
- **PGM** (Portable Graymap) - imagens em escala de cinza
- **PBM** (Portable Bitmap) - imagens preto e branco

## Instalação

```bash
npm install delegua-imagens
# ou
yarn add delegua-imagens
```

## Uso

### Básico

```typescript
import { abrirPPM, abrirPGM, abrirPBM } from 'delegua-imagens';

// Abrir uma imagem PPM
const imagem = abrirPPM({ diretorioBase: './imagens' }, 'exemplo.ppm');

// Acessar informações
console.log(`Largura: ${imagem.largura}, Altura: ${imagem.altura}`);
console.log(`Pixeis máximos: ${imagem.pixelsMaximos}`);
```

## Desenvolvimento

### Instalar dependências

```bash
yarn install
```

### Compilar

```bash
yarn build
```

### Testes

```bash
yarn test
yarn test:watch
yarn test:coverage
```

## Licença

MIT
