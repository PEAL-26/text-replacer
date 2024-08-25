# TextLineReplacer

TextLineReplacer é uma ferramenta simples que permite substituir automaticamente o conteúdo de linhas em arquivos, começando de um termo de busca até o final da linha. A ferramenta processa todos os arquivos com extensões especificadas dentro de um diretório e seus subdiretórios.

## Funcionalidades

- Substituição de texto a partir de um termo de busca até o final da linha.
- Processamento de arquivos com extensões específicas dentro de um diretório.
- Recursividade para lidar com subdiretórios.

### Código de Exemplo

```javascript
const { replaceInFiles } = require("./index");

// Exemplo de uso:
replaceInFiles(
  "./src/components",
  "@/components/pattern",
  "software-edv-design-system/components",
  [".tsx"]
);
```
